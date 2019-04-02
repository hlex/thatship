import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { MainContent, Paper } from "../components";

import iconMe from "../images/me.png";

const Login = ({ history }) => {
  const handleCancelLogin = () => {
    history.push("/menu");
  };

  return (
    <div className="login-page">
      <div className="container">
        <MainContent>
          <div className="announcement">
            <Paper
              onClose={handleCancelLogin}
              renderHeader={
                <Fragment>
                  <img className="_center" src={iconMe} alt="" />
                  <h1 className="_text-center">Confess your regret</h1>
                </Fragment>
              }
              renderBody={
                <Fragment>
                  <p className="_text-justify _bold">
                    Please log in with Facebook to start sailing your regrets
                    away. You will be able to keep track of your journey while
                    navigating through others regrets
                  </p>
                  <div style={{ width: 200, margin: "30px auto" }}>
                    <button className="button with-addon">
                      <span className="addon-icon">
                        <i className="fab fa-facebook-f" />
                      </span>
                      <span>Log in with Facebook</span>
                    </button>
                  </div>
                </Fragment>
              }
              renderFooter={
                <h6 className="_text-center _bold">
                  By clicking the button above, you are agreeing to our{" "}
                  <Link to="/terms">
                    <u>Terms and Conditions</u>
                  </Link>
                </h6>
              }
            />
          </div>
        </MainContent>
      </div>
    </div>
  );
};

export default Login;
