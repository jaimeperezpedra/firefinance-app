import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyAIZGbehgE3Zj_88GmoKEXqsGYyqYMTGuY',
  authDomain: 'finance-1d797.firebaseapp.com',
  databaseURL: 'https://finance-1d797-default-rtdb.firebaseio.com/',
  projectId: 'finance-1d797'
};

const firebase = initializeApp(firebaseConfig);

export { firebase };
