import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppButton from "@/components/ui/AppButton";
import { renderWithProviders } from "@/test/renderWithProviders";
test("renders a PrimeReact button and handles clicks", async () => {
  const onClick = jest.fn();
  renderWithProviders(<AppButton label="Continue" onClick={onClick} />);
  const button = screen.getByRole("button", { name: "Continue" });
  expect(button).toHaveAttribute("type", "button");
  await userEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});
