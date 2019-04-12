import React, { useEffect } from 'react'

import Controller from "../webgl/Controller";
import Ocean from "../webgl/model/OceanModel";

let oceanModel

export default () => {
  let ocean = <div />
  useEffect(() => {
    ocean = new Ocean();
    oceanModel = ocean
    const oceanController = new Controller({
      model: oceanModel,
      container: "ocean"
    });
  }, []);
  return (
    <div id="ocean">{ocean}</div>
  )
}