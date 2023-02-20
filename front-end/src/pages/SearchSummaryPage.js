import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';




function SearchSummaryPage({ props }) {
    const { state } = useLocation();
    console.log(state);

    // const location = useLocation();


  return (
    <div>{state}</div>
  )
}

export default SearchSummaryPage