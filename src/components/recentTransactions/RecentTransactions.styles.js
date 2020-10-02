import styled from 'styled-components';

export const TransactionItems = styled.div`
    display: grid;
    grid-template-columns: 67px 67px 1fr 95px;
    margin: 0 10px;
    border: 1px solid grey;
    border-left: 8px solid ${props => props.inputColor} ;
    margin-bottom: -1px;
    align-items: center;
    padding: 5px 0 5px 10px;

    & > p{
        margin: 0;
    }

    #merchantLogo {
        width: 45px;
    }

    #merchantText {
        font-weight: bold;
    }

    #amount {
        font-size: larger;
        font-weight: bolder;
    }

    @media (max-width: 440px) {
        grid-template-columns: 50px 50px 1fr 70px;
        padding-left: 3px;
        #transactionDate, #merchantText, #transactionType{
            font-size: 14px;
        }

        #amount {
            font-size: 16px;
        }

        #merchantLogo {
            width: 40px;
        }

    }
`;

export const IssueOccured = styled.div`
    padding: 10px 15px;
    color: red;
`;

export const DataLoading = styled.div`
    padding: 10px 15px;
`;

export const RecentTrnsactionsHeader = styled.h5`
    background-color: #0c8397;
    color: white;
    margin-bottom: 0;
    padding: 14px;
    text-align: center;
    font-weight: 100;
`;

export const Briefcase = styled.img`
    float: left;
    padding: 14px 0 0 14px;
`;

export const RecentTransactionsComponent = styled.div`
    background-color: white;
`;

export const Header = styled.header`
    padding: 20px 15px;
    @media (max-width: 991px) {
        padding-bottom: 0;
    }
`;

export const AllTransactions = styled.div`
    padding-bottom: 10px;
`;