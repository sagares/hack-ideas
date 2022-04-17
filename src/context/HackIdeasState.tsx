import React, { useReducer } from "react";
import { Employee, IdeasArray } from "../HackIdea.types";
import { HackIdeasContext } from "./HackIdeasContext";
import HackIdeasReducer from "./HackIdeasReducer";
import { LOG_OUT, SET_CURRENT_USER, SET_IDEAS } from "./Actions";

const HackIdeasState = ({ children }: any) => {
  const initialState = {
    currentUser: null,
    ideas: null,
  };

  const [state, dispatch] = useReducer(HackIdeasReducer, initialState);
  const setCurrentUser = (employee: Employee) => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: employee,
    });
  };

  const setIdeas = (ideas: IdeasArray) => {
    dispatch({
      type: SET_IDEAS,
      payload: ideas,
    });
  };

  const logout = () => {
    dispatch({
      type: LOG_OUT,
      payload: initialState
    });
  };

  return (
    <HackIdeasContext.Provider
      value={{
        currentUser: state.currentUser,
        ideas: state.ideas,
        logout,
        setCurrentUser,
        setIdeas
      }}
    >
      {children}
    </HackIdeasContext.Provider>
  );
};

export { HackIdeasState };
