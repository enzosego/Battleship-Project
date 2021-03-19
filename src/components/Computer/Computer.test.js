import { render } from "@testing-library/react";
import { Computer } from "./Computer";

test("Computer board renders correctly", () => {
  const { getByText } = render(<Computer />)
  getByText("Computer");
})
