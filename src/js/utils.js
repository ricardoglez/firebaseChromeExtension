import firestore from './firestore';

const utils = {
  fetchSheeps: () => {
    return new Promise( (resolve, reject) => {
      let sheeps = [];
      console.log('Fetch Sheeps');
      console.log(firestore.collection('borregos' ));
      firestore.collection('borregos')
      .onSnapshot( (snapshot) => {
        console.log('snapshot', snapshot);
        snapshot.forEach( doc => {
          console.log(doc.data);
          console.log(doc.id);
          let sheep = {  
            id: doc.id,
            borrego: doc.data().borrego,
            connected: doc.data().connected,
            borregoId: doc.data().borregoId,
            created: doc.data().created,
            fingerprint: doc.data().fingerprint,
          }
          sheeps = [...sheeps, sheep];
        } );
        let responseObj = { success: true, data:sheeps }
        resolve( responseObj );
      } );
    } );
  }
}

export default utils;