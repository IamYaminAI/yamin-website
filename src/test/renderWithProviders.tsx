import { render, type RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";
import { makeStore, type RootState } from "@/store/store";
export function renderWithProviders(
  ui: React.ReactElement,
  options: RenderOptions & { preloadedState?: RootState } = {},
) {
  const { preloadedState, ...renderOptions } = options;
  const store = makeStore(preloadedState);
  return {
    store,
    ...render(
      <Provider store={store}>
        <PrimeReactProvider value={{ unstyled: true }}>{ui}</PrimeReactProvider>
      </Provider>,
      renderOptions,
    ),
  };
}
