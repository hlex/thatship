import React from 'react'
import iconWheel from '../images/wheel.png'

const Avatar = ({ src, ...rest }) => {
  return (
    <div className="avatar" {...rest}>
      <div className="user-image rounded">
        <img src={src} />
      </div>
      <img className="background-image" src={iconWheel} alt="" />
    </div>
  );
};

export default Avatar;
