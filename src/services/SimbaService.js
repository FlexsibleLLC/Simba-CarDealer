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

async function getCars() {
    const simba = await getSimbaInstance();
    const transaction = await simba.getMethodTransactions('car', {});
    const transactionFilePromises = transaction.data().map(record => simba.getFileFromBundleForTransaction(record.id, 0, false));
    const carImages = await Promise.all(transactionFilePromises);
    const carBlobImages = carImages.map(carImage => URL.createObjectURL(carImage));
    const cars = transaction.data().map((record, index) => ({ ...record.payload.inputs, transactionId: record.id, imageUrl: carBlobImages[index] }));
    return cars;
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

        const car = {
            ...transaction.payload.inputs,
            transactionId: transaction.id,
            imageUrl: imageBlob
        };

        return car;

    } catch(e) {
        console.log("Error saving car info: ", e);
    }
    
}

const SimbaService = {
    getCars,
    saveCar
};

export default SimbaService;