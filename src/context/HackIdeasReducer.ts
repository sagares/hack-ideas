import { LOG_OUT, SET_CURRENT_USER, SET_IDEAS } from "./Actions";

const HackIdeasReducer = (state: any, action: any) => {
  switch (action.type) {
    case LOG_OUT:
      return {};
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case SET_IDEAS:
      return {
        ...state,
        ideas: action.payload,
      };
    default:
      return state;
  }
};

export default HackIdeasReducer;
