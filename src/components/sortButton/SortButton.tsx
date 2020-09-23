import React from 'react';

import './SortButton.scss';

interface Props{
    type: string,
    id: string,
    buttonSelected(field:string): () => string;
}

const SortButton: React.FC<Props> = ({ type, id, buttonSelected }) => {

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