import React from "react";
import { FilterProps } from "../../HackIdea.types";
import { SearchBar } from ".";
import { SortMenu } from "./SortMenu";

import "./filter.less";

const Filter = ({ searchText, onFilter, sortBy, orderAsc, onSort }: FilterProps) => {
  return (
    <div className="hack-ideas--filter row">
      <div className="search-bar col s12 m12 l4">
        <SearchBar searchText={searchText} onFilter={onFilter} />
      </div>
      <div className="filter-dropdown col s4 m2 l2">
        <SortMenu sortBy={sortBy} onSort={onSort} orderAsc={orderAsc}/>
      </div>
    </div>
  );
};

export default Filter;
