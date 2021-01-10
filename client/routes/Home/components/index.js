import React, { useState, useEffect } from "react";
import { func, shape } from "prop-types";
import { debounce } from "lodash";
import { getGitData, getDataFromStore } from "../actions";

import ResultContainer from "./ResultContainer";
import { parent, elementsParent } from "./styles";
import Heading from "./Heading";

const View = (props) => {
  const { dispatch, state } = props;
  const [ loading, updateLoading] = useState(false);
  const [search, updateSearch] = useState('');
  const [type, selectType] = useState('user');

	
  const apiCall = state.apiCall;

  let results;
  if(loading ) {
    results = state.data ? state.data[`${state.search}_${state.type}`] : []
  } else {
    results = state.data ? state.data[`${search}_${type}`] : []
  }
	
  useEffect(()=>{
    // Show loading effect
    setTimeout(()=>{
      updateLoading(false);
    }, 500);
		
  },[state.data])
	
	
  const performSearch = (e) => {
    console.log("Hello");
    let searchVal = e.target.value;
    searchVal= searchVal.trim();
    if(searchVal.length >= 3) {
			
      if(state.data && state.data[`${searchVal}_${type}`]) {
        dispatch(getDataFromStore({
          search: searchVal,
          type
        }));
      } else {
        dispatch(getGitData({
          search: searchVal,
          type,
        }));
        if(searchVal) {
          updateLoading(true);
        }
      }
			
    } else {
      dispatch(getDataFromStore({
        search:"",
        type
      }));	
    }
	
    updateSearch(searchVal);
		

  }
  const getData = debounce(performSearch, 500);

  const onChange = (e) => {
    console.log("kk")
    if(search && search.length >=3) {
      if(state.data && state.data[`${search}_${e.target.value}`]) {
        dispatch(getDataFromStore({
          search,
          type: e.target.value
        }));
      } else {
        dispatch(getGitData({
          search,
          type: e.target.value
        }))
        updateLoading(true);
      }
    }
    selectType(e.target.value);
  }
  return(
    <div className={parent}>

      <Heading />
      
      	<div className={elementsParent}>
        <input type="text" placeHolder={"Start typing to search"} onChange={getData} data-testid="seach-bar" />
        <select onChange={onChange} >
          <option selected={type === 'user'} value="user">Users</option>
          <option selected={type === 'repo'} value={"repo"}>Repositories</option>
        </select>
      	</div>
		
      { results  ? <ResultContainer results={results} type={type} apiCall={apiCall} loading={loading}/> : ""}
				
		
    </div>
  )
};

View.propTypes={
  dispatch: func.isRequired,
  state: shape({}).isRequired
};

export default View;