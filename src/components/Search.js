import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';

const Search = ({showSearch=f=>f}) => { 
  let search
  const submit = (e) => {
    showSearch(search.value)
  }
  
  return (
    <div className="searchBox">
      <input type="text" ref={input => search = input} />
      <Button bsStyle="primary" onClick={submit}>Search</Button>
    </div>
  )
  
}

export default Search