/* Doc: https://cdnjs.com/libraries/crypto-js 
   Doc: https://cryptojs.gitbook.io/docs/
---------------------------------------------------------------------------------*/
var frontend = "frontend";


var encrypted = CryptoJS.AES.encrypt(frontend, "Secret Passphrase");
var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");

console.log(" : " + encrypted.toString(CryptoJS.enc.Utf8));
console.log(" : " + decrypted.toString(CryptoJS.enc.Utf8));