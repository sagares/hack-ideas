/**
 * @jest-environment jsdom
 */
import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";

import { useForm } from "..";

let DEFAULT_FORM_VALUES: { testInput: string; age: number };
let FORM_VALIDATORS: Array<any>;
const getUseForm = () => {
  return useForm(DEFAULT_FORM_VALUES, FORM_VALIDATORS);
};

describe("useForm", () => {
  beforeEach(() => {
    DEFAULT_FORM_VALUES = {
      testInput: "",
      age: 0,
    };
    FORM_VALIDATORS = [
      ({ testInput }) => {
        if (testInput.length <= 0) {
          return { testInput: "test input has no test value" };
        }
      },
      ({ age }) => {
        if (age.length <= 0) {
          return { testInput: "age has no test value" };
        }
      },
    ];
  });

  test("sets default state and validations", () => {
    const getEmptyUseForm = () => {
      return useForm();
    };
    const { result } = renderHook(() => getEmptyUseForm());

    act(() => {
      result.current.changeHandler({
        target: { name: "testInput", tagName: "INPUT", value: "foobar" },
      });
    });

    expect(result.current.values).toEqual({ testInput: "foobar" });
    expect(result.current.isValid).toEqual(true);
  });

  test("sets value of the form elements other than select", () => {
    const { result } = renderHook(() => getUseForm());
    expect(result.current.values["testInput"]).toBe("");
    act(() => {
      result.current.changeHandler({
        target: { name: "testInput", tagName: "INPUT", value: "foobar" },
      });
    });
    expect(result.current.values["testInput"]).toBe("foobar");
    expect(result.current.touched["testInput"]).toBe(true);
    expect(result.current.touched["age"]).toBeFalsy;
  });

  test("sets error for the form elements", () => {
    const { result } = renderHook(() => getUseForm());
    expect(result.current.values["testInput"]).toBe("");
    // Update testInput field
    act(() => {
      result.current.changeHandler({
        target: { name: "testInput", tagName: "INPUT", value: "" },
      });
    });

    expect(result.current.touched["testInput"]).toBe(true);
    expect(result.current.errors["testInput"]).toBe(
      "test input has no test value"
    );
  });

  test("sets selected options if target is select", () => {
    const { result } = renderHook(() => getUseForm());
    expect(result.current.values["testInput"]).toBe("");
    // Update testInput field
    act(() => {
      result.current.changeHandler({
        target: {
          name: "testInput",
          tagName: "SELECT",
          selectedOptions: [{ value: "option1" }, { value: "option2" }],
        },
      });
    });

    expect(result.current.values["testInput"]).toEqual(["option1", "option2"]);
  });
});
