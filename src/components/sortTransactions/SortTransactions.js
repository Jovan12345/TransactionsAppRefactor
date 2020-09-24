import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortTransactions, sortButtonClicked } from '../../actions/index';

import SortButton from '../sortButton/SortButton';

const SortTransactions = () => {
    const dispatch = useDispatch();

    const searchReducer = useSelector(state => state.searchreducer);
    const fileReducer = useSelector(state => state.filereducer);

    const buttonHandler = (event, searchreducer, filereducer) => {
        const renderTransactionsData = searchreducer.transactions !== undefined ? searchreducer.transactions : (filereducer ? filereducer : null);
        const choosedBtn = event.target.name;
        let sortedTransactionsData;

        if (choosedBtn) {
            dispatch(sortButtonClicked(choosedBtn));
            switch (choosedBtn) {
                case 'DescendingDate':
                    sortedTransactionsData = renderTransactionsData.sort((a, b) => b.transactionDate.localeCompare(a.transactionDate));
                    break;
                case 'AscendingDate':
                    sortedTransactionsData = renderTransactionsData.sort((a, b) => a.transactionDate.localeCompare(b.transactionDate));
                    break;
                case 'DescendingBeneficiary':
                    sortedTransactionsData = renderTransactionsData.sort((a, b) => b.merchant.localeCompare(a.merchant));
                    break;
                case 'AscendingBeneficiary':
                    sortedTransactionsData = renderTransactionsData.sort((a, b) => a.merchant.localeCompare(b.merchant));
                    break;
                case 'DescendingAmount':
                    sortedTransactionsData = renderTransactionsData.sort((a, b) => b.amount - a.amount);
                    break;
                case 'AscendingAmount':
                    sortedTransactionsData = renderTransactionsData.sort((a, b) => a.amount - b.amount);
                    break;
                default:
                    return null;
            }
            dispatch(sortTransactions(sortedTransactionsData))
        }
    }

    return (
        <div className="sortButtons" onClick={e => buttonHandler(e, searchReducer, fileReducer)}>
            <p className="sortButton">Sort by: </p>
            <SortButton type='Date' id='1' />
            <SortButton type='Beneficiary' id='2' />
            <SortButton type='Amount' id='3' />
        </div>
    )
}

export default SortTransactions