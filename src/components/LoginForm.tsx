import React, { useContext, useEffect, useState } from "react";
import M from "materialize-css";
import HackIdeasContext from "../context";
import { useSessionStorage } from "../hooks";
import useFormInput from "../hooks/useFormInput";
import { getEmployeeById, registerEmployee } from "../utils/ServiceUtil";

import "./login-form.less";

const LoginForm = () => {
  const { setCurrentUser } = useContext(HackIdeasContext);
  const [userInSession, setUserInSession] = useSessionStorage("employee", null);
  const employeeId = useFormInput("");
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]{1,6}$/;
    if (e.currentTarget.value === "" || re.test(e.currentTarget.value)) {
      employeeId.onChange(e);
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const re = /^[0-9\b]{6}$/;
    if (re.test(employeeId.value)) {
      setIsValid(true);
      proceedToLogin();
    } else {
      setIsValid(false);
    }
  };

  const proceedToLogin = () => {
    getEmployeeById(employeeId.value, (employee) => {
      if (employee) {
        setCurrentUser(employee);
        setUserInSession(employee);
      } else {
        registerEmployee(employeeId.value);
        setCurrentUser({ empId: employeeId.value });
        setUserInSession({ empId: employeeId.value });
      }
    });
  };

  useEffect(() => {
    setCurrentUser(userInSession);
    const tooltips = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltips, {});
  }, []);

  return (
    <div className="card-panel login-form-card z-depth-3">
      <div className="row valign-wrapper login-form-wrapper">
        <div className="col s12 m12 l6">
          <h2>{`{ Hack Ideas }`}</h2>
          <h6>Enter With Employee Id</h6>
        </div>
        <form className="col s12 m12 l6" noValidate onSubmit={handleLogin}>
          <div className="row valign-wrapper">
            <div className="input-field col s12">
              <input
                id="empId"
                type="text"
                className="validate tooltipped"
                data-position="bottom"
                data-tooltip="Enter your 6 digit employee ID"
                value={employeeId.value}
                onChange={handleChange}
                data-error="Employee ID is required"
                required
              />
              <label htmlFor="empId">Employee ID</label>
              {!isValid && (
                <span className="helper-text" data-error="Enter valid employee id.">
                  Enter valid employee id.
                </span>
              )}
            </div>
          </div>
          <div className="row">
            <button
              type="submit"
              name="btn_login"
              className="col s6 m12 l12 btn btn-large waves-effect"
              disabled={!employeeId.value}
            >
              Login
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
