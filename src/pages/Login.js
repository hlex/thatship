import React from 'react'

import { MainContent } from '../components'

import iconMe from '../images/me.png'

const Login = () => {
  return (
    <div className="login-page">
      <div className="container">
        <MainContent>
        <div className="announcement">
          <div className="paper _center">
            <div className="button-close"><i className="fa fa-times" /></div>
            <div className="paper-body">
              <img className="_center" src={iconMe} alt="" />
              <h1 className="_text-center">Confess your regret</h1>
              <p className="_text-center">Please log in with Facebook to start sailing your regrets away. You will be able to keep track of your journey while navigating through others regrets</p>
              <div className="_center" style={{ width: 200 }}>
                <button className="button with-addon">
                  <span className="addon-icon">
                    <i className="fab fa-facebook-f"></i>
                  </span>
                  <span>
                    Log in with Facebook
                  </span>
                </button>
              </div>
            </div>
            <div className="paper-footer">
              <h4 className="_text-center">By clicking the button above, you are agreeing to our Terms and Conditions</h4>
            </div>
          </div>
        </div>
        </MainContent>
      </div>
    </div>
  )
}

export default Login