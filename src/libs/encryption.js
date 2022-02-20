const CryptoJS = require("crypto-js");

const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

function encryptByAES(word, parsedKey) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, parsedKey, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
  return encrypted.ciphertext.toString().toUpperCase();
}

function decryptByAES(base64Str, parsedKey) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(base64Str);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, parsedKey, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
  return decrypt.toString(CryptoJS.enc.Utf8);
}


/**
 * 生成随机数据
 * @param len
 * @returns {string}
 */
function randomKey(len) {
  let result = '';
  for (var i = 0; i < len; i++) {
    let num = Math.floor(Math.random() * 16);
    result += num.toString(16)
  }
  return result;
}

export default {
  encryptByAES: encryptByAES,
  decryptByAES: decryptByAES,
  randomKey: randomKey
}

