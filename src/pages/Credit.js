import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { MainContent, Paper, Title } from "../components";

const Credit = ({ history }) => {
  const handleGoToMenu = () => {
    history.push("/menu");
  };

  return (
    <div className="login-page">
      <div className="container">
        <MainContent>
          <div className="announcement">
            <Paper
              onClose={handleGoToMenu}
              renderHeader={
                <Title>
                  <h1 className="_text-center">CREDIT</h1>
                </Title>
              }
              renderBody={
                <p className="_text-justify _bold">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  eget congue purus lorem vitae diam. Morbi in purus sit amet
                  erat blandit finibus. Orci varius natoque penatibus et
                  magnis dis parturient montes, nascetur ridiculus mus. Nam
                  varius orci accumsan imperdiet cursus. Quisque congue arcu
                  hendrerit suscipit tincidunt. Aliquam vel erat eget
                </p>
              }
            />
          </div>
        </MainContent>
      </div>
    </div>
  );
};

export default Credit;
