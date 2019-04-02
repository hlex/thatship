import React from 'react'
import { Link } from 'react-router-dom'

import { MainContent } from '../components'

import iconMe from '../images/me.png'

const Login = ({ history }) => {

  const handleCancelLogin = () => {
    history.push('/menu')
  }

  return (
    <div className="login-page">
      <div className="container">
        <MainContent>
        <div className="announcement">
          <div className="paper _center">
            <div className="button-close" onClick={handleCancelLogin}><i className="fa fa-times" /></div>
            <div className="paper-body">
              <img className="_center" src={iconMe} alt="" />
              <h1 className="_text-center">Confess your regret</h1>
              <p className="_text-justify _bold">Please log in with Facebook to start sailing your regrets away. You will be able to keep track of your journey while navigating through others regrets</p>
              <div style={{ width: 200, margin: '30px auto' }}>
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
              <h6 className="_text-center _bold">By clicking the button above, you are agreeing to our <Link to="/terms"><u>Terms and Conditions</u></Link></h6>
            </div>
          </div>
        </div>
        </MainContent>
      </div>
    </div>
  )
}

export default Login