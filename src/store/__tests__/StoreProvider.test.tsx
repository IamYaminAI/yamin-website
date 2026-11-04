import { render, screen } from "@testing-library/react";
import StoreProvider from "@/store/StoreProvider";
import { useAppStore } from "@/store/hooks";
import type { AppStore } from "@/store/store";

test("reuses one store for the provider instance", () => {
  const stores: AppStore[] = [];
  function Reader() {
    stores.push(useAppStore());
    return <span>Store ready</span>;
  }
  const view = render(
    <StoreProvider>
      <Reader />
    </StoreProvider>,
  );
  expect(screen.getByText("Store ready")).toBeInTheDocument();
  view.rerender(
    <StoreProvider>
      <Reader />
    </StoreProvider>,
  );
  expect(stores[1]).toBe(stores[0]);
});
