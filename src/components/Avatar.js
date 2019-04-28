import React, { Fragment } from 'react'
import ReactTooltip from 'react-tooltip'

import iconWheel from '../images/wheel.png'

const Avatar = ({ src, ...rest }) => {
  return (
    <Fragment>
      <a data-tip data-for='show-your-boats'>
        <div className="avatar" {...rest}>
          <div className="user-image rounded">
            <img src={src} />
          </div>
          <img className="background-image" src={iconWheel} alt="" />
        </div>
      </a>
      <ReactTooltip id="show-your-boats" place="bottom" type="dark" effect="solid">
        <p>Show Your Boats</p>
      </ReactTooltip>
    </Fragment>
  );
};

export default Avatar;
