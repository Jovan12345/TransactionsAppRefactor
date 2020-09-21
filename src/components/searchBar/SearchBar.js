import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterSearchValue } from '../../actions';
import {DelayInput} from 'react-delay-input';

const SearchBar = () => {
    const filereducer = useSelector(state => state.filereducer);
    const dispatch = useDispatch();

    return (
        <form className="searchbar" onSubmit={e => { e.preventDefault() }} autoComplete="off">
            <DelayInput delayTimeout={300} onChange={event => dispatch(filterSearchValue(event.target.value, filereducer))} type="search" placeholder="Search transactions"/>
        </form>
    );
};

export default SearchBar;