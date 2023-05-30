import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { App } from "../app";

describe("App", () => {
  const { asFragment } = render(<App />);

  it("should render the app", () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
