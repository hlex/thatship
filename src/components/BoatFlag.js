import React from "react";

const BoatFlag = ({ show = false, content = {}, position, ...rest }) => {
  const author = content.author || '';
  const message = content.message || '';
  const top = position.top || 0;
  const left = position.left || 0;
  const text = `"${message.substring(0, 35)}" -`;
  // console.log('BoatFlag', { show, author, message, text, rest })
  return (
    <div className={`boat-flag ${show ? 'show' : ''}`} style={{ top, left }}>
      <div className="text">{text}</div>
      <div className="author">{author}</div>
    </div>
  );
};

export default BoatFlag