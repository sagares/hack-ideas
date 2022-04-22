import React, { useContext, useEffect, useState } from "react";
import { getIdeas } from "../utils/ServiceUtil";
import HackIdeasContext from "../context";
import { Idea } from "../HackIdea.types";
import { useSearchableIdeas } from "../hooks";
import NavBar from "./nav-bar";
import RegisterIdea from "./register-idea";
import { Card, Filter } from ".";

import "./home-page.less";

const HomePage = () => {
  const { ideas, setIdeas } = useContext(HackIdeasContext);

  const [searchString, setSearchString] = useState("");
  const [orderAsc, serOrderAsc] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const filteredIdeas = useSearchableIdeas(
    ideas,
    searchString,
    sortBy,
    orderAsc
  );

  const handleSortChange = (newSortBy: string) => {
    setSortBy((prevSortBy) => {
      serOrderAsc(prevSortBy === newSortBy ? !orderAsc : orderAsc);
      return newSortBy;
    });
  };

  useEffect(() => {
    getIdeas(setIdeas);
  }, []);

  return (
    <div className="hack-ideas--home-page">
      <NavBar />
      <Filter
        onFilter={setSearchString}
        searchText={searchString}
        sortBy={sortBy}
        orderAsc={orderAsc}
        onSort={handleSortChange}
      />
      <div className="hack-ideas--cards">
        {filteredIdeas?.length > 0 ? (
          <div className="hack-idea--grid">
            {filteredIdeas.map((idea: Idea) => {
              return <Card id={idea.id} key={idea.id} />;
            })}
          </div>
        ) : (
          <div className="card-panel red lighten-4 center-align">
            No ideas to show.
          </div>
        )}
      </div>
      <RegisterIdea />
    </div>
  );
};

export default HomePage;
