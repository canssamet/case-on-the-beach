import { FETCH_DATA_START, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL } from '../../../store/types'
import Api from '../../../api'

export const fetchDataStart = payload => {
	return {
		type: FETCH_DATA_START,
		payload
	}
}

export const fetchDataSuccess = payload => {
	return {
		type: FETCH_DATA_SUCCESS,
		payload
	}
}

export const fetchDataFail = payload => {
	return {
		type: FETCH_DATA_FAIL,
		payload
	}
}

export const fetchData = () => {
	return async dispatch => {
		try {
			dispatch(fetchDataStart(true))
			const { data, status } = await Api.get(`perf`)
			console.warn(data)
			if (data && status === 200) {
				dispatch(fetchDataSuccess(data))
				return
			}
			dispatch(fetchDataFail({ status }))
		} catch (error) {
			console.log(error)
			dispatch(fetchDataFail(error))
		}
	}
}

export const postData = (body) => {
	return async dispatch => {
		try {
			dispatch(fetchDataStart(true))
			const { data, status } = await Api.post(`perf`,body)
			if (data && status === 200) {
				dispatch(fetchDataSuccess(data))
				return
			}
			dispatch(fetchDataFail({ status }))
		} catch (error) {
			console.log(error)
			dispatch(fetchDataFail(error))
		}
	}
}

