import * as libsimba from '@simbachain/libsimba-js'
import { v4 as uuid } from 'uuid';

const url = process.env.REACT_APP_CAR_DEALER_SIMBA_API_URL;
const apiKey = process.env.REACT_APP_CAR_DEALER_SIMBA_API_KEY;
const walletPass = process.env.REACT_APP_CAR_DEALER_SIMBA_WALLET_PASS;

const wallet = new libsimba.LocalWallet();

function simbaSetup() {
    let simba = null;
    
    return async () => {
        
        if(simba) {
            return simba;
        }

        simba = await libsimba.getSimbaInstance(url, null, apiKey);

        if (wallet.walletExists()) {
            await wallet.unlockWallet(walletPass);
          } else {
            await wallet.generateWallet(walletPass);
          }
          simba.setWallet(wallet);

        //   console.log("simba balance", await simba.getBalance());
        //   console.log("simba addFunds", await simba.addFunds());
        //   console.log("simba balance2", await simba.getBalance());

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
    const params = { dealer, make: manufacturer, model, vin };
    const saveCarSimbaResponse = await simba.callMethodWithFile('car', {...params, __car: uuid(), time: Date.now()}, [payload.imageFile]);
    console.log("saveCarSimbaResponse: ", saveCarSimbaResponse);
}

const SimbaService = {
    getCars,
    saveCar
};

export default SimbaService;