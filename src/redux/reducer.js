import { GET_FIRST_DATA, ADD_CITY, DELETE_CITY, UPDATE_CITY } from './actions';

const initialState = []


export const citysReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CITY: {
            const item = action.payload
            return [...state, item]
        }
        case DELETE_CITY: {
            const id = action.payload
            return [...state.filter(el => el.data.id !== id)]
        }
        case GET_FIRST_DATA:
            return {
                data: action.payload.data,
            }
        case UPDATE_CITY: {
            const id = action.payload.id
            const data = action.payload.data
            return [...state.filter(el => el.id !== id), data]
        }
        default:
            return state;
    }
}