import React from 'react';
import { useSelector } from 'react-redux'

import './SortButton.scss';

interface Props {
    type: string,
    id: string
}

interface RootState {
    sortButtonReducer: string
}

const SortButton: React.FC<Props> = ({ type, id }) => {

    const sortButtonSlected:string = useSelector<RootState, string>((state: RootState) => state.sortButtonReducer);

    const buttonSelected = (field: string) => {
        const selectedButton = sortButtonSlected.indexOf(field) === -1 ? "" : "chooseSort";
        return selectedButton;
    }

    return (
        <div className={`dropdown${id}`}>
            <p className="dropbtn" data-selecedbtn={buttonSelected(`${type}`)}>{type.toUpperCase()}</p>
            <div className="dropdown-content">
                <input type="button" name={`Ascending${type}`} value="Ascending" data-selecedbtn={buttonSelected(`Ascending${type}`)} />
                <input type="button" name={`Descending${type}`} value="Descending" data-selecedbtn={buttonSelected(`Descending${type}`)} />
            </div>
        </div>
    );
}

export default SortButton;