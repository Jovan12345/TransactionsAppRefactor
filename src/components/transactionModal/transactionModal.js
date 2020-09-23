import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showModal, makeNewTransaction, updateBalance, sortTransactions, filterSearchValue } from '../../actions';

const TransactionModal = () => {
    const dispatch = useDispatch();

    const modalreducer = useSelector(state => state.modalreducer);
    const formvaluesreducer = useSelector(state => state.formvaluesreducer);
    const balancereducer = useSelector(state => state.balancereducer);

    const submitTransaction = () => {
        dispatch(sortTransactions(""));
        dispatch(filterSearchValue(""));
        dispatch(makeNewTransaction(formvaluesreducer));
        dispatch(showModal(false))

        //update total Balance
        const newBalance = balancereducer.totalAmount - formvaluesreducer.amount;
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