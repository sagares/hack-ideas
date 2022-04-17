import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

import {
  getEmployeeById,
  getEmployeeData,
  getIdeas,
  registerEmployee,
  registerIdea,
  updateIdea,
} from "../ServiceUtil";

jest.mock("firebase/app");
jest.mock("firebase/database");

describe("Service Util", () => {
  beforeEach(() => {
    const data = {};
    const snapshot = { val: () => data };
    (initializeApp as jest.Mock).mockReturnValue({});
    (getDatabase as jest.Mock).mockReturnValue({ name: "firebase-db" });
    (ref as jest.Mock).mockReturnValue("mockRef");
    (onValue as jest.Mock).mockImplementation((ref, callback) => {
      callback(snapshot);
      return jest.fn();
    });
    (set as jest.Mock).mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("registers employee", () => {
    registerEmployee("123456");
    expect(set).toBeCalledWith("mockRef", { empId: "123456" });
  });

  test("gets employee by id", () => {
    const callback = jest.fn();
    getEmployeeById("123456", callback);
    expect(ref).toHaveBeenCalledWith(undefined, "employees/123456");
    expect(onValue).toHaveBeenCalledWith("mockRef", expect.any(Function));
  });

  test("gets employee data", () => {
    const callback = jest.fn();
    getEmployeeData(callback);
    expect(ref).toHaveBeenCalledWith(undefined, "employees/");
    expect(onValue).toHaveBeenCalledWith("mockRef", expect.any(Function));
  });

  test("gets ideas", () => {
    const callback = jest.fn();
    getIdeas(callback);
    expect(ref).toHaveBeenCalledWith(undefined, "ideas/");
    expect(onValue).toHaveBeenCalledWith("mockRef", expect.any(Function));
  });

  test("registers idea", () => {
    registerIdea({
      name: "mock title",
      description: "mock-description",
      tags: ["mock-tag"],
      submittedBy: "123456",
      submittedOn: 1023232,
    });
    expect(set).toBeCalledWith("mockRef", {
      id: "mockTitle",
      name: "mock title",
      description: "mock-description",
      tags: ["mock-tag"],
      submittedBy: "123456",
      submittedOn: 1023232,
      upvotes: [],
    });
  });

  test("updates idea", () => {
    updateIdea("mockTitle", {
      name: "mock title",
      description: "mock-description",
      tags: ["mock-tag"],
      submittedBy: "123456",
      submittedOn: 1023232,
    });
    expect(set).toBeCalledWith("mockRef", {
      name: "mock title",
      description: "mock-description",
      tags: ["mock-tag"],
      submittedBy: "123456",
      submittedOn: 1023232,
    });
  });
});
