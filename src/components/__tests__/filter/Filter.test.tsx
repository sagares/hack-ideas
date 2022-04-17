/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import Filter from "../../filter";

describe("Filter Component", () => {
  let element, component, onFilterSpy, onSortSpy;

  beforeEach(() => {
    onFilterSpy = jest.fn();
    onSortSpy = jest.fn();

    element = document.createElement("div");

    component = render(
      <Filter
        searchText="mock-search"
        sortBy=""
        onFilter={onFilterSpy}
        onSort={onSortSpy}
      />,
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
  })
});
