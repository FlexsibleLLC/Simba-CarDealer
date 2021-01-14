import React, { useState, useEffect } from 'react';
import './CarDealFlow.css';
import { Button } from 'react-bootstrap';
import SimbaService from '../../services/SimbaService';

const { saveReport, getReport, getSale } = SimbaService;

export default function CarDealFlow(props) {

    const [reportTransaction, setReportTransaction] = useState(null);
    const [saleTransaction, setSaleTransaction] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);

    const { carTransaction } = props;
    const { dealer, time, _bundleHash, __car } = carTransaction.payload.inputs;
    
    useEffect(async () => {
        try {
            const reportTransaction = await getReport(__car);
            if(reportTransaction) {
                const saleTransaction = await getSale(__car);
                setSaleTransaction(saleTransaction);
            }
            setReportTransaction(reportTransaction);
        } catch(e) {
            console.log("Error loading car deal history", e);
        } finally {
            setDataLoading(false);
        }
    }, []);

    const getReportComponent = () => {

        if(!reportTransaction) {
            return null;
        }

        const { inspector, time, condition } = reportTransaction.payload.inputs;
        const { transaction_hash: transactionHash } = reportTransaction;

        return (
            <div>
                <hr/>
                <h2>Report</h2>
                <br/>
                <p>Inspected by {inspector} on {new Date(Number(time)).toDateString()}</p>
                <p>Condition: {condition}</p>
                <p>Transaction Hash: {transactionHash}</p>
            </div>
        );

    };

    const getSaleComponent = () => {

        if(!saleTransaction) {
            return null;
        }

        const { buyer, price , time, } = saleTransaction.payload.inputs;
        const { transaction_hash: transactionHash } = saleTransaction;

        return (
            <div>
                <hr/>
                <h2>Sale</h2>
                <br/>
                <p>Sold to {buyer} on {new Date(Number(time)).toDateString()}</p>
                <p>Price: {price}</p>
                <p>Transaction Hash: {transactionHash}</p>
            </div>
        );

    };

    const onAddReportClick = () => {

    };

    const getAddReportButton = () => {
        if(!reportTransaction) {
            return <Button variant="primary" onClick={onAddReportClick}>ADD REPORT</Button>;
        }
        return null;
    };

    const getAddSellButton = () => {
        if(reportTransaction && !saleTransaction) {
            return <Button variant="primary" onClick={onAddReportClick}>SALE</Button>;
        }
        return null;
    };

    return (
        <div>
            <div>
                <p>Registered by: {dealer} on {new Date(Number(time)).toDateString()}</p>
                <br/>
                <p>Transaction Hash:</p>
                <p className="hash">{carTransaction.transaction_hash}</p>
                <p>IPFS Hash: <span className="hash">{_bundleHash}</span></p>

                {

                }
                <div>
                    {
                        dataLoading ? <span className="text-primary">Checking Data...</span> : getAddReportButton()
                    }
                </div>
                <div>
                    {
                        dataLoading ? <span className="text-primary">Checking Data...</span> : getAddSellButton()
                    }
                </div>
            </div>
            
            { reportTransaction && getReportComponent() }

            { saleTransaction && getSaleComponent() }

            {
                reportTransaction && saleTransaction && (
                    <p className="text-success">This transaction is complete, no further action can be taken</p>
                )
            }

        </div>
        

    );
}