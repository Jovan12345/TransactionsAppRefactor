import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { showModal, stageFormValues } from '../../actions';

import arrows from '../../utilities/arrows.png';
import TransactionModal from '../transactionModal/TransactionModal.tsx';

class MakeTransfer extends React.Component {
    renderError({ error, submitFailed }) {
        if (submitFailed) {
            return (
                <>
                    {error}
                </>
            );
        }
    }

    renderInput = ({ input, label, meta, placeholder, disabled }) => {
        return (
            <div className="transactionFields">
                <label> {label}</label>
                <>
                    <input {...input} autoComplete="off" placeholder={placeholder} disabled={disabled} />
                    <p className="errorMessage">{this.renderError(meta)}</p>
                </>
            </div>
        );
    }

    onSubmit = (formValues) => {
        const recordExists = this.props.filereducer.map(x => x.merchant.indexOf(formValues.merchant)).filter(x => x!== -1);
        const categoryCode = recordExists.length !== 0 ? this.props.filereducer[recordExists[0]].categoryCode : "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);
        formValues.categoryCode = categoryCode;

        this.props.showModal(true);
        this.props.stageFormValues(formValues);
    }

    render() {
        const balance = this.props.balancereducer.totalAmount ? this.props.balancereducer.totalAmount : '';
        return (
            <>
                <img src={arrows} alt="arrowsIcon" className="arrowsIcon"></img>
                <h5 className="componentTransferHeader">Make a transfer</h5>
                <form className="makeTransferForm px-2 py-3" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="fromAmount" component={this.renderInput} label="FROM ACCOUNT" placeholder={`Free Checking $${balance}`} disabled="disabled" />
                    <Field name="merchant" component={this.renderInput} required label="TO ACCOUNT" placeholder='Georgia Power Electric Company' />
                    <Field name="amount" type="number" component={this.renderInput} label="AMOUNT" placeholder='$ 0.00' />
                    <button className="submitButton" type="submit">Submit</button>
                </form>
                <TransactionModal />
            </>
        )
    }
}

// Validate users input in form
const validate = formValues => {
    const errors = {};
    //TO ACCOUNT input field
    if (!formValues.merchant) {
        errors.merchant = 'Please enter a value';
    }

    //AMOUNT input field
    if (!formValues.amount) {
        errors.amount = 'Please enter amount';
    } else if (isNaN(formValues.amount)) {
        errors.amount = 'Please enter valid value for amount';
    } else if (formValues.amount < 0 || formValues.amount > 500) {
        errors.amount = "Amount per transaction must be between $0 and $500";
    }
    return errors;
}

const mapStateToProps = state => {
    return {
        filereducer: state.filereducer,
        balancereducer: state.balancereducer
    }
}

export default connect(mapStateToProps, { showModal, stageFormValues })(reduxForm({
    form: 'makeAmountTransfer',
    validate
})(MakeTransfer));