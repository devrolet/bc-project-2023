class TransactionPool {
    constructor() {
        this.transactionMap = {}
    }

    setTransaction(transaction) {
        this.transactionMap[transaction.id] = transaction;
    }

    existingTransaction({ inputAddress }) {
        const transacions = Object.values(this.transactionMap);
        
        return transacions.find(transacion => transacion.input.address === inputAddress);
    }
}

module.exports = TransactionPool;