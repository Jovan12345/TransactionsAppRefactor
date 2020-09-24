import React, { useEffect } from 'react';
import SearchBar from '../searchBar/SearchBar';
import SortTransactions from '../sortTransactions/SortTransactions';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactions, getBalance } from '../../actions';
import briefcase from '../../utilities/briefcase.png';

interface FileReducer {
    amount: number,
    categoryCode: string,
    merchant: string,
    merchantLogo: string,
    transactionDate: string,
    transactionType: string
};

interface SearchReducer {
    transactions: {
        amount: number,
        categoryCode: string,
        merchant: string,
        mechantLogo: string,
        transactionDate: string,
        transactionType: string
    }
};

interface SortReducer {
    transactions: {
        amount: number,
        categoryCode: string,
        merchant: string,
        mechantLogo: string,
        transactionDate: string,
        transactionType: string
    }
};

interface RootState {
    sortReducer: SortReducer,
    searchreducer: SearchReducer,
    filereducer: FileReducer
};

const RecentTransactions = () => {
    const dispatch = useDispatch();

    const sort = (state: RootState) => state.sortReducer;
    const sortReducer = useSelector(sort);
    const search = (state: RootState) => state.searchreducer;
    const searchReducer = useSelector(search);
    const file = (state: RootState) => state.filereducer;
    const fileReducer = useSelector(file);

    useEffect(() => {
        dispatch(getTransactions())
        dispatch(getBalance())
    }, [dispatch])

    function renderTransactions(sortReducer: SortReducer, searchReducer: SearchReducer, fileReducer: FileReducer) {
        
        const renderTransactionsData: any = searchReducer.transactions ? searchReducer.transactions : (sortReducer.transactions ? sortReducer.transactions : (fileReducer ? fileReducer : []));
        if (renderTransactionsData.indexOf('error') !== -1){
            return <div><p className="loadingData">Error occured while loading data. Contact support at support@gecko.mk</p></div>
        } else if (renderTransactionsData.length !== 0) {
            return renderTransactionsData.map((tr: FileReducer, index: number) => {
                if (tr.amount) {
                    tr.transactionDate = new Date(tr.transactionDate).toDateString().slice(4, 10);
                    return (
                        <div key={index} className="transctionItems" style={{ borderLeft: `8px solid ${tr.categoryCode}` }}>
                            <p id="transactionDate">{tr.transactionDate}</p>
                            <img id="merchantLogo" src={tr.merchantLogo} alt="merchantLogo" />
                            <p id="merchant"><span id="merchantText">{tr.merchant}</span> <br /><span>{tr.transactionType}</span></p>
                            <p id="amount">-${tr.amount}</p>
                        </div>
                    )
                }
                return <div key={index}>Error while rendering data</div>;
            })
        } else if (searchReducer.transactions) {
            return <div><p className="noMatch">No search results were found</p></div>
        } else {
            return <div><p className="loadingData">Data is loading...</p></div>
        }
    }

    return (
        <>
            <img src={briefcase} alt="briefcase" className="briefcase"></img>
            <h5 className="componentTransactionsHeader">Recent Transactions</h5>
            <div className="recentTransactions">
                <header className="row">
                    <div className="col-lg-6">
                        <SearchBar />
                    </div>
                    <div className="col-lg-6">
                        <SortTransactions />
                    </div>
                </header>
                <div className="allTransactions">
                    {renderTransactions(sortReducer, searchReducer, fileReducer)}
                </div>
            </div>
        </>
    )
}

export default RecentTransactions;