import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterSearchValue } from '../../actions';

const SearchBar = () => {
    const [searchValue, setsearchValue] = useState('')
    const filereducer = useSelector(state => state.filereducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const timeOutId = setTimeout(() => searchValueFucntion(searchValue, filereducer), 300);
        return () => clearTimeout(timeOutId);
    }, [searchValue]);

    const searchValueFucntion = (event, transactions) => {
        dispatch(filterSearchValue(event, transactions))
    };

    return (
        <form className="searchbar" onSubmit={e => { e.preventDefault() }} autoComplete="off">
            <input value={searchValue} type='search' placeholder="Search transactions" onChange={event => setsearchValue(event.target.value)} />
        </form>
    );
};

export default SearchBar;