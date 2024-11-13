import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import Countdown from "./index";

test("renders Countdown component", () => {
  render(<Countdown seconds={0} onFinish={() => {}} />);
  const countdownElement = screen.getByText(/reserving/i);
  expect(countdownElement).toBeInTheDocument();
});
