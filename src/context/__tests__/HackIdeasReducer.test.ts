import HackIdeasReducer from "../HackIdeasReducer";

describe("Hack Ideas Reducer", () => {
  let mockState: any, mockAction: any;

  beforeEach(() => {
    mockState = {
      currentUser: "",
    };
    mockAction = {};
  });

  test("returns same state when there is not matching type of action", () => {
    mockAction.type = "non-matching-action";

    const updatedState = HackIdeasReducer(mockState, mockAction);
    expect(updatedState).toEqual(mockState);
  });

  test("clears the state if action type is LOG_OUT", () => {
    mockState = {
      currentUser: "current-user",
    };
    mockAction.type = "LOG_OUT";
    const updatedState = HackIdeasReducer(mockState, mockAction);
    expect(updatedState).toEqual({});
  });

  test("sets current user in state if action type is SET_CURRENT_USER", () => {
    mockAction.type = "SET_CURRENT_USER";
    mockAction.payload = "mock-current-user";
    const updatedState = HackIdeasReducer(mockState, mockAction);
    expect(updatedState).toEqual(updatedState);
  });

  test("sets ideas in state if action type is SET_CURRENT_USER", () => {
    mockAction.type = "SET_IDEAS";
    mockAction.payload = {
      idea1: { name: "idea 1" },
      idea2: { name: "idea 2" },
    };
    const updatedState = HackIdeasReducer(mockState, mockAction);
    expect(updatedState).toEqual({
      currentUser: "",
      ideas: { idea1: { name: "idea 1" }, idea2: { name: "idea 2" } },
    });
  });
});
