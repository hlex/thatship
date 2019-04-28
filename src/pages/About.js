import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { MainContent, Paper, Title, Ocean } from "../components";

const Credit = ({ history }) => {
  const handleGoToMenu = () => {
    history.push('/discover')
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
                  <h1 className="_text-center">ABOUT `THAT SHIP HAS SAILED`</h1>
                </Title>
              }
              renderBody={
                <p className="_text-justify _bold overflow-y">
                  We live our lives and time sails by, taking with it
                  opportunities, moments, uncountable potential futures that
                  never came to be. Chances missed and roads not taken weigh
                  down our memories and we carry these with us each day. But
                  what if we could let them go? Send them out on waves on
                  anonymity, their sails billowed and pushed with a sigh of
                  relief. Our little ships of regret leaving us forever, helping
                  us move on. ‘The Ship Has Sailed’ This idea encapsulates the
                  lost opportunity - a situation we no longer have the power to
                  change. But it can also suggest the possibility for comfort
                  and freedom in letting go, acknowledging what has passed
                  forever. ‘The Ship Has Sailed’ site will give people the
                  opportunity to write their regrets - whether about family,
                  career, love, ‘bucket list’ goals or anything else - and send
                  it out into the wide, dark space of the internet, in a sea of
                  other people’s memories, grief and loss. By doing this
                  mindful, thoughtful exercise, people can achieve a kind of
                  ‘catharsis’ by verbalising and recognising their loss, holding
                  it in words before they let it drift away from them. Users can
                  take comfort knowing they are not alone as they share this
                  experience with people around the world, and hopefully find
                  peace and freedom in the act. Life is brief, and happiness is
                  too fragile to carry the weight of regret. Let it sail away.
                </p>
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
