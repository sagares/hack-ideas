/**
 * @jest-environment jsdom
 */
import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { updateIdea } from "../../utils/ServiceUtil";
import HackIdeasContext from "../../context";
import Card from "../Card";

jest.mock("../../utils/ServiceUtil");

describe("Card Component", () => {
  let element, component, setIdeas;

  beforeEach(() => {
    (updateIdea as jest.Mock).mockImplementation(() => {});

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
              tags: ["tag1", "tag2"],
              submittedBy: "123456",
              submittedOn: 100001,
            },
            idea2: {
              name: "idea 2",
              description: "idea 2",
              id: "idea1",
              tags: ["tag1", "tag2"],
              submittedBy: "123457",
              submittedOn: 100002,
              upvotes: [{ empId: "123456" }],
            },
          },
          setIdeas,
        }}
      >
        <Card id="idea1" />
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

  test("disables upvote button if card is submitted by current user", () => {
    expect(
      component.container
        .querySelector(".card-action--button")
        .classList.contains("disabled")
    ).toBe(true);
  });

  test("does not render upvotes count if no upvotes on idea", () => {
    expect(
      component.container.querySelector(".card-action--button .upvotes-count")
    ).toBe(null);
  });

  test("does not render upvotes count if no upvotes on idea", () => {
    component = render(
      <HackIdeasContext.Provider
        value={{
          currentUser: { empId: "123456" },
          ideas: {
            idea1: {
              name: "idea 1",
              description: "idea 1",
              id: "idea1",
              tags: ["tag1", "tag2"],
              submittedBy: "123456",
              submittedOn: 100001,
              upvotes: [],
            },
            idea2: {
              name: "idea 2",
              description: "idea 2",
              id: "idea1",
              tags: ["tag1", "tag2"],
              submittedBy: "123457",
              submittedOn: 100002,
              upvotes: [{ empId: "123456" }],
            },
          },
          setIdeas,
        }}
      >
        <Card id="idea1" />
      </HackIdeasContext.Provider>,
      {
        container: document.body.appendChild(element),
      }
    );
    expect(
      component.container.querySelector(".card-action--button .upvotes-count")
    ).toBe(null);
  });

  describe("Other's Idea", () => {
    let component;
    beforeEach(() => {
      component = render(
        <HackIdeasContext.Provider
          value={{
            currentUser: { empId: "123456" },
            ideas: {
              idea1: {
                name: "idea 1",
                description: "idea 1",
                id: "idea1",
                tags: ["tag1", "tag2"],
                submittedBy: "123456",
                submittedOn: 100001,
                upvotes: [],
              },
              idea2: {
                name: "idea 2",
                description: "idea 2",
                id: "idea2",
                tags: ["tag1", "tag2"],
                submittedBy: "123457",
                submittedOn: 100002,
                upvotes: [{ empId: "123456" }, { empId: "123458" }],
              },
            },
            setIdeas,
          }}
        >
          <Card id="idea2" />
        </HackIdeasContext.Provider>,
        {
          container: document.body.appendChild(element),
        }
      );
    });

    test("renders upvotes count", () => {
      expect(
        component.container.querySelector(".card-action--button .upvotes-count")
          .innerHTML
      ).toBe("(2)");
    });

    test("marks upvoted if current user has already upvoted the idea", () => {
      expect(
        component.container
          .querySelector(".card-action--button")
          .classList.contains("upvoted")
      ).toBe(true);
    });

    test("updates idea on click without current user inside upvotes if already upvoted", () => {
      const upvoteBtn = component.container.querySelector(
        ".card-action--button"
      );

      act(() => {
        fireEvent.click(upvoteBtn);
      });

      expect(updateIdea).toHaveBeenCalledWith("idea2", {
        description: "idea 2",
        id: "idea2",
        name: "idea 2",
        submittedBy: "123457",
        submittedOn: 100002,
        tags: ["tag1", "tag2"],
        upvotes: [{ empId: "123458" }],
      });
    });

    test("updates idea on click with current user inside upvotes if already not upvoted", () => {
      component = render(
        <HackIdeasContext.Provider
          value={{
            currentUser: { empId: "123456" },
            ideas: {
              idea1: {
                name: "idea 1",
                description: "idea 1",
                id: "idea1",
                tags: ["tag1", "tag2"],
                submittedBy: "123456",
                submittedOn: 100001,
                upvotes: [],
              },
              idea2: {
                name: "idea 2",
                description: "idea 2",
                id: "idea2",
                tags: ["tag1", "tag2"],
                submittedBy: "123457",
                submittedOn: 100002,
              },
            },
            setIdeas,
          }}
        >
          <Card id="idea2" />
        </HackIdeasContext.Provider>,
        {
          container: document.body.appendChild(element),
        }
      );

      const upvoteBtn = component.container.querySelector(
        ".card-action--button"
      );

      act(() => {
        fireEvent.click(upvoteBtn);
      });

      expect(updateIdea).toHaveBeenCalledWith("idea2", {
        description: "idea 2",
        id: "idea2",
        name: "idea 2",
        submittedBy: "123457",
        submittedOn: 100002,
        tags: ["tag1", "tag2"],
        upvotes: [{ empId: "123456" }],
      });
    });
  });
});
