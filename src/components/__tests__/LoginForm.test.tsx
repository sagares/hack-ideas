/**
 * @jest-environment jsdom
 */
import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getEmployeeById, registerEmployee } from "../../utils/ServiceUtil";
import HackIdeasContext from "../../context";
import LoginForm from "../LoginForm";


jest.mock("../../utils/ServiceUtil");
jest.mock("../login-form.less", () => jest.fn());

describe("Login From Component", () => {
  let element, component, setCurrentUser;

  beforeEach(() => {
    (getEmployeeById as jest.Mock).mockImplementation((employee, cb) => {
      cb({empId: employee});
      return jest.fn();
    });

    (registerEmployee as jest.Mock).mockReturnValue({});

    setCurrentUser = jest.fn().mockImplementation(() => {});

    element = document.createElement("div");
    component = render(
      <HackIdeasContext.Provider value={{ setCurrentUser }}>
          <LoginForm />
      </HackIdeasContext.Provider>,
      {
        container: document.body.appendChild(element),
      }
    );
  });

  afterEach(() => {
    document.body.removeChild(element);
    jest.clearAllMocks();
  });

  test("renders login form", () => {
    expect(component.container).toMatchSnapshot();
  });

  test("updates input value on change event and enabled login button", () => {
    const empIdInput = component.container.querySelector("#empId");
    const loginBtn = component.container.querySelector("button[name=\"btn_login\"]");

    fireEvent.change(empIdInput, { target: { value: "123456" } });
    expect(empIdInput.value).toBe("123456");
    expect(loginBtn.disabled).toBe(false);
  });

  test("updates input value if value is empty string and disables login button", () => {
    const empIdInput = component.container.querySelector("#empId");
    const loginBtn = component.container.querySelector("button[name=\"btn_login\"]");

    fireEvent.change(empIdInput, { target: { value: "" } });
    expect(empIdInput.value).toBe("");
    expect(loginBtn.disabled).toBe(true);
  });

  test("does not update input if value is not number", () => {
    const empIdInput = component.container.querySelector("#empId");

    fireEvent.change(empIdInput, { target: { value: "123" } });
    expect(empIdInput.value).toBe("123");

    fireEvent.change(empIdInput, { target: { value: "ab" } });
    expect(empIdInput.value).toBe("123");
  });

  test("does not update input if value is more than 6 digit number", () => {
    const empIdInput = component.container.querySelector("#empId");

    fireEvent.change(empIdInput, { target: { value: "123" } });
    expect(empIdInput.value).toBe("123");

    fireEvent.change(empIdInput, { target: { value: "1234567" } });
    expect(empIdInput.value).toBe("123");
  });

  test("displays error message on login when employee id is not valid", () => {
    const empIdInput = component.container.querySelector("#empId");
    const loginBtn = component.container.querySelector("button[name=\"btn_login\"]");

    fireEvent.change(empIdInput, { target: { value: "123" } });
    expect(empIdInput.value).toBe("123");

    act(() => {
      loginBtn.click(loginBtn);
    });
    
    expect(component.container.querySelector(".helper-text")).toBeDefined();
  });

  test("does not display error message on login when employee id is valid", () => {
    const empIdInput = component.container.querySelector("#empId");
    const loginBtn = component.container.querySelector("button[name=\"btn_login\"]");

    fireEvent.change(empIdInput, { target: { value: "123456" } });

    act(() => {
      loginBtn.click(loginBtn);
    });
    
    expect(component.container.querySelector(".helper-text")).toBe(null);
  });

  test("sets current user if the employee is already present", () => {
    const empIdInput = component.container.querySelector("#empId");
    const loginBtn = component.container.querySelector("button[name=\"btn_login\"]");

    fireEvent.change(empIdInput, { target: { value: "123456" } });

    act(() => {
      loginBtn.click(loginBtn);
    });
    
    expect(setCurrentUser).toHaveBeenCalledWith({"empId": "123456"});
  });

  test("registers employee first and then set current user if the employee is not present", () => {
    (getEmployeeById as jest.Mock).mockImplementation((employee, cb) => {
      cb(null);
      return jest.fn();
    });

    const empIdInput = component.container.querySelector("#empId");
    const loginBtn = component.container.querySelector("button[name=\"btn_login\"]");

    fireEvent.change(empIdInput, { target: { value: "550324" } });

    act(() => {
      loginBtn.click(loginBtn);
    });
    
    expect(setCurrentUser).toHaveBeenCalledWith({"empId": "550324"});
  });
});
