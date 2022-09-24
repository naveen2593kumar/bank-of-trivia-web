import firebaseAdmin from "firebase-admin";
import serviceAccountKey from "./key.json";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccountKey),
  });
}
export const firestore = firebaseAdmin.firestore();
export default firebaseAdmin;
console.log("firebaseAdmin Configured");
