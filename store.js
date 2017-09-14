import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const exampleInitialState = {
  pages: 0,
  dataList: []
}

export const actionTypes = {
  SAVE_ALLDATA: 'SAVE_ALLDATA',
  GET_ALL_PAGES: 'GET_ALL_PAGES'
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_PAGES:
      return Object.assign({}, state, { pages: action.pages })
    case actionTypes.SAVE_ALLDATA:
      return Object.assign({}, state, { dataList: state.dataList.concat(action.data) })
    default: return state
  }
}

// ACTIONS

export const getAllData = (data) => dispatch => {
  return dispatch({ type: actionTypes.SAVE_ALLDATA, data: data })
}

export const getPageTotle = (page) => dispatch => {
  return dispatch({ type: actionTypes.GET_ALL_PAGES, pages: page })
}

export const initStore = (initialState = exampleInitialState) => {
  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
}