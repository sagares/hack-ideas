/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";

import App from "../App";

jest.mock("../colors.less", () => jest.fn());
jest.mock("../app.less", () => jest.fn());

describe("App Component", () => {
  let AppComponent;

  beforeEach(() => {
    AppComponent = <App />;
  });

  test("renders login form", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
