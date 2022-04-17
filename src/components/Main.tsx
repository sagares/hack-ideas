import React, { useContext } from "react";
import HackIdeasContext from "../context";
import { HomePage, LoginForm } from "./";

const Main = () => {
  const { currentUser } = useContext(HackIdeasContext);

  return !currentUser ? <LoginForm /> : <HomePage />;
};

export default Main;
