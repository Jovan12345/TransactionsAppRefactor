import transactions from '../../../transactions.json';

for (let i = 0; i < transactions.data.length; i += 1) {
    test(`Transaction[${i}] should have properties (amount, categoryCode, merchant, merchantLogo, transactionDate, transactionType)`, () => {
        expect(transactions.data[i]).toHaveProperty('amount');
        expect(transactions.data[i]).toHaveProperty('categoryCode');
        expect(transactions.data[i]).toHaveProperty('merchant');
        expect(transactions.data[i]).toHaveProperty('merchantLogo');
        expect(transactions.data[i]).toHaveProperty('transactionDate');
        expect(transactions.data[i]).toHaveProperty('transactionType');
    });
}