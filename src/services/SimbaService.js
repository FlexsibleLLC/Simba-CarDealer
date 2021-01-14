import * as libsimba from '@simbachain/libsimba-js'
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const url = process.env.REACT_APP_CAR_DEALER_SIMBA_API_URL;
const apiKey = process.env.REACT_APP_CAR_DEALER_SIMBA_API_KEY;
const from = process.env.REACT_APP_CAR_DEALER_SIMBA_FROM;

function simbaSetup() {
    let simba = null;
    
    return async () => {
        
        if(simba) {
            return simba;
        }

        simba = await libsimba.getSimbaInstance(url, null, apiKey);

        return simba;
    };
}

const getSimbaInstance = simbaSetup();

async function getCarsTransactions() {
    const simba = await getSimbaInstance();
    const simbaTransactionResponse = await simba.getMethodTransactions('car', {});
    const transactionFilePromises = simbaTransactionResponse.data().map(record => simba.getFileFromBundleForTransaction(record.id, 0, false));
    const carImages = await Promise.all(transactionFilePromises);
    const carBlobImages = carImages.map(carImage => URL.createObjectURL(carImage));

    const carsTransactions = simbaTransactionResponse.data();

    carsTransactions.map((transaction, index) => {
        transaction.payload.inputs.imageUrl = carBlobImages[index];
    });
    
    return carsTransactions;
}

async function saveCar(payload) {

    const simba = await getSimbaInstance();

    const { dealer, manufacturer, model, vin } = payload;

    const formData = new FormData();
    formData.append('dealer', dealer);
    formData.append('make', manufacturer);
    formData.append('model', model);
    formData.append('vin', vin);
    formData.append('__car', uuid());
    formData.append('time', Date.now());
    formData.append('file[0]', payload.imageFile);
    formData.append('from', from);

    const postCarUrl = `${url}/car/`;

    try {
        const response = await axios.post(postCarUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                APIKEY: apiKey
            }
        });

        const transaction = response.data;

        const carImage = await simba.getFileFromBundleForTransaction(transaction.id, 0, false);
        const imageBlob = URL.createObjectURL(carImage);

        transaction.payload.inputs.imageUrl = imageBlob;

        return transaction;

    } catch(e) {
        console.log("Error saving car info: ", e);
    }
    
}

async function saveReport(payload) {

    const { time, __car, condition, inspector } = payload;

    const postReportUrl = `${url}/report/`;

    const requestPayload = { time, __car, condition, inspector, from };

    try {
        const response = await axios.post(postReportUrl, requestPayload);

        const transaction = response.data;

        return transaction;

    } catch(e) {
        console.log("Error saving report info: ", e);
    }
    
}

async function getReport(__car) {
    const getReportUrl = `${url}/report/?${__car}`;

    try {
        const response = await axios.get(getReportUrl, {
            headers: {
                'Content-Type': 'multipart/form-data',
                APIKEY: apiKey
            }
        });

        const transaction = response.data;

        return transaction.results[0];

    } catch(e) {
        console.log("Error saving report info: ", e);
    }
    
}

async function saveSale(payload) {

    const { time, __car, buyer, price } = payload;

    const postSaleUrl = `${url}/sale/`;

    const requestPayload = { time, __car, buyer, price, from };

    try {
        const response = await axios.post(postSaleUrl, requestPayload);

        const transaction = response.data;

        return transaction;

    } catch(e) {
        console.log("Error saving report info: ", e);
    }
    
}

async function getSale(__car) {
    const getSaleUrl = `${url}/sale/?${__car}`;

    try {
        const response = await axios.get(getSaleUrl, {
            headers: {
                'Content-Type': 'multipart/form-data',
                APIKEY: apiKey
            }
        });

        const transaction = response.data;

        return transaction.results[0];

    } catch(e) {
        console.log("Error saving sale info: ", e);
    }
    
}

const SimbaService = {
    getCarsTransactions,
    saveCar,
    saveReport,
    getReport,
    saveSale,
    getSale
};

export default SimbaService;