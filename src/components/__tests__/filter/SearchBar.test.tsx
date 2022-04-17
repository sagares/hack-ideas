/**
 * @jest-environment jsdom
 */
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { SearchBar } from "../../filter";

describe("Search Bar Component", () => {
  let element, component, onFilterSpy;

  beforeEach(() => {
    onFilterSpy = jest.fn();

    element = document.createElement("div");

    component = render(
      <SearchBar searchText="mock-search" onFilter={onFilterSpy} />,
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

  test("filters when search input is changed", () => {
    const searchInput = element.querySelector("#search");
    fireEvent.change(searchInput, { target: { value: "foobar" } });
    expect(onFilterSpy).toHaveBeenCalledWith("foobar");
  });

  test("clears search when clear icon is clicked", () => {
    const clearIcon = element.querySelector(".clear-icon");
    fireEvent.click(clearIcon);
    expect(onFilterSpy).toHaveBeenCalledWith("");
  });
});
