import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortTransactions, sortButtonClicked } from '../../actions/index';

import SortButton from '../sortButton/SortButton';

import { FileReducer, SearchReducer } from '../typescriptInterfaces/TSInterfaces';

interface RootState {
    searchreducer: SearchReducer,
    filereducer: FileReducer
};

interface EventTextTarget extends EventTarget{
    name:string
};

interface EventObject extends React.MouseEvent<HTMLDivElement>{
    target: EventTextTarget
};

const SortTransactions: React.FC = () => {
    const dispatch = useDispatch();

    const search = (state: RootState) => state.searchreducer;
    const searchReducer = useSelector(search);
    const file = (state: RootState) => state.filereducer;
    const fileReducer = useSelector(file);

    const buttonHandler = (event: EventObject, searchreducer: SearchReducer, filereducer: FileReducer) => {
        const renderTransactionsData: any  = searchreducer.transactions !== undefined ? searchreducer.transactions : (filereducer ? filereducer : null);
        const choosedBtn = event.target.name;
        let sortedTransactionsData;

        if (choosedBtn) {
            dispatch(sortButtonClicked(choosedBtn));
            switch (choosedBtn) {
                case 'DescendingDate':
                    sortedTransactionsData = renderTransactionsData.sort((a:FileReducer, b:FileReducer) => b.transactionDate.localeCompare(a.transactionDate));
                    break;
                case 'AscendingDate':
                    sortedTransactionsData = renderTransactionsData.sort((a:FileReducer, b:FileReducer) => a.transactionDate.localeCompare(b.transactionDate));
                    break;
                case 'DescendingBeneficiary':
                    sortedTransactionsData = renderTransactionsData.sort((a:FileReducer, b:FileReducer) => b.merchant.localeCompare(a.merchant));
                    break;
                case 'AscendingBeneficiary':
                    sortedTransactionsData = renderTransactionsData.sort((a:FileReducer, b:FileReducer) => a.merchant.localeCompare(b.merchant));
                    break;
                case 'DescendingAmount':
                    sortedTransactionsData = renderTransactionsData.sort((a:FileReducer, b:FileReducer) => b.amount - a.amount);
                    break;
                case 'AscendingAmount':
                    sortedTransactionsData = renderTransactionsData.sort((a:FileReducer, b:FileReducer) => a.amount - b.amount);
                    break;
                default:
                    return null;
            }
            dispatch(sortTransactions(sortedTransactionsData))
        }
    }

    return (
        <div className="sortButtons" onClick={(e: EventObject) => buttonHandler(e, searchReducer, fileReducer)}>
            <p className="sortButton">Sort by: </p>
            <SortButton type='Date' id='1' />
            <SortButton type='Beneficiary' id='2' />
            <SortButton type='Amount' id='3' />
        </div>
    )
}

export default SortTransactions;