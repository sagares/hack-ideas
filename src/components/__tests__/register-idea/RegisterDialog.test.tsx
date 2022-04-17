/**
 * @jest-environment jsdom
 */
import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { registerIdea } from "../../../utils/ServiceUtil";
import HackIdeasContext from "../../../context";
import { useForm } from "../../../hooks";
import RegisterDialog from "../../register-idea/RegisterDialog";

jest.mock("../../../utils/ServiceUtil");
//jest.mock("../../../hooks");

describe("Register Dialog Component", () => {
  let element, component, onCancel, changeHandler, dateNowSpy;

  beforeEach(() => {
    changeHandler = jest.fn().mockImplementation();
    dateNowSpy = jest
      .spyOn(Date, "now")
      .mockImplementation(() => 1487076708000);
    onCancel = jest.fn().mockImplementation(() => {});
    (registerIdea as jest.Mock).mockImplementation(() => {});

    element = document.createElement("div");
    component = render(
      <HackIdeasContext.Provider
        value={{
          currentUser: { empId: "123456" },
        }}
      >
        <RegisterDialog isOpen={true} onCancel={onCancel} />
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

  test("enables submit button if form is valid", () => {
    const titleInput = element.querySelector('input[name="title"]');
    const description = element.querySelector('textarea[name="description"]');
    const tags = element.querySelector('select[name="tags"]');

    fireEvent.change(titleInput, { target: { value: "mock title" } });
    fireEvent.change(description, { target: { value: "mock description" } });
    fireEvent.change(tags, { target: { value: "feature" } });

    const submitButton = element.querySelector(".modal-footer .submit-btn");
    expect(submitButton.disabled).toBe(false);
  });

  test("submits idea on click of submit button", () => {
    const titleInput = element.querySelector('input[name="title"]');
    const description = element.querySelector('textarea[name="description"]');
    const tags = element.querySelector('select[name="tags"]');

    fireEvent.change(titleInput, { target: { value: "mock title" } });
    fireEvent.change(description, { target: { value: "mock description" } });
    fireEvent.change(tags, { target: { value: "feature" } });

    const submitButton = element.querySelector(".modal-footer .submit-btn");
    fireEvent.click(submitButton);

    expect(registerIdea).toHaveBeenCalledWith({
      description: "mock description",
      name: "mock title",
      submittedBy: "123456",
      submittedOn: 1487076708000,
      tags: ["feature"],
    });
    expect(onCancel).toHaveBeenCalledWith(false);
  });

  test("disables submit button if form is invalid", () => {
    const submitButton = element.querySelector(".modal-footer .submit-btn");
    expect(submitButton.disabled).toBe(true);
  });

  test("closes modal on click of cancel button", () => {
    const cancelButton = element.querySelector(".modal-footer .cancel-btn");
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalledWith(false);
  });

  test("shows validation messages for form fields", () => {
    const titleInput = element.querySelector('input[name="title"]');
    const description = element.querySelector('textarea[name="description"]');
    const tags = element.querySelector('select[name="tags"]');

    fireEvent.change(titleInput, { target: { value: "mock title" } });
    fireEvent.change(description, { target: { value: "mock description" } });
    fireEvent.change(tags, { target: { value: "feature" } });

    fireEvent.change(titleInput, { target: { value: "" } });
    fireEvent.change(description, { target: { value: "" } });
    fireEvent.change(tags, { target: { value: null } });

    const titleMessage = element.querySelector(".title-field .helper-text");
    const descriptionMessage = element.querySelector(
      ".description-field .helper-text"
    );

    expect(titleMessage.innerHTML).toBe("Title is required");
    expect(descriptionMessage.innerHTML).toBe("Description is required");
  });

  test("closes modal when isOpen is false", () => {
    component = render(
      <HackIdeasContext.Provider
        value={{
          currentUser: { empId: "123456" },
        }}
      >
        <RegisterDialog isOpen={false} onCancel={onCancel} />
      </HackIdeasContext.Provider>,
      {
        container: document.body.appendChild(element),
      }
    );

    expect(
      component.container
        .querySelector(".register-idea--modal")
        .classList.contains("open")
    ).toBe(false);
  });
});
