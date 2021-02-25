import db from '../firebase.config';
import { delivers } from './delivers';

const migrate = async () => {
  delivers.map((item) => saveDeliver(item));
};

const saveDeliver = async (data) => {
  const newDeliverRef = db.collection('delivers').doc();

  await newDeliverRef
    .set(data)
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

export default migrate;
