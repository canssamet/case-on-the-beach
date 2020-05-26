/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "./actions";
import "./styles.css";
import { LineChart } from './components'

function PerformancePage(props) {
  const [chartData, setChartData] = useState({
    ttfb: [{ x: 0, y: 0 }],
    fcp: [{ x: 0, y: 0 }],
    domLoad: [{ x: 0, y: 0 }],
    windowLoad: [{ x: 0, y: 0 }]
  });
  const dispatch = useDispatch();
  const states = useSelector(state => state.performancePageReducer);

  useEffect(() => {
    const timing = getPerfTiming()
    const resource = getResourcePerf()
    const body = {
      ...timing,
      resource,
      createDate: new Date(),
    }
    dispatch(postData(body))
  }, [dispatch])

  useEffect(() => {
    setChartData(states?.perfData?.reduce((acc, item, curIndex) => {
      acc.ttfb.push({ x: curIndex, y: item.ttfb });
      acc.fcp.push({ x: curIndex, y: item.fcp });
      acc.domLoad.push({ x: curIndex, y: item.domLoad });
      acc.windowLoad.push({ x: curIndex, y: item.windowLoad });
      return acc;
    }, {
      ttfb: [{ x: 0, y: 0 }],
      fcp: [{ x: 0, y: 0 }],
      domLoad: [{ x: 0, y: 0 }],
      windowLoad: [{ x: 0, y: 0 }]
    }))
  }, [states])

  const getPerfTiming = () => {
    const time = window.performance.timing
    const ttfb = time.responseStart - time.requestStart;
    const domContentLoad = time.domContentLoadedEventEnd - time.domContentLoadedEventStart;
    const windowLoad = time.loadEventEnd - time.loadEventStart;
    let fcp = window.performance.getEntries().filter(val => val.name === 'first-contentful-paint')[0]

    const timing = {
      ttfb,
      domContentLoad,
      windowLoad,
      fcp: fcp && fcp !== [] ? fcp?.startTime : 0
    }
    return timing
  }

  const getResourcePerf = () => {
    const resources = window.performance.getEntriesByType('resource');
    const resource = resources.map((val) => {
      const data = {
        name: val.name,
        requestStart: val.requestStart,
        responseEnd: val.responseEnd,
      }
      return data
    })
    return resource
  }
  return (
    <main>
      <div className='outer'>
        <LineChart data={chartData.ttfb} title='TTFB' />
        <LineChart data={chartData.fcp} title='FCP' />
        <LineChart data={chartData.domLoad} title='DOM' />
        <LineChart data={chartData.windowLoad} title='WINDOW' />
      </div>
    </main>
  );
};

export default PerformancePage