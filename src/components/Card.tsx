import React, { useContext } from "react";
import HackIdeasContext from "../context";
import { CardProps } from "../HackIdea.types";
import { updateIdea } from "../utils/ServiceUtil";

import "./card.less";

const Card = ({ id }: CardProps) => {
  const { currentUser, ideas } = useContext(HackIdeasContext);

  const idea = ideas[id];

  const isUpvoted = () => {
    return (
      idea.upvotes?.length > 0 &&
      idea.upvotes.some((upvoted) => upvoted.empId === currentUser.empId)
    );
  };

  const handleUpvoteClick = () => {
    const upvotes = idea.upvotes ? [...idea.upvotes] : [];
    if (!isUpvoted()) {
      upvotes.push(currentUser);
    } else {
      const index = upvotes.findIndex(
        (upvoted) => upvoted.empId === currentUser.empId
      );
      upvotes.splice(index, 1);
    }

    updateIdea(idea.id, {
      ...idea,
      upvotes,
    });
  };

  return (
    <div className="hack-idea--card card">
      <div className="card-content">
        <span className="card-title">{idea.name}</span>
        <p>{idea.description}</p>
        <div className="card-chips">
          {idea.tags.map((tag) => (
            <div className="chip" key={tag}>
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className="card-action">
        <a
          className={`card-action--button ${isUpvoted() ? "upvoted" : ""} ${
            idea.submittedBy === currentUser.empId ? "disabled" : ""
          }`}
          onClick={handleUpvoteClick}
        >
          <i className="material-icons">thumb_up</i>
          {idea.upvotes?.length > 0 && (
            <span className="upvotes-count">({idea.upvotes.length})</span>
          )}
        </a>
      </div>
    </div>
  );
};

export default Card;
