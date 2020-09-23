import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import MakeTransfer from './makeTransactions/MakeTransfer';
import RecentTransactions from './recentTransactions/RecentTransactions';
import Header from '../components/header/Header';

const App: React.FC = () => {
    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-4 makeTransferComponent">
                        <MakeTransfer />
                    </div>
                    <div className="col-md-8 recentTransferComponent">
                        <RecentTransactions />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;