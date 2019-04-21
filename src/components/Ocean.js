import React, { useEffect } from 'react'

import Controller from "../webgl/Controller";
import Ocean from "../webgl/model/OceanModel";

var oceanModel
var oceanController

export default () => {
  useEffect(() => {
    oceanModel = new Ocean();
    oceanController = new Controller({
      model: oceanModel,
      container: "ocean"
    });
  }, []);
  return (
    <div id="ocean" />
  )
}