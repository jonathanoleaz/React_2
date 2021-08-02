import React from 'react';
import './search-box.styles.css';
/**
 * 
 * Functional components: they don't have access to state because they don't have access to constructor
 * nor lifecycle methods.
 * 
 * We don not set the state of the component in this component because of the dataflow, which must be in only one: from top to the bottom, 
 * in other words, because state needs to be known by the cardlist component. This is known as 'Lifting state up'.
 * 
 */
export const Searchbox = ( { placeholder, handleChange } ) => (
    <input 
        type='search' 
        placeholder= {placeholder}
        className="search" 
        onChange={ handleChange }/>
)