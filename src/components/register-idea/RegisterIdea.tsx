import React, { useState } from "react";
import RegisterDialog from "./RegisterDialog";

import "./register-idea.less";

const RegisterIdea = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = (isOpen: boolean) => {
    setModalOpen(isOpen);
  };

  return (
    <React.Fragment>
      <div className="fixed-action-btn register-idea-btn">
        <a
          className="btn-floating btn-large"
          onClick={() => toggleModal(true)}
        >
          <i className="large material-icons">add</i>
        </a>
      </div>
      {modalOpen && (
        <RegisterDialog isOpen={modalOpen} onCancel={toggleModal} />
      )}
    </React.Fragment>
  );
};

export default RegisterIdea;
