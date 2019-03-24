import React from 'react'

import iconFB from '../images/icon_fb.png'
import iconTwitter from '../images/icon_twitter.png'

const Footer = () => {
  return (
    <div className="footer">
      <div className="link-list">
        <a href="#" target="_blank"><img src={iconFB} alt="" /></a>
        <a href="#" target="_blank"><img src={iconTwitter} alt="" /></a>
        <a href="#" target="_blank"><p>How To</p></a>
        <a href="#" target="_blank"><p>Credit</p></a>
        <a href="#" target="_blank"><p>Contact</p></a>
      </div>
    </div>
  )
}

export default Footer