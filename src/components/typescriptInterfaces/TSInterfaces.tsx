export interface FileReducer {
    amount: number,
    categoryCode: string,
    merchant: string,
    merchantLogo: string,
    transactionDate: string,
    transactionType: string
};

export interface SearchReducer {
    transactions: {
        amount: number,
        categoryCode: string,
        merchant: string,
        mechantLogo: string,
        transactionDate: string,
        transactionType: string
    }
};

export interface SortReducer {
    transactions: {
        amount: number,
        categoryCode: string,
        merchant: string,
        mechantLogo: string,
        transactionDate: string,
        transactionType: string
    }
};

export interface FormValuesReducer{
    merchant: string,
    amount: number,
    categoryCode: string
}

export interface BalanceReducer{
    totalAmount: number
}