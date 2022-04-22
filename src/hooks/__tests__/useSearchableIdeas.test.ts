/**
 * @jest-environment jsdom
 */
import React from "react";
import { renderHook } from "@testing-library/react-hooks";

import { useSearchableIdeas } from "..";

const MOCK_IDEAS = {
  idea1: {
    id: "idea1",
    name: "Idea 1",
    description: "Idea 1 description",
    submittedBy: "123456",
    submittedOn: 10000,
    tags: ["tag1", "tag2"],
    upvotes: [{ empId: "123457" }, { empId: "123458" }],
  },
  idea2: {
    id: "idea2",
    name: "Idea 2",
    description: "Idea 2 description",
    submittedBy: "123457",
    submittedOn: 10001,
    tags: ["tag1", "tag3"],
    upvotes: [{ empId: "123458" }, { empId: "123459" }, { empId: "123460" }],
  },
};

const getUseSearchableIdeas = (ideas, searchString, sortBy, orderAsc) => {
  return useSearchableIdeas(ideas, searchString, sortBy, orderAsc);
};

describe("useSearchableIdeas", () => {
  test("converts ideas object to array", () => {
    const { result } = renderHook(() =>
      getUseSearchableIdeas(MOCK_IDEAS, "", "", true)
    );

    expect(result.current).toEqual([MOCK_IDEAS["idea1"], MOCK_IDEAS["idea2"]]);
  });

  test("returns ideas array after searching by name", () => {
    const { result } = renderHook(() =>
      getUseSearchableIdeas(MOCK_IDEAS, "Idea 1", "", true)
    );

    expect(result.current).toEqual([MOCK_IDEAS["idea1"]]);
  });

  test("returns ideas array after searching by name", () => {
    const { result } = renderHook(() =>
      getUseSearchableIdeas(MOCK_IDEAS, "idea2", "", true)
    );

    expect(result.current).toEqual([MOCK_IDEAS["idea2"]]);
  });

  test("returns ideas array after sorting by created date in ascending order", () => {
    const { result } = renderHook(() =>
      getUseSearchableIdeas(MOCK_IDEAS, "idea", "submittedOn", true)
    );

    expect(result.current).toEqual([MOCK_IDEAS["idea2"], MOCK_IDEAS["idea1"]]);
  });

  test("returns ideas array after sorting by created date in descending order", () => {
    const { result } = renderHook(() =>
      getUseSearchableIdeas(MOCK_IDEAS, "idea", "submittedOn", false)
    );

    expect(result.current).toEqual([MOCK_IDEAS["idea1"], MOCK_IDEAS["idea2"]]);
  });

  test("returns ideas array after sorting by upvotes in descending order", () => {
    const { result } = renderHook(() =>
      getUseSearchableIdeas(MOCK_IDEAS, "idea", "upvotes", true)
    );

    expect(result.current).toEqual([MOCK_IDEAS["idea2"], MOCK_IDEAS["idea1"]]);
  });

  test("returns ideas array after sorting by upvotes in ascending order", () => {
    const { result } = renderHook(() =>
      getUseSearchableIdeas(MOCK_IDEAS, "idea", "upvotes", false)
    );

    expect(result.current).toEqual([MOCK_IDEAS["idea1"], MOCK_IDEAS["idea2"]]);
  });

  test("returns original ideas if upvotes are not defined and sort by is upvotes", () => {
    const mockIdeas = {
      idea1: {
        id: "idea1",
        name: "Idea 1",
        description: "Idea 1 description",
        submittedBy: "123456",
        submittedOn: 10000,
        tags: ["tag1", "tag2"],
      },
      idea2: {
        id: "idea2",
        name: "Idea 2",
        description: "Idea 2 description",
        submittedBy: "123457",
        submittedOn: 10001,
        tags: ["tag1", "tag3"],
      },
    };
    const { result } = renderHook(() =>
      getUseSearchableIdeas(mockIdeas, "idea", "upvotes", true)
    );

    expect(result.current).toEqual([mockIdeas["idea1"], mockIdeas["idea2"]]);
  });

  it("returns undefined if ideas are not present", () => {
    let mockIdeas;
    const { result } = renderHook(() =>
      getUseSearchableIdeas(mockIdeas, "idea", "upvotes", true)
    );

    expect(result.current).not.toBeDefined();
  });
});
