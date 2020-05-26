/* eslint-disable no-lone-blocks */
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPerfomanceData } from "./actions";
import "./styles.css";
import { LineChart } from './components'

function PerformancePage(props) {
  const [chartData, setChartData] = useState({
    ttfb: [{ x: 0, y: 0 }],
    fcp: [{ x: 0, y: 0 }],
    domContentLoad: [{ x: 0, y: 0 }],
    windowLoad: [{ x: 0, y: 0 }]
  });
  const dispatch = useDispatch();
  const states = useSelector(state => state.performancePageReducer);

  const perfObserver = new PerformanceObserver((list, observer) => { observer.disconnect() })
  perfObserver.observe({ entryTypes: ["paint", "mark"] });

  const postPerfData = useCallback(async (body) => {
    await dispatch(postPerfomanceData(body))
  }, [dispatch])

  useEffect(() => {
    setTimeout(() => {
      const timing = getPerfTiming()
      const resource = getResourcePerf()
      const body = {
        ...timing,
        resource,
        createDate: new Date(),
      }
      postPerfData(body)
    }, 200);
  }, [postPerfData])

  useEffect(() => {
    setChartData(states?.perfData?.reduce((acc, item, curIndex) => {
      acc.ttfb.push({ x: curIndex, y: item.ttfb });
      acc.fcp.push({ x: curIndex, y: item.fcp });
      acc.domContentLoad.push({ x: curIndex, y: item.domContentLoad });
      acc.windowLoad.push({ x: curIndex, y: item.windowLoad });
      return acc;
    }, {
      ttfb: [{ x: 0, y: 0 }],
      fcp: [{ x: 0, y: 0 }],
      domContentLoad: [{ x: 0, y: 0 }],
      windowLoad: [{ x: 0, y: 0 }]
    }))
  }, [states])

  const getPerfTiming = () => {

    if (window?.performance?.timing) {
      const time = window.performance.timing
      const ttfb = time.responseEnd - time.requestStart;
      const domContentLoad = time.domComplete - time.domLoading;
      const windowLoad = time.loadEventEnd - time.loadEventStart;
      let fcp = window.performance.getEntriesByName('first-contentful-paint')[0]

      const timing = {
        ttfb,
        domContentLoad,
        windowLoad,
        fcp: fcp && fcp !== [] ? fcp?.startTime : 0
      }
      return timing
    }
    return {}
  }

  const getResourcePerf = () => {
    if (window?.performance?.getEntriesByType) {
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
  }
  return (
    <main>
      <div className='outer'>
        <LineChart data={chartData.ttfb} title='TTFB' />
        <LineChart data={chartData.fcp} title='FCP' />
        <LineChart data={chartData.domContentLoad} title='DOM' />
        <LineChart data={chartData.windowLoad} title='WINDOW' />
      </div>
    </main>
  );
};

export default PerformancePage