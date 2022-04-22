import React, { useEffect } from "react";
import M from "materialize-css";

type SortMenuProps = {
  sortBy: string;
  orderAsc: boolean;
  onSort: (sortBy: string) => void;
};

export const SortMenu = ({ sortBy, onSort, orderAsc }: SortMenuProps) => {
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
            <i className="material-icons">access_time</i>
            By Created On
            {sortBy === "submittedOn" && (
              <i className="material-icons">
                {orderAsc ? "arrow_upward" : "arrow_downward"}
              </i>
            )}
          </a>
        </li>
        <li className={`${sortBy === "upvotes" ? "active" : ""}`}>
          <a onClick={() => onSort("upvotes")}>
            <i className="material-icons">thumb_up</i>By Upvotes
            {sortBy === "upvotes" && (
              <i className="material-icons">
                {orderAsc ? "arrow_downward" : "arrow_upward"}
              </i>
            )}
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
