import React, { useContext, useEffect } from "react";
import M from "materialize-css";
import { RegisterDialogProps } from "../../HackIdea.types";
import { registerIdea } from "../../utils/ServiceUtil";
import HackIdeasContext from "../../context";
import { useForm } from "../../hooks";

type RegisterFormFields = {
  title: string;
  description: string;
  tags: Array<string>;
};

const RegisterDialog = ({ isOpen, onCancel }: RegisterDialogProps) => {
  const { currentUser } = useContext(HackIdeasContext);

  const isRequired = (value: string) => {
    return value != null && value.trim().length > 0;
  };

  const validations = [
    ({ title }) => isRequired(title) || { title: "Title is required" },
    ({ description }) =>
      isRequired(description) || { description: "Description is required" },
    ({ tags }) => tags.length > 0 || { tags: "One more tags required." },
  ];

  const { values, changeHandler, isValid, errors, touched } =
    useForm<RegisterFormFields>(
      {
        title: "",
        description: "",
        tags: [],
      },
      validations
    );

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    registerIdea({
      name: values.title,
      description: values.description,
      tags: values.tags,
      submittedBy: currentUser.empId,
      submittedOn: Date.now(),
    });
    M.toast({ html: "Idea registered!!" });
    onCancel(false);
  };

  useEffect(() => {
    const selects = document.querySelectorAll("select");
    M.FormSelect.init(selects, {});
  }, []);

  return (
    <div className={`register-idea--modal ${isOpen ? "open" : ""}`}>
      <div id="modal1" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>Register New Idea</h4>
          <p>Please fill in the form below to register your hack idea.</p>
          <div className="row">
            <form className="col s12">
              <div
                className={`title-field input-field col s12 ${
                  touched.title && errors.title ? "invalid-field" : ""
                }`}
              >
                <input
                  id="idea_title"
                  type="text"
                  className="validate"
                  name="title"
                  value={values.title}
                  onChange={changeHandler}
                />
                <label htmlFor="idea_title">Title *</label>
                <span className="helper-text">{errors.title}</span>
              </div>
              <div
                className={`description-field input-field col s12 ${
                  touched.description && errors.description
                    ? "invalid-field"
                    : ""
                }`}
              >
                <textarea
                  id="description"
                  className={`materialize-textarea ${
                    touched.description && errors.description ? "invalid" : ""
                  }`}
                  name="description"
                  onChange={changeHandler}
                  value={values.description}
                ></textarea>
                <label htmlFor="description">Description *</label>
                <span
                  className="character-counter"
                  style={{ float: "right", fontSize: "12px" }}
                >
                  {values.description.length}
                </span>
                <span className="helper-text">{errors.description}</span>
              </div>
              <div
                className={`tags-field input-field col s12 ${
                  touched.tags && errors.tags ? "invalid-field" : ""
                }`}
              >
                <select
                  multiple
                  onChange={changeHandler}
                  name="tags"
                  className={`${touched.tags && errors.tags ? "invalid" : ""}`}
                >
                  <option value="" disabled>
                    Select one or more tags.
                  </option>
                  <option value="feature">Feature</option>
                  <option value="tech">Tech</option>
                  <option value="bugfix">Bugfix</option>
                </select>
                <label>Tags</label>
                <span className="helper-text">{errors.tags}</span>
              </div>
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <a
            className="cancel-btn modal-close waves-effect waves-red btn-flat"
            onClick={() => onCancel(false)}
          >
            Close
          </a>
          <button
            disabled={!isValid}
            className="submit-btn modal-close waves-effect waves-green btn-flat"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterDialog;
