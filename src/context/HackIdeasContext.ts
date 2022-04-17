import { createContext } from "react";
import { IdeasArray } from "../HackIdea.types";

type Employee = {
  empId: string;
};

type HackIdeasContextType = {
  currentUser: Employee;
  logout: () => void;
  setCurrentUser: (employee: Employee) => void;
  ideas: IdeasArray;
  setIdeas: (ideas: IdeasArray) => void;
};

const HackIdeasContext = createContext<Partial<HackIdeasContextType>>({});

export { HackIdeasContext };
