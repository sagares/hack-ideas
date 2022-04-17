/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import { getIdeas } from "../../utils/ServiceUtil";
import HackIdeasContext from "../../context";
import HomePage from "../HomePage";

jest.mock("../../utils/ServiceUtil");

describe("Home Page Component", () => {
  let element, component, setIdeas;

  beforeEach(() => {
    (getIdeas as jest.Mock).mockImplementation((cb) => {
      cb({ idea1: { name: "idea 1" } });
      return jest.fn();
    });

    setIdeas = jest.fn().mockImplementation(() => {});
    element = document.createElement("div");

    component = render(
      <HackIdeasContext.Provider
        value={{
          currentUser: { empId: "123456" },
          ideas: {
            idea1: {
              name: "idea 1",
              description: "idea 1",
              id: "idea1",
              tags: [],
              submittedBy: "123456",
              submittedOn: 100001,
            },
          },
          setIdeas,
        }}
      >
        <HomePage />
      </HackIdeasContext.Provider>,
      {
        container: document.body.appendChild(element),
      }
    );
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  test("renders hack ideas grid", () => {
    expect(component.container).toMatchSnapshot();
    expect(component.container.querySelector(".hack-idea--grid")).toBeDefined();
  });

  test("does not render ideas grid if ideas not defined", () => {
    component = render(
      <HackIdeasContext.Provider
        value={{
          currentUser: { empId: "123456" },
          ideas: null,
          setIdeas,
        }}
      >
        <HomePage />
      </HackIdeasContext.Provider>,
      {
        container: document.body.appendChild(element),
      }
    );

    expect(component.container).toMatchSnapshot();
    expect(component.container.querySelector(".hack-idea--grid")).toBe(null);
    expect(component.container.querySelector(".card-panel.red")).toBeDefined();
  });
});
