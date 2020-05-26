import { PERFORMANCE_DATA_START, PERFORMANCE_DATA_SUCCESS, PERFORMANCE_DATA_FAIL } from '../../../store/types'
import Api from '../../../api'

export const getPerformanceDataStart = payload => {
	return {
		type: PERFORMANCE_DATA_START,
		payload
	}
}

export const getPerformanceDataSuccess = payload => {
	return {
		type: PERFORMANCE_DATA_SUCCESS,
		payload
	}
}

export const getPerformanceDataFail = payload => {
	return {
		type: PERFORMANCE_DATA_FAIL,
		payload
	}
}

export const getPerformanceData = () => {
	return async dispatch => {
		try {
			dispatch(getPerformanceDataStart(true))
			const { data, status } = await Api.get(`perf`)
			console.warn(data)
			if (data && status === 200) {
				dispatch(getPerformanceDataSuccess(data))
				return
			}
			dispatch(getPerformanceDataFail({ status }))
		} catch (error) {
			console.log(error)
			dispatch(getPerformanceDataFail(error))
		}
	}
}

export const postPerfomanceData = (body) => {
	return async dispatch => {
		try {
			dispatch(getPerformanceDataStart(true))
			const { data, status } = await Api.post(`perf`,body)
			if (data && status === 200) {
				dispatch(getPerformanceDataSuccess(data))
				return
			}
			dispatch(getPerformanceDataFail({ status }))
		} catch (error) {
			console.log(error)
			dispatch(getPerformanceDataFail(error))
		}
	}
}

