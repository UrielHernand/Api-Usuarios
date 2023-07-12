const {initializeApp, cert} =  require("firebase-admin/app");
const serviceAccount =  require("../../utils/constants/firebase_service_account.json");

const app =  initializeApp({
    credential: cert(serviceAccount),
    databaseUrl:'https://dwi-2023.firebaseio.com'
});
module.exports= app;



