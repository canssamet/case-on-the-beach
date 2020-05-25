import { FETCH_DATA_START, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL } from '../../../store/types'

const initialState = {
	loader: false,
	listData: [],
	errorMessage: false
}

export default function reducer(state = initialState, { type, payload }) {
	switch (type) {
		case FETCH_DATA_START:
			return {
				...state,
				loader: payload
			}
		case FETCH_DATA_SUCCESS:
			return {
				...state,
				loader: false,
				listData: payload,
				errorMessage: false
			}
		case FETCH_DATA_FAIL:
			return {
				...state,
				loader: false,
				listData: [],
				errorMessage: payload
			}
		default:
			return {
				...state
			}
	}
}
