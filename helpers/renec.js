"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenecHelper = void 0;
const web3_js_1 = require("@solana/web3.js");
const configs_1 = require("../configs");
const crypto_1 = require("./crypto");
const spl_token_1 = require("@solana/spl-token");
const common_1 = require("../common");
class RenecHelper {
    static getConnection() {
        return new web3_js_1.Connection(configs_1.Env.RENEC_CONNECTION, 'confirmed');
    }
    static getShopKeypair() {
        return crypto_1.CryptoHelper.generateKeypairFromSecretKey(configs_1.Env.SHOP_SECRET_KEY);
    }
    static getDailyBonusKeypair() {
        return crypto_1.CryptoHelper.generateKeypairFromSecretKey(configs_1.Env.DAILY_BONUS_SECRET_KEY);
    }
    static getFenixKeypair() {
        return crypto_1.CryptoHelper.generateKeypairFromSecretKey(configs_1.Env.FENIX_SECRET_KEY);
    }
    static getReceivedRenecOnlyPublicKey() {
        return new web3_js_1.PublicKey(configs_1.Env.FENIX_PUBLIC_KEY);
    }
    static async createAccount(secretPhrase, accountIndex) {
        const fromKeypair = this.getFenixKeypair();
        const newKeypair = crypto_1.CryptoHelper.generateKeypairFromSecretPhrase(secretPhrase, accountIndex);
        const createAccountParams = {
            fromPubkey: fromKeypair.publicKey,
            newAccountPubkey: newKeypair.publicKey,
            programId: spl_token_1.TOKEN_PROGRAM_ID,
            lamports: 0,
            space: 0,
        };
        const createAccountTransaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.createAccount(createAccountParams));
        const connection = this.getConnection();
        const transactionId = await (0, web3_js_1.sendAndConfirmTransaction)(connection, createAccountTransaction, [fromKeypair, newKeypair]);
        return {
            transactionId,
            address: newKeypair.publicKey.toString(),
        };
    }
    static async getTokenAccount(address, tokenInfo) {
        const tokenAccount = {
            code: tokenInfo.code,
            name: tokenInfo.name,
            mint: tokenInfo.mint,
            amount: 0,
        };
        try {
            const connection = this.getConnection();
            const owner = new web3_js_1.PublicKey(address);
            const mint = new web3_js_1.PublicKey(tokenInfo.mint);
            const payer = this.getFenixKeypair();
            const token = new spl_token_1.Token(connection, mint, spl_token_1.TOKEN_PROGRAM_ID, payer);
            const account = await token.getOrCreateAssociatedAccountInfo(owner);
            tokenAccount.amount = Number(account.amount) / web3_js_1.LAMPORTS_PER_SOL;
            return tokenAccount;
        }
        catch (err) {
            common_1.Logger.error(err);
            return tokenAccount;
        }
    }
    static async getBalance(address) {
        const connection = this.getConnection();
        const owner = new web3_js_1.PublicKey(address);
        const balance = await connection.getBalance(owner);
        const amount = Number(balance) / web3_js_1.LAMPORTS_PER_SOL;
        return { amount };
    }
    static async transferToken(fromKeypair, toPubkey, mint, amount) {
        const connection = this.getConnection();
        const mintPubKey = new web3_js_1.PublicKey(mint);
        const token = new spl_token_1.Token(connection, mintPubKey, spl_token_1.TOKEN_PROGRAM_ID, fromKeypair);
        const fromTokenAccount = await token.getOrCreateAssociatedAccountInfo(fromKeypair.publicKey);
        const toTokenAccount = await token.getOrCreateAssociatedAccountInfo(toPubkey);
        return await token.transfer(fromTokenAccount.address, toTokenAccount.address, fromKeypair.publicKey, [fromKeypair], amount * web3_js_1.LAMPORTS_PER_SOL);
    }
    static async transferRenec(fromKeypair, toPubkey, amount) {
        const connection = this.getConnection();
        const transferTransaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
            fromPubkey: fromKeypair.publicKey,
            toPubkey: toPubkey,
            lamports: amount * web3_js_1.LAMPORTS_PER_SOL,
        }));
        return await (0, web3_js_1.sendAndConfirmTransaction)(connection, transferTransaction, [fromKeypair]);
    }
}
exports.RenecHelper = RenecHelper;
