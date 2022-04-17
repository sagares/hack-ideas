/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import HackIdeasContext from "../../context";
import Main from "../Main";

describe("Main Component", () => {
  let element, component, setCurrentUser;

  beforeEach(() => {
    setCurrentUser = jest.fn().mockImplementation(() => {});
    element = document.createElement("div");
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  test("renders login form if current user is not defined", () => {
    component = render(
      <HackIdeasContext.Provider value={{ currentUser: null, setCurrentUser }}>
        <Main />
      </HackIdeasContext.Provider>,
      {
        container: document.body.appendChild(element),
      }
    );

    expect(component.container).toMatchSnapshot();
    expect(element.querySelector(".login-form-card")).toBeDefined();
  });

  test("renders home page if current user is defined", () => {
    component = render(
      <HackIdeasContext.Provider
        value={{ currentUser: { empId: "123456" }, setCurrentUser }}
      >
        <Main />
      </HackIdeasContext.Provider>,
      {
        container: document.body.appendChild(element),
      }
    );

    expect(component.container).toMatchSnapshot();
    expect(element.querySelector(".hack-ideas--home-page")).toBeDefined();
  });
});
