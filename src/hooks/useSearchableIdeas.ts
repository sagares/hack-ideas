import { useMemo } from "react";
import { IdeasArray } from "../HackIdea.types";

const useSearchableIdeas = (ideas: IdeasArray, searchText: string, sortBy: string) => {
  return useMemo(() => {
    const escapedSearchString = searchText.replace(
      /[-[\]{}()*+?.,\\^$|#\s]/g,
      "\\$&"
    );
    const matchString = new RegExp(escapedSearchString, "gi");

    const filteredIdeas = ideas &&
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

      return (
        filteredIdeas &&
        filteredIdeas.sort((idea1, idea2) => {
          if (sortBy === "submittedOn") {
            return idea2.submittedOn - idea1.submittedOn;
          } else if(sortBy === "upvotes"){
            const upvotes1 = idea1.upvotes?.length || 0;
            const upvotes2 = idea2.upvotes?.length || 0;
            return upvotes2 - upvotes1;
          } else {
              return 0;
          }
        })
      ); 
    
  }, [ideas, searchText, sortBy]);
};

export default useSearchableIdeas;
