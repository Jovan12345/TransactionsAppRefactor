import React, { useEffect } from 'react';
import SearchBar from '../searchBar/SearchBar';
import SortTransactions from '../sortTransactions/SortTransactions';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactions, getBalance } from '../../actions';
import briefcase from '../../utilities/briefcase.png';

const RecentTransactions = () => {
    const dispatch = useDispatch();

    const sortReducer = useSelector(state => state.sortReducer);
    const searchReducer = useSelector(state => state.searchreducer);
    const fileReducer = useSelector(state => state.filereducer);

    useEffect(() => {
        dispatch(getTransactions())
        dispatch(getBalance())
    }, [dispatch])

    function renderTransactions(sortReducer, searchReducer, fileReducer) {
        
        const renderTransactionsData = searchReducer.transactions ? searchReducer.transactions : (sortReducer.transactions ? sortReducer.transactions : (fileReducer ? fileReducer : []));

        if (renderTransactionsData.indexOf('error') !== -1){
            return <div><p className="loadingData">Error occured while loading data. Contact support at support@gecko.mk</p></div>
        } else if (renderTransactionsData.length !== 0) {
            return renderTransactionsData.map((tr, index) => {
                if (!tr.totalAmount) {
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
                return <div>Error</div>;
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