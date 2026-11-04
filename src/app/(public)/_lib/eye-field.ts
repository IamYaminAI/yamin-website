/**
 * The hero "eye": a particle sphere (iris) with a pupil core and an orbit ring,
 * rendered with 2D canvas. As the hero scene progresses the camera flies into
 * the pupil. Pure functions only; the component owns DOM and timing.
 */

const GOLD = "#C9A86A";
const GOLD_LIGHT = "#E2C88E";
const MIST = "#F2F2EE";
const TAU = Math.PI * 2;
/** Floats per point: x, y, z, isBright, seed, isRing. */
const POINT_STRIDE = 6;
/** Floats per projected point: x, y, size, alpha, group. */
const PROJECTED_STRIDE = 5;

/** Spherical coordinates (latitude, longitude) of the orbit labels. */
const LABEL_ANGLES: ReadonlyArray<readonly [number, number]> = [
  [0.42, 0.2],
  [-0.3, 1.25],
  [0.12, 2.3],
  [-0.5, 3.3],
  [0.55, 4.3],
  [-0.1, 5.3],
];

export type EyeField = {
  points: Float32Array;
  projected: Float32Array;
  labels: ReadonlyArray<readonly [number, number, number]>;
  rotation: number;
  ringRotation: number;
};

export type EyeFrame = {
  width: number;
  height: number;
  /** Hero scene progress, 0 → 1. */
  progress: number;
  reduceMotion: boolean;
  /** Milliseconds, for the breathing and thread animations. */
  now: number;
  /** Smoothed pointer position in -1 → 1. */
  tilt: { x: number; y: number };
  /** Pointer position in canvas pixels, for the repel effect. */
  pointer: { x: number; y: number };
  /** Bottom of the headline block and top of the form, in canvas pixels. */
  copyBottom?: number;
  ctaTop?: number;
};

