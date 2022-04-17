/**
 * @jest-environment jsdom
 */
import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { HackIdeasState } from "../HackIdeasState";
import { HackIdeasContext } from "../HackIdeasContext";

describe("Hack Ideas State", () => {
  let element, component, HackIdeasStateComponent, dispatch;

  beforeEach(() => {
    HackIdeasStateComponent = () => (
      <HackIdeasState>
        <HackIdeasContext.Consumer>
          {(context) => (
            <>
              <div
                className="set-current-user"
                onClick={() => {
                  context.setCurrentUser({ empId: "123456" });
                }}
              ></div>
              <div
                className="set-ideas"
                onClick={() => {
                  context.setIdeas({
                    idea1: {
                      name: "idea1",
                      description: "idea2",
                      id: "idea1",
                      tags: [],
                      submittedBy: "123456",
                      submittedOn: 1000,
                    },
                  });
                }}
              ></div>
              <div
                className="log-out"
                onClick={() => {
                  context.logout();
                }}
              ></div>
              <div className="current-user">{context.currentUser?.empId}</div>
              <div className="ideas">{context.ideas && context.ideas["idea1"].name}</div>
            </>
          )}
        </HackIdeasContext.Consumer>
      </HackIdeasState>
    );

    element = document.createElement("div");

    component = render(<HackIdeasStateComponent />, {
      container: document.body.appendChild(element),
    });
  });

  test("renders hack ideas state", () => {
    expect(component.container).toMatchSnapshot();
  });

  test("sets current user", () => {
    const setCurrentUser = element.querySelector(".set-current-user");
    fireEvent.click(setCurrentUser);

    expect(element.querySelector(".current-user").innerHTML).toEqual("123456");
  });

  test("sets ideas", () => {
    const setIdeas = element.querySelector(".set-ideas");
    fireEvent.click(setIdeas);

    expect(element.querySelector(".ideas").innerHTML).toEqual("idea1");
  });

  test("logs out current user", () => {
    const logout = element.querySelector(".log-out");
    fireEvent.click(logout);

    expect(element.querySelector(".current-user").innerHTML).toEqual("");
    expect(element.querySelector(".ideas").innerHTML).toEqual("");
  });
});
