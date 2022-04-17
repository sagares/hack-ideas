/**
 * @jest-environment jsdom
 */
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import HackIdeasContext from "../../../context";
import NavBar from "../../nav-bar";

describe("Nav Bar Component", () => {
  let element, component, logout;

  beforeEach(() => {
    logout = jest.fn().mockImplementation(() => {});
    element = document.createElement("div");

    component = render(
      <HackIdeasContext.Provider
        value={{
          logout,
        }}
      >
        <NavBar />
      </HackIdeasContext.Provider>,
      {
        container: document.body.appendChild(element),
      }
    );
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  test("renders", () => {
    expect(component.container).toMatchSnapshot();
  });

  test("logouts on clicking logout button", () => {
    const logoutBtn = element.querySelector(".logout-btn");
    fireEvent.click(logoutBtn);
    expect(logout).toHaveBeenCalled();
  });
});
