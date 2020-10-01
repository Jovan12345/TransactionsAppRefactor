import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showModal, makeNewTransaction, updateBalance, sortTransactions, filterSearchValue } from '../../actions';

import { FormValuesReducer, BalanceReducer } from '../typescriptInterfaces/TSInterfaces';

interface RootState{
    modalreducer: boolean,
    formvaluesreducer: FormValuesReducer,
    balancereducer: BalanceReducer
}

const TransactionModal: React.FC = () => {
    const dispatch = useDispatch();

    const modal = (state: RootState) => state.modalreducer;
    const modalreducer = useSelector(modal);
    const formvalue = (state: RootState) => state.formvaluesreducer;
    const formvaluesreducer = useSelector(formvalue);
    const balance = (state:RootState) => state.balancereducer;
    const balancereducer = useSelector(balance);

    const submitTransaction = () => {
        dispatch(sortTransactions(""));
        dispatch(filterSearchValue(""));
        dispatch(makeNewTransaction(formvaluesreducer));
        dispatch(showModal(false))

        //update total Balance
        const newBalance:number = balancereducer.totalAmount - formvaluesreducer.amount;
        dispatch(updateBalance(newBalance));

    };

    return (
        <>
            <Modal show={modalreducer} onHide={() => dispatch(showModal(false))}>
                <Modal.Header closeButton>
                    <Modal.Title>Transaction Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>To Account: <b>{formvaluesreducer.merchant}</b></p>
                    <p>Amount: <b>{formvaluesreducer.amount}</b></p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="closeBtn" onClick={() => dispatch(showModal(false))}>Close</button>
                    <button className="success" onClick={submitTransaction}>Transfer</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TransactionModal;