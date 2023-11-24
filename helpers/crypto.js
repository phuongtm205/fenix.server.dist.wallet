"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoHelper = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bip39_1 = require("bip39");
const bs58_1 = __importDefault(require("bs58"));
const web3_js_1 = require("@solana/web3.js");
const ed25519_hd_key_1 = require("ed25519-hd-key");
const configs_1 = require("../configs");
const hash_1 = require("./hash");
const constants_1 = require("../constants");
class CryptoHelper {
    static toBase64(text) {
        return Buffer.from(text).toString('base64');
    }
    static toText(base64) {
        return Buffer.from(base64, 'base64').toString('utf-8');
    }
    static encrypt(text) {
        try {
            const hash = hash_1.HashHelper.sha256(text);
            const key = Buffer.from(hash_1.HashHelper.md5(configs_1.Env.ENCRYPTION_KEY));
            const iv = Buffer.from(configs_1.Env.ENCRYPTION_IV, 'hex');
            const cipher = crypto_1.default.createCipheriv(constants_1.CRYPTO.Algorithm, key, iv);
            let encryptedBuffer = cipher.update(text);
            encryptedBuffer = Buffer.concat([encryptedBuffer, cipher.final()]);
            const encryptedString = encryptedBuffer.toString('hex');
            return this.toBase64(`${hash}${constants_1.CRYPTO.Delimiter}${encryptedString}`);
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    static decrypt(text) {
        try {
            const parts = this.toText(text).split(constants_1.CRYPTO.Delimiter);
            if (parts.length != 2)
                return null;
            const key = Buffer.from(hash_1.HashHelper.md5(configs_1.Env.ENCRYPTION_KEY));
            const iv = Buffer.from(configs_1.Env.ENCRYPTION_IV, 'hex');
            const hash = parts[0];
            const encrypted = Buffer.from(parts[1], 'hex');
            const decipher = crypto_1.default.createDecipheriv(constants_1.CRYPTO.Algorithm, key, iv);
            const decryptedBuffer = decipher.update(encrypted);
            const decryptedString = Buffer.concat([decryptedBuffer, decipher.final()]).toString();
            return hash_1.HashHelper.sha256(decryptedString) === hash ? decryptedString : null;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    static generateKeypairFromEncryptedSecretPhrase(encryptedSecretPhrase, accountIndex) {
        const secretPhrase = this.decrypt(encryptedSecretPhrase);
        return this.generateKeypairFromSecretPhrase(secretPhrase, accountIndex);
    }
    static generateKeypairFromSecretPhrase(secretPhrase, accountIndex) {
        if (!secretPhrase || (!accountIndex && accountIndex != 0))
            return;
        const seed = (0, bip39_1.mnemonicToSeedSync)(secretPhrase, "");
        const path = `m/44'/501'/${accountIndex}'/0'`;
        return web3_js_1.Keypair.fromSeed((0, ed25519_hd_key_1.derivePath)(path, seed.toString("hex")).key);
    }
    static generateKeypairFromSecretKey(privateKey) {
        if (!privateKey)
            return;
        return web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(privateKey));
    }
    static generateSecretPhrase() {
        const secretPhrase = (0, bip39_1.generateMnemonic)();
        const encryptedSecretPhrase = this.encrypt(secretPhrase);
        return { secretPhrase, encryptedSecretPhrase };
    }
}
exports.CryptoHelper = CryptoHelper;