export type LabelPlacement = { x: number; y: number; opacity: number };

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export function createEyeField(
  isSmallScreen: boolean,
  random: () => number = Math.random,
): EyeField {
  const sphereCount = isSmallScreen ? 900 : 2000;
  const coreCount = Math.floor(sphereCount * 0.22);
  const ringCount = Math.floor(sphereCount * 0.32);
  const points = new Float32Array(
    (sphereCount + coreCount + ringCount) * POINT_STRIDE,
  );
  let offset = 0;
  const push = (...values: number[]) => {
    points.set(values, offset);
    offset += POINT_STRIDE;
  };

  // Fibonacci sphere with slight jitter: the iris surface.
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < sphereCount; i++) {
    const y = 1 - (i / (sphereCount - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const jitter = 1 + (random() - 0.5) * 0.07;
    push(
      Math.cos(theta) * radius * jitter,
      y * jitter,
      Math.sin(theta) * radius * jitter,
      random() < 0.07 ? 1 : 0,
      random(),
      0,
    );
  }

  // Sparse dim points inside the sphere for depth.
  for (let i = 0; i < coreCount; i++) {
    const u = random() * 2 - 1;
    const angle = random() * TAU;
    const radius = Math.sqrt(random()) * 0.82;
    const q = Math.sqrt(1 - u * u);
    push(
      Math.cos(angle) * q * radius,
      u * radius,
      Math.sin(angle) * q * radius,
      0,
      random() * 0.4,
      0,
    );
  }

  // Flat orbit ring around the eye.
  for (let i = 0; i < ringCount; i++) {
    const angle = random() * TAU;
    const radius = 1.45 + Math.pow(random(), 1.6) * 0.42;
    push(
      Math.cos(angle) * radius,
      (random() - 0.5) * 0.035,
      Math.sin(angle) * radius,
      random() < 0.1 ? 1 : 0,
      random(),
      1,
    );
  }

  return {
    points,
    projected: new Float32Array(
      (points.length / POINT_STRIDE) * PROJECTED_STRIDE,
    ),
    labels: LABEL_ANGLES.map(([lat, lon]) => [
      Math.cos(lat) * Math.cos(lon) * 1.06,
      Math.sin(lat) * 1.06,
      Math.cos(lat) * Math.sin(lon) * 1.06,
    ]),
    rotation: 0,
    ringRotation: 0,
  };
}

/** 0 → 1 fly-in amount, eased; always 0 with reduced motion. */
export function getFlyIn(progress: number, reduceMotion: boolean): number {
  if (reduceMotion) return 0;
  const t = clamp((progress - 0.04) / 0.62);
  return t * t * (3 - 2 * t);
}

/** Draws one frame and returns where each orbit label should sit. */
export function drawEyeField(
  ctx: CanvasRenderingContext2D,
  field: EyeField,
  frame: EyeFrame,
): LabelPlacement[] {
  const { width: w, height: h, progress: p, reduceMotion } = frame;
  const flyIn = getFlyIn(p, reduceMotion);
  if (!reduceMotion) {
    field.rotation += 0.0018 + p * 0.03;
    field.ringRotation += 0.0012;
  }

  const yaw = field.rotation + frame.tilt.x * 0.55;
  const pitch = -0.32 + frame.tilt.y * 0.3;
  const sinYaw = Math.sin(yaw),
    cosYaw = Math.cos(yaw);
  const sinPitch = Math.sin(pitch),
    cosPitch = Math.cos(pitch);
  const sinRing = Math.sin(field.ringRotation),
    cosRing = Math.cos(field.ringRotation);

  // At rest the eye sits between the headline and the form; it rises to the
  // centre as the camera flies in.
  const gapTop = frame.copyBottom ?? h * 0.4;
  const gapBottom = frame.ctaTop ?? h * 0.85;
  let scale = Math.min(w, h) * (w <= 900 ? 0.27 : 0.285);
  scale = Math.min(scale, Math.max(60, ((gapBottom - gapTop) / 2 - 10) / 0.42));
  const restY = (gapTop + gapBottom) / 2;
  const distance = 3.4 - 3.28 * flyIn;
  const focal = scale * 3.4;
  const originX = w / 2;
  const originY = restY + (h / 2 - restY) * flyIn;
  const breath = 1 + Math.sin(frame.now / 1400) * 0.015;

  const { points, projected } = field;
  let count = 0;
  for (let i = 0; i < points.length; i += POINT_STRIDE) {
    let x = points[i] * breath;
    let y = points[i + 1] * breath;
    let z = points[i + 2] * breath;
    if (points[i + 5]) {
      const ringX = x * cosRing - z * sinRing;
      z = x * sinRing + z * cosRing;
      x = ringX;
      const tiltedY = y * 0.96 - z * 0.28;
      z = y * 0.28 + z * 0.96;
      y = tiltedY;
    }
    const x1 = x * cosYaw - z * sinYaw;
    const z1 = x * sinYaw + z * cosYaw;
    const y1 = y * cosPitch - z1 * sinPitch;
    const z2 = y * sinPitch + z1 * cosPitch;
    const depth = distance - z2;
    if (depth < 0.04) continue;
    const perspective = focal / depth;
    let screenX = originX + x1 * perspective;
    let screenY = originY + y1 * perspective;
    if (screenX < -40 || screenX > w + 40 || screenY < -40 || screenY > h + 40)
      continue;

    if (!reduceMotion) {
      const dx = screenX - frame.pointer.x;
      const dy = screenY - frame.pointer.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < 19600 && distSq > 1) {
        const dist = Math.sqrt(distSq);
        const push = ((140 - dist) / 140) * 34 * (1 - flyIn);
        screenX += (dx / dist) * push;
        screenY += (dy / dist) * push;
      }
    }

    const seed = points[i + 4];
    let alpha =
      (0.18 + 0.82 * Math.max(0, (z2 + 1.2) / 2.4)) * (0.5 + seed * 0.5);
    if (depth < 0.6) alpha *= depth / 0.6;
    projected[count++] = screenX;
    projected[count++] = screenY;
    projected[count++] = Math.min(
      16,
      ((0.7 + seed * 1.5) * perspective) / scale,
    );
    projected[count++] = alpha;
    projected[count++] = (z2 < 0 ? 0 : 2) + points[i + 3];
  }

  const drawPoints = (isFront: boolean) => {
    ctx.globalCompositeOperation = "lighter";
    for (let m = 0; m < count; m += PROJECTED_STRIDE) {
      const group = projected[m + 4];
      if (group >= 2 !== isFront) continue;
      ctx.globalAlpha = Math.min(1, projected[m + 3]);
      ctx.fillStyle = group % 2 ? MIST : GOLD;
      const size = projected[m + 2];
      ctx.fillRect(
        projected[m] - size / 2,
        projected[m + 1] - size / 2,
        size,
        size,
      );
    }
    ctx.globalAlpha = 1;
  };

  drawPoints(false);
  ctx.globalCompositeOperation = "source-over";

  // Pupil glow and core.
  const core = ((0.17 + 0.07 * flyIn) * focal) / distance;
  const glow = ctx.createRadialGradient(
    originX,
    originY,
    core * 0.6,
    originX,
    originY,
    core * 3.2,
  );
  glow.addColorStop(0, `rgba(226,200,142,${(0.2 + 0.12 * flyIn).toFixed(3)})`);
  glow.addColorStop(0.35, "rgba(201,168,106,0.08)");
  glow.addColorStop(1, "rgba(201,168,106,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(originX, originY, core * 3.2, 0, TAU);
  ctx.fill();

  const coreFill = ctx.createRadialGradient(
    originX - core * 0.25,
    originY - core * 0.25,
    core * 0.1,
    originX,
    originY,
    core,
  );
  const edge = [214 + 28 * flyIn, 208 + 34 * flyIn, 194 + 44 * flyIn].map(
    Math.round,
  );
  coreFill.addColorStop(0, "#FFFFFF");
  coreFill.addColorStop(0.62, MIST);
  coreFill.addColorStop(1, `rgb(${edge.join(",")})`);
  ctx.fillStyle = coreFill;
  ctx.beginPath();
  ctx.arc(originX, originY, core, 0, TAU);
  ctx.fill();

  // Iris dial: a gold ring and ticks so it reads as an eye that measures.
  const irisAlpha = 0.6 * (1 - flyIn) * (1 - flyIn);
  if (irisAlpha > 0.01) {
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1;
    ctx.globalAlpha = irisAlpha;
    ctx.beginPath();
    ctx.arc(originX, originY, core * 1.34, 0, TAU);
    ctx.stroke();

    const tickRadius = core * 1.58;
    const dialRotation = field.ringRotation * 2;
    ctx.globalAlpha = irisAlpha * 0.75;
    ctx.beginPath();
    for (let q = 0; q < 72; q++) {
      const angle = dialRotation + q * (TAU / 72);
      const length = q % 6 === 0 ? 8 : 3.5;
      const cos = Math.cos(angle),
        sin = Math.sin(angle);
      ctx.moveTo(originX + cos * tickRadius, originY + sin * tickRadius);
      ctx.lineTo(
        originX + cos * (tickRadius + length),
        originY + sin * (tickRadius + length),
      );
    }
    ctx.stroke();

    ctx.globalAlpha = irisAlpha * 0.45;
    ctx.setLineDash([2, 7]);
    ctx.beginPath();
    ctx.arc(originX, originY, core * 2.3, 0, TAU);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  }

  drawPoints(true);

  // The thread: the site entered in the form travels up into the eye.
  const threadAlpha = Math.max(0, 1 - p / 0.18);
  const threadStart = (frame.ctaTop ?? h) - 14;
  const threadEnd = originY + core * 1.7;
  if (threadAlpha > 0 && Math.abs(threadEnd - threadStart) > 24) {
    ctx.globalCompositeOperation = "source-over";
    const line = ctx.createLinearGradient(0, threadStart, 0, threadEnd);
    line.addColorStop(0, "rgba(201,168,106,0)");
    line.addColorStop(1, `rgba(201,168,106,${(0.6 * threadAlpha).toFixed(3)})`);
    ctx.strokeStyle = line;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(originX + 0.5, threadStart);
    ctx.lineTo(originX + 0.5, threadEnd);
    ctx.stroke();
    if (!reduceMotion) {
      const u = (frame.now / 2600) % 1;
      ctx.globalAlpha = Math.sin(u * Math.PI) * threadAlpha;
      ctx.fillStyle = GOLD_LIGHT;
      ctx.beginPath();
      ctx.arc(
        originX + 0.5,
        threadStart + (threadEnd - threadStart) * u * u,
        2.4,
        0,
        TAU,
      );
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Orbit labels: visible on the near side, fading near the copy and form.
  const labelFade = Math.max(0, 1 - p / 0.14);
  return field.labels.map(([lx0, ly0, lz0]) => {
    const lx = lx0 * cosYaw - lz0 * sinYaw;
    const lz = lx0 * sinYaw + lz0 * cosYaw;
    const ly = ly0 * cosPitch - lz * sinPitch;
    const lz2 = ly0 * sinPitch + lz * cosPitch;
    const perspective = focal / Math.max(0.2, distance - lz2);
    const x = originX + lx * perspective;
    const y = originY + ly * perspective;
    const fromCentre = Math.hypot(x - originX, y - originY);
    let opacity = clamp((lz2 + 0.15) / 0.5) * labelFade;
    opacity *= clamp((fromCentre - core * 2.1) / (core * 0.8));
    if (y > h - 36) opacity *= Math.max(0, (h - 18 - y) / 18);
    if (frame.copyBottom !== undefined && y < frame.copyBottom + 20)
      opacity *= Math.max(0, (y - frame.copyBottom) / 20);
    if (frame.ctaTop !== undefined && y > frame.ctaTop - 20)
      opacity *= Math.max(0, (frame.ctaTop - y) / 20);
    return { x, y, opacity };
  });
}
