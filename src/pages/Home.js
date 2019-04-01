import React from 'react'

import { MainContent } from '../components'

import boat from '../images/boat.png'

const Home = () => {
  return (
    <div className="home-page">
      <div className="container">
        <MainContent>
          <img src={boat} alt="" />
          <p>(idiom) </p>
          <p>Used in reference to an opportunity that has passed or a situation that can no longer be changed.</p>
          <p>Used in reference to an opportunity that has passed or a situation that can no longer be changed.</p>
        </MainContent>
      </div>
    </div>
  )
}

export default Home