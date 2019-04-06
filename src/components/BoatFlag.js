import React from "react";

const BoatFlag = ({ show, content }) => {
  const author = content.author || "";
  const text = `&#8246;${content.message.substring(0, 35)}}...&#8246; -`;
  return (
    <div className={`boat-flag ${show ? 'show' : ''}`}>
      <div className="boat-flag__excerpt">{text}</div>
      <div className="boat-flag__author">{author}</div>
    </div>
  );
};

export default BoatFlag