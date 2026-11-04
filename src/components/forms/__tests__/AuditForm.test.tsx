import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuditForm from "@/components/forms/AuditForm";

test("rejects an invalid address and explains why", async () => {
  render(<AuditForm />);
  const input = screen.getByLabelText("Your website address");
  await userEvent.type(input, "not a site");
  await userEvent.click(
    screen.getByRole("button", { name: "Run a free audit" }),
  );

  expect(screen.getByRole("alert")).toHaveTextContent(
    "Enter a valid website address",
  );
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(input).toHaveFocus();
});

test("a valid site is not sent anywhere and the visitor is told why", async () => {
  render(<AuditForm variant="inline" />);
  const input = screen.getByLabelText("Your website address");
  await userEvent.type(input, "yourbrand.com{Enter}");

  expect(screen.getByRole("alert")).toHaveTextContent(
    "Free audits are not open yet, so nothing was sent.",
  );
  expect(input).not.toHaveAttribute("aria-invalid");

  // Editing the address clears the status.
  await userEvent.type(input, "x");
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});

test("the field is labelled and named for autofill", () => {
  render(<AuditForm />);
  const input = screen.getByLabelText("Your website address");
  expect(input).toHaveAttribute("name", "site");
  expect(input).toHaveAttribute("autocomplete", "url");
});
