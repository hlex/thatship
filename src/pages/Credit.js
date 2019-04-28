import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { MainContent, Paper, Title, Ocean } from "../components";

import iconMinnie from '../images/mn_logo.png'
import iconChula from '../images/chula.jpg'
import iconIdChula from '../images/idchula.png'

const Credit = ({ history }) => {
  const handleGoToMenu = () => {
    history.goBack()
  };

  return (
    <div className="credit-page">
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
                <div className="content-container">
                  <div className="organizer">
                    <img src={iconMinnie} alt="" />
                    <img id="image-chula" src={iconChula} alt="" />
                    <img src={iconIdChula} alt="" />
                  </div>
                  <p className="_bold">
                    This website is <div className="underline">Minnie</div>'s senior project for her bachelor degree at <div className="underline">Chulalongkorn university</div>'s <div className="underline">industrial design</div> program.
                  </p>
                  <div className="credit-contact">
                    <h4>Contact:</h4>
                    <p>Minnie Chantpakpimon</p>
                    <p>email: chantchanokch@gmail.com</p>
                    <p>website: <a href="https://minniechantpakpimon.firebaseapp.com/" target="_blank">minniecc.com</a></p>
                  </div>
                </div>
              }
            />
          </div>
          {/* <Ocean /> */}
        </MainContent>
      </div>
    </div>
  );
};

export default Credit;
