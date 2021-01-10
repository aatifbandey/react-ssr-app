import React from "react";

import { useDispatch, useSelector } from 'react-redux';

import { useInjectSaga } from '../../saga/injectSaga';

import homeSaga from './saga';
import View from "./components";

const Home = (props) => {
	
  useInjectSaga({ key: 'homeSaga', saga: homeSaga });
  const dispatch = useDispatch();
	
  const reducerState = useSelector((state)=> state.homeReducer);
	
  return  (
    reducerState ? <View {...props} state={reducerState}  dispatch={dispatch} /> : <div></div>
  );
  
}

export default Home;

