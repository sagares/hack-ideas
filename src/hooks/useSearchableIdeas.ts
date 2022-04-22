import { useMemo } from "react";
import { IdeasArray } from "../HackIdea.types";

const useSearchableIdeas = (
  ideas: IdeasArray,
  searchText: string,
  sortBy: string,
  orderAsc: boolean
) => {
  return useMemo(() => {
    const escapedSearchString = searchText.replace(
      /[-[\]{}()*+?.,\\^$|#\s]/g,
      "\\$&"
    );
    const matchString = new RegExp(escapedSearchString, "gi");

    const filteredIdeas =
      ideas &&
      Object.keys(ideas).reduce((acc, key) => {
        const idea = ideas[key];
        if (
          idea.name.toLowerCase().match(matchString) ||
          idea.id.toLowerCase().match(matchString) ||
          idea.tags.includes(searchText)
        ) {
          acc.push(idea);
        }
        return acc;
      }, []);

    if (filteredIdeas) {
      if (sortBy === "submittedOn") {
        filteredIdeas.sort((idea1, idea2) => {
          return orderAsc ? idea2.submittedOn - idea1.submittedOn : idea1.submittedOn - idea2.submittedOn;
        });
      } else if (sortBy === "upvotes") {
        filteredIdeas.sort((idea1, idea2) => {
          const upvotes1 = idea1.upvotes?.length || 0;
          const upvotes2 = idea2.upvotes?.length || 0;
          return orderAsc ? upvotes2 - upvotes1 : upvotes1 - upvotes2;
        });
      }
    }

    return filteredIdeas;
  }, [ideas, searchText, sortBy, orderAsc]);
};

export default useSearchableIdeas;
