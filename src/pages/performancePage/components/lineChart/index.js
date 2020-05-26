import React, { useEffect, useState } from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  LineSeries
} from 'react-vis';
import '../../../../../node_modules/react-vis/dist/style.css';
import './style.css'

function LineChart({ data = [],title='' }) {
  const [dimension, setDimension] = useState({ width: 300, height: 300 })

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener("resize", () => { });
    return () => {
      window.removeEventListener("resize", () => { });
    }
  }, [])

  const updateWindowDimensions = () => {
    setDimension({ width: window.innerWidth * 0.4, height: window.innerHeight * 0.4 });
  }

  return <div className='inner'>
      <h1>{title}</h1>
      <XYPlot height={dimension.height} width={dimension.width}>
        <XAxis />
        <YAxis />
        <LineSeries data={data} />
      </XYPlot>
    </div>
 }

export default LineChart