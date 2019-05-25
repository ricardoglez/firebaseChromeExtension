import '../styles/styles.scss';
console.log('Content Script');



chrome.runtime.sendMessage( { contentScriptQuery: "fetchSheeps" }, ( response ) => {
  console.log( response );
  if( response.success ){
    console.log( 'Successfull!' );
  }
  else {
    console.error( 'Error!' );
  }
} );



