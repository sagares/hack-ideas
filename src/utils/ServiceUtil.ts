// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import {  Idea } from "../HackIdea.types";

const firebaseConfig = {
  apiKey: "AIzaSyC0RFn0RNnX8EoPHpAu-lf4EvN08aPKMCg",
  authDomain: "hack-ideas-c7cd7.firebaseapp.com",
  databaseURL: "https://hack-ideas-c7cd7-default-rtdb.firebaseio.com",
  projectId: "hack-ideas-c7cd7",
  storageBucket: "hack-ideas-c7cd7.appspot.com",
  messagingSenderId: "197788164361",
  appId: "1:197788164361:web:36a94bf614b4b5c830f3d8",
  measurementId: "G-660ZLLJJEB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

const registerEmployee = (empId: string) => {
  set(ref(database, "employees/" + empId), {
    empId,
  });
};

const getEmployeeById = (empId: string, callback: Function) => {
  let empRef = ref(database, "employees/" + empId);
  return onValue(empRef, (snapshot) => {
    callback(snapshot.val());
  });
};

const getEmployeeData = (callback: Function) => {
  let empRef = ref(database, "employees/");
  return onValue(empRef, (snapshot) => {
    callback(snapshot.val());
  });
};

const getIdeas = (callback: Function) => {
  let empRef = ref(database, "ideas/");
  return onValue(empRef, (snapshot) => {
    callback(snapshot.val());
  });
};

const registerIdea = (idea: Idea) => {
  const id = toCamelCase(idea.name);
  set(ref(database, "ideas/" + id), {
    ...idea,
    id,
    upvotes: [],
  });
};

const updateIdea = (ideaId: string, updatedIdea: Idea) => {
  set(ref(database, "ideas/" + ideaId), updatedIdea);
};

const toCamelCase = (sentenceCase: string) => {
  var out = "";
  sentenceCase.split(" ").forEach((el, idx) => {
    var add = el.toLowerCase();
    out += idx === 0 ? add : add[0].toUpperCase() + add.slice(1);
  });
  return out;
};

export {
  getEmployeeById,
  getEmployeeData,
  getIdeas,
  registerEmployee,
  registerIdea,
  updateIdea,
};
