/**
 * @jest-environment jsdom
 */
import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";

import { useFormInput } from "..";

const getUseFormInput = () => {
  return useFormInput("");
};

describe("useFormInput", () => {
  test("sets value on change", () => {
    const { result } = renderHook(() => getUseFormInput());

    act(() => {
      result.current.onChange({
        target: { value: "foobar" },
      });
    });

    expect(result.current.value).toBe("foobar");
  });
});
