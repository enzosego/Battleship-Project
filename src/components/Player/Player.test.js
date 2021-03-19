import { render } from "@testing-library/react";
import { Player } from "./Player";

test('Player board render correctly', () => {
  const { getByText } = render(<Player />);
  getByText('Player');
})
