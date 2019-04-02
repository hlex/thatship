import React from "react";

import boat2 from "../images/boat2.png";

export default ({ children }) => {
  return (
    <div className="content-title">
      <img className="_center" src={boat2} alt="" />
      {children}
    </div>
  );
};
