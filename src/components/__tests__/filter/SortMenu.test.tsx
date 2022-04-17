/**
 * @jest-environment jsdom
 */
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { SortMenu } from "../../filter";

describe("Sort Menu Component", () => {
  let element, component, onSortSpy;

  beforeEach(() => {
    onSortSpy = jest.fn();

    element = document.createElement("div");

    component = render(<SortMenu sortBy="" onSort={onSortSpy} />, {
      container: document.body.appendChild(element),
    });
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  test("renders", () => {
    expect(component.container).toMatchSnapshot();
  });

  test("sorts by submitted on", () => {
    const submittedOn = element.querySelector(
      ".dropdown-content li:first-child a"
    );
    fireEvent.click(submittedOn);
    expect(onSortSpy).toHaveBeenCalledWith("submittedOn");
  });

  test("sorts by unvotes count", () => {
    const upvotes = element.querySelector(
      ".dropdown-content li:nth-child(2) a"
    );
    fireEvent.click(upvotes);
    expect(onSortSpy).toHaveBeenCalledWith("upvotes");
  });

  test("rest sorting", () => {
    const upvotes = element.querySelector(
      ".dropdown-content li:nth-child(4) a"
    );
    fireEvent.click(upvotes);
    expect(onSortSpy).toHaveBeenCalledWith("");
  });

  test("renders submitted on option as active element", () => {
    component = render(<SortMenu sortBy="submittedOn" onSort={onSortSpy} />, {
      container: document.body.appendChild(element),
    });
    const submittedOn = element.querySelector(
      ".dropdown-content li:nth-child(1)"
    );

    expect(submittedOn.classList.contains("active")).toBe(true);
  });

  test("renders upvotes option as active element", () => {
    component = render(<SortMenu sortBy="upvotes" onSort={onSortSpy} />, {
      container: document.body.appendChild(element),
    });
    const upvotes = element.querySelector(".dropdown-content li:nth-child(2)");

    expect(upvotes.classList.contains("active")).toBe(true);
  });
});
