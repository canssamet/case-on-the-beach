import { PERFORMANCE_DATA_START, PERFORMANCE_DATA_SUCCESS, PERFORMANCE_DATA_FAIL } from '../../../store/types'

const initialState = {
	loader: false,
	perfData: [],
	errorMessage: false
}

export default function reducer(state = initialState, { type, payload }) {
	switch (type) {
		case PERFORMANCE_DATA_START:
			return {
				...state,
				loader: payload
			}
		case PERFORMANCE_DATA_SUCCESS:
			return {
				...state,
				loader: false,
				perfData: payload,
				errorMessage: false
			}
		case PERFORMANCE_DATA_FAIL:
			return {
				...state,
				loader: false,
				perfData: [],
				errorMessage: payload
			}
		default:
			return {
				...state
			}
	}
}
