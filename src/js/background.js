import '../styles/styles.scss';
import  utils  from "../js/utils";
console.log('Background');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('Message', request, sender, sendResponse );
    if (request.contentScriptQuery == "fetchSheeps") {
      console.log('Fetching from background');
       utils.fetchSheeps( )
      .then( response => {
        console.log( response );
        sendResponse( response );
      })
      .catch(error => {
        console.error( error );
        sendResponse( error );
      });
    }
    return true
  });



