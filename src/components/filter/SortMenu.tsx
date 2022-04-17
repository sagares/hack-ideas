import React, { useEffect } from "react";
import M from "materialize-css";

type SortMenuProps = {
  sortBy: string;
  onSort: (sortBy: string) => void;
};

export const SortMenu = ({ sortBy, onSort }: SortMenuProps) => {
  useEffect(() => {
    var dropdowns = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(dropdowns, {});
  }, []);

  return (
    <React.Fragment>
      <a
        className="dropdown-trigger btn-floating btn-large"
        data-target="dropdown1"
      >
        <i className="large material-icons">sort</i>
      </a>

      <ul id="dropdown1" className="dropdown-content">
        <li className={`${sortBy === "submittedOn" ? "active" : ""}`}>
          <a onClick={() => onSort("submittedOn")}>
            <i className="material-icons">access_time</i>By Created On
          </a>
        </li>
        <li className={`${sortBy === "upvotes" ? "active" : ""}`}>
          <a onClick={() => onSort("upvotes")}>
            <i className="material-icons">thumb_up</i>By Upvotes
          </a>
        </li>
        <li className="divider" tabIndex={-1}></li>
        <li>
          <a onClick={() => onSort("")}>
            <i className="material-icons">cached</i>Reset
          </a>
        </li>
      </ul>
    </React.Fragment>
  );
};
