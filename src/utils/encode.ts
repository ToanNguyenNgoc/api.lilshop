import * as base64 from 'base-64'
import * as utf8 from 'utf8'
import * as aesjs from 'aes-js'

export function encode(text: string) {
  const bytes = utf8.encode(text);
  const code = base64.encode(bytes);
  return code
}
export function decode(code: string) {
  const types = base64.decode(code)
  const text = utf8.decode(types)
  return text
}
export function aesEncode(text: string) {
  const key = process.env.AES_JS_KEY?.split(',')?.map(i => parseInt(i)) || []
  const textBytes = aesjs.utils.utf8.toBytes(text);
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  const encryptedBytes = aesCtr.encrypt(textBytes);
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex
}
export function aesDecode(code: string) {
  const key = process.env.AES_JS_KEY?.split(',')?.map(i => parseInt(i)) || []
  const encryptedBytes = aesjs.utils.hex.toBytes(code);
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);
  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  return decryptedText
}