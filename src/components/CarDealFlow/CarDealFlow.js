import React, { useState, useEffect } from 'react';
import './CarDealFlow.css';
import { Button } from 'react-bootstrap';
import SimbaService from '../../services/SimbaService';
import AddReportForm from './AddReportForm';
import AddSaleForm from './AddSaleForm';

const { saveReport, getReport, getSale, saveSale } = SimbaService;

export default function CarDealFlow(props) {

    const [reportTransaction, setReportTransaction] = useState(null);
    const [saleTransaction, setSaleTransaction] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);
    const [addingReport, setAddingReport] = useState(false);
    const [addingSale, setAddingSale] = useState(false);

    const { carTransaction } = props;
    const { dealer, time, _bundleHash, __car } = carTransaction.payload.inputs;

    useEffect(() => {
        const loadCarProgress = async () => {
            try {
                const reportTransaction = await getReport(__car);
                setReportTransaction(reportTransaction);
                if (reportTransaction) {
                    const saleTransaction = await getSale(__car);
                    setSaleTransaction(saleTransaction);
                }
            } catch (e) {
                console.error("Error loading data.", e);
            } finally {
                setDataLoading(false);
            }
        };
        loadCarProgress();
    }, [__car]);

    const onReportSubmit = async reportPayload => {
        reportPayload.__car = __car;
        reportPayload.time = Date.now();
        const reportTransaction = await saveReport(reportPayload);
        setReportTransaction(reportTransaction);
        setAddingReport(false);
    };

    const onSaleSubmit = async salePayload => {
        salePayload.__car = __car;
        salePayload.time = Date.now();
        const saleTransaction = await saveSale(salePayload);
        setSaleTransaction(saleTransaction);
        setAddingSale(false);
    };

    const getReportComponent = () => {

        if (addingReport) {
            return <AddReportForm onSubmit={onReportSubmit} />
        }

        if (!reportTransaction && dataLoading) {
            return null;
        }

        if (!reportTransaction) {
            return getAddReportButton();
        }

        const { inspector, time, condition } = reportTransaction.payload.inputs;
        const { transaction_hash: transactionHash } = reportTransaction;

        return (
            <div>
                <hr />
                <h2>Report</h2>
                <br />
                <p>Inspected by {inspector} on {new Date(Number(time)).toDateString()}</p>
                <p>Condition: {condition}</p>
                <p>Transaction Hash: {transactionHash}</p>

            </div>
        );

    };

    const getSaleComponent = () => {

        if (addingSale) {
            return <AddSaleForm onSubmit={onSaleSubmit} />
        }

        if (!saleTransaction && dataLoading) {
            return null;
        }

        if (!saleTransaction) {
            return getAddSellButton();
        }

        const { buyer, price, time, } = saleTransaction.payload.inputs;
        const { transaction_hash: transactionHash } = saleTransaction;

        return (
            <div>
                <hr />
                <h2>Sale</h2>
                <br />
                <p>Sold to {buyer} on {new Date(Number(time)).toDateString()}</p>
                <p>Price: {price}</p>
                <p>Transaction Hash: {transactionHash}</p>
            </div>
        );

    };

    const onAddReportClick = () => {
        setAddingReport(true);
    };

    const onSaleClick = () => {
        setAddingSale(true);
    };

    const getAddReportButton = () => {
        if (!reportTransaction) {
            return (
                <div className="d-flex justify-content-end">
                    <Button variant="primary" onClick={onAddReportClick}>ADD REPORT</Button>
                </div>
            );
        }
        return null;
    };

    const getAddSellButton = () => {
        if (reportTransaction && !saleTransaction) {
            return (
                <div className="d-flex justify-content-end">
                    <Button variant="primary" onClick={onSaleClick}>SALE</Button>
                </div>
            );
        }
        return null;
    };

    const getProgressMessage = () => {
        if (dataLoading) {
            return (
                <div>
                    <hr />
                    <span className="text-primary">Checking Data...</span>
                </div>
            );
        }

        if (reportTransaction && saleTransaction) {
            return (
                <div>
                    <hr />
                    <p className="text-success">This transaction is complete, no further action can be taken</p>
                </div>
            );
        }

    };

    return (
        <div>
            <div>
                <p>Registered by: {dealer} on {new Date(Number(time)).toDateString()}</p>
                <br />
                <p>Transaction Hash:</p>
                <p className="hash">{carTransaction.transaction_hash}</p>
                <p>IPFS Hash: <span className="hash">{_bundleHash}</span></p>
            </div>
            { getReportComponent()}
            { getSaleComponent()}
            { getProgressMessage()}
        </div>
    );
}