import React, { useEffect } from 'react';
import SearchBar from '../searchBar/SearchBar';
import SortTransactions from '../sortTransactions/SortTransactions';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactions, getBalance } from '../../actions';
import briefcase from '../../utilities/briefcase.png';
import { Spinner } from 'react-bootstrap';

import { FileReducer, SearchReducer, SortReducer } from '../typescriptInterfaces/TSInterfaces';

import { TransactionItems, IssueOccured, RecentTrnsactionsHeader, Briefcase, RecentTransactionsComponent, Header, AllTransactions } from './RecentTransactions.styles';

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
        if (renderTransactionsData.indexOf('error') !== -1) {
            return <IssueOccured>Error occured while loading data. Contact support at support@gecko.mk</IssueOccured>
        } else if (renderTransactionsData.length !== 0) {
            return renderTransactionsData.map((tr: FileReducer, index: number) => {
                if (tr.amount) {
                    tr.transactionDate = new Date(tr.transactionDate).toDateString().slice(4, 10);
                    return (
                        <TransactionItems key={index} inputColor={tr.categoryCode}>
                            <p>{tr.transactionDate}</p>
                            <img id="merchantLogo" src={tr.merchantLogo} alt="merchantLogo" />
                            <p id="merchant"><span id="merchantText">{tr.merchant}</span> <br /><span>{tr.transactionType}</span></p>
                            <p id="amount">-${tr.amount}</p>
                        </TransactionItems>
                    )
                }
                return <IssueOccured key={index}>Error while rendering data</IssueOccured>;
            })
        } else if (searchReducer.transactions) {
            return <IssueOccured>No search results were found</IssueOccured>
        } else {
            return <><Spinner animation="border" size="sm"/> <span>Data is loading...</span></>
        }
    }

    return (
        <>
            <Briefcase src={briefcase} alt="briefcase"></Briefcase>
            <RecentTrnsactionsHeader>Recent Transactions</RecentTrnsactionsHeader>
            <RecentTransactionsComponent>
                <Header className="row">
                    <div className="col-lg-5">
                        <SearchBar />
                    </div>
                    <div className="col-lg-7">
                        <SortTransactions />
                    </div>
                </Header>
                <AllTransactions>
                    {renderTransactions(sortReducer, searchReducer, fileReducer)}
                </AllTransactions>
            </RecentTransactionsComponent>
        </>
    )
}

export default RecentTransactions;