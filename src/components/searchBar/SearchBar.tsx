import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../react-redux-hooks'
import { filterSearchValue } from '../../actions';

//@ts-ignore
import { DelayInput } from 'react-delay-input';

interface RootState {
    filereducer: string[]
}

const SearchBar: React.FC = () => {
    const file = (state: RootState) => state.filereducer;
    const filereducer = useSelector(file);
    const dispatch = useDispatch();

    return (
        <form className="searchbar" onSubmit={e => { e.preventDefault() }} autoComplete="off" data-test="search-bar">
            <DelayInput
                delayTimeout={300}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch(filterSearchValue(event.target.value, filereducer))}
                type="search"
                placeholder="Search transactions"
            />
        </form>
    );
};

export default SearchBar;