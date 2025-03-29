import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Transaction from "./Transaction";
import history from '../history';

const POLL_INTERVAL_MS = 10000;

class TransactionPool extends Component {
    state = { transactionPoolMap: {} };

    fetchTransactionPoolMap = () => {
        fetch(`${document.location.origin}/api/transaction-pool-map`)
            .then(response => response.json())
            .then(json => this.setState({ transactionPoolMap: json }))
            .catch(error => console.error(error))
    }

    fetchMineTransactions = () => {
        fetch(`${document.location.origin}/api/mine-transactions`)
            .then(response => {
                if(response.status === 200) {
                    alert('success');
                    history.push('/blocks');
                } else {
                    alert('The mine-transactions block request did not complete')
                }
            })
    }

    componentDidMount() {
        this.fetchTransactionPoolMap();

        this.fetchPoolMapInterval = setInterval(
            () => this.fetchTransactionPoolMap(),
            POLL_INTERVAL_MS
        );
    }

    componentWillUnmount() {
        clearInterval(this.fetchPoolMapInterval);
    }

    // helper method 
    hasTransactions = () => {
        return Object.keys(this.state.transactionPoolMap).length > 0;
    }

    render() {
        return (
            <div className='TransactionPool'>
                <div><Link to='/'>Home</Link></div>
                <h3>Transaction Pool</h3>
                {
                    Object.values(this.state.transactionPoolMap).map(transaction => {
                        return(
                            <div key={transaction.id}>
                                <hr />
                                <Transaction transaction={transaction} />
                            </div>
                        )
                    })
                }
                <hr />
                <Button
                    bsStyle='primary'
                    onClick={this.fetchMineTransactions}
                    disabled={!this.hasTransactions()}
                    title={!this.hasTransactions() ? "No transactions to mine" : "Mine transactions"}
                >
                    {this.hasTransactions() ? "Mine the transactions" : "No transactions to mine" }
                </Button>
            </div>
        )
    }
}

export default TransactionPool;

