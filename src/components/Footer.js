import React from 'react'
import { Link } from 'react-router-dom'

import iconFB from '../images/icon_fb.png'
import iconTwitter from '../images/icon_twitter.png'

const Footer = () => {
  return (
    <div className="footer">
      <div className="link-list">
        <a href="#" target="_blank"><img src={iconFB} alt="" /></a>
        <a href="#" target="_blank"><img src={iconFB} alt="" /></a>
        <a href="#" target="_blank"><img src={iconTwitter} alt="" /></a>
        <Link to="/about"><p>About</p></Link>
        <Link to="/credit"><p>Credit</p></Link>
        <Link to="/terms"><p>Term & Condition</p></Link>
      </div>
    </div>
  )
}

export default Footer