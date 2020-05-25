/* eslint-disable no-lone-blocks */
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./actions";
import "./styles.css";
import Api from '../../api'

function PerformancePage(props) {

  const dispatch = useDispatch();
  const states = useSelector(state => state.performancePageReducer);

  const getPerfDatas =  useCallback(async() => {
    const timing = getPerformanceTiming()
    const resource = getResourcePerform()
    const body = {
      ...timing,
      resource,
      createDate: new Date(),
    }
    console.log({body})
    const result = await Api.post('perf',body)
    console.log('axios post',result)
  },[])

  const fetchDataCallback = useCallback(async() => {
    await dispatch(fetchData())
    getPerfDatas()
  }, [dispatch, getPerfDatas])

  useEffect(() => {
    fetchDataCallback()
   }, [fetchDataCallback ])


  const getPerformanceTiming = () => {
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



  const getResourcePerform = () => {
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
      <h1>Count: {String(states.loader)}</h1>
      <button className='button' onClick={fetchDataCallback}>FETCH DATA</button>
    </main>
  );
};

export default PerformancePage