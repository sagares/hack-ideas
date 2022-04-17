/**
 * @jest-environment jsdom
 */
import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";

import { useSessionStorage } from "..";

describe("useLocalStorage", () => {
  let mockValue;
  beforeEach(() => {
    mockValue = { "mock-key": "mock-value" };
  });

  it("returns the initial value", () => {
    const { result } = renderHook(() => useSessionStorage("mock-storage", []));
    expect(result.current[0]).toEqual([]);
  });

  test("stores the value in session storage whenever key is changed", () => {
    const { result } = renderHook(() =>
      useSessionStorage("test_mock-storage", ["value2"])
    );
    expect(result.current[0]).toEqual(["value2"]);
  });

  test("sets value in the storage value when new item added", () => {
    const { result } = renderHook(() =>
      useSessionStorage("test_mock-storage", ["value1"])
    );
    act(() => result.current[1](mockValue));
    expect(result.current[0]).toEqual({ "mock-key": "mock-value" });
  });

  test("returns stored value when given key already exists in session storage", () => {
    const { result } = renderHook(() =>
      useSessionStorage("test_mock-storage", ["value2"])
    );
    jest.spyOn(window.sessionStorage.__proto__, "getItem");
    window.sessionStorage.__proto__.getItem = jest
      .fn()
      .mockReturnValue(mockValue);
    expect(result.current[0]).toEqual(mockValue);
  });

  test("returns initial value when the values is not valid JSON", () => {
    const { result } = renderHook(() =>
      useSessionStorage("test-webId_mock-storage", [{ key: "value" }])
    );
    jest.spyOn(window.sessionStorage.__proto__, "getItem");
    window.sessionStorage.__proto__.getItem = jest
      .fn()
      .mockReturnValue("invalid-json-string");
    expect(result.current[0]).toEqual([{ key: "value" }]);
  });
});
