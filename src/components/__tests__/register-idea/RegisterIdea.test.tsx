/**
 * @jest-environment jsdom
 */
import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import RegisterIdea from "../../register-idea";

describe("Register Idea Component", () => {
  let element, component;

  beforeEach(() => {
    element = document.createElement("div");

    component = render(<RegisterIdea />, {
      container: document.body.appendChild(element),
    });
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  test("renders", () => {
    expect(component.container).toMatchSnapshot();
  });

  test("opens register dialog on click of floating button", () => {
    const registerButton = element.querySelector(
      ".register-idea-btn a.btn-floating"
    );
    expect(element.querySelector(".register-idea--modal.open")).toBe(null);

    act(() => {
      fireEvent.click(registerButton);
    });

    expect(element.querySelector(".register-idea--modal.open")).toBeDefined();
  });
});
