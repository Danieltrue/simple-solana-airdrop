const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

// How to create a wallet in Solana
const wallet = new Keypair();

const publicKey = new PublicKey(wallet._keypair.publicKey);
const priateKey = wallet._keypair.privateKey;

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const balance = await connection.getBalance(publicKey);

    console.log("Wallet is SOL " + balance);
  } catch (err) {
    console.log(err);
  }
};

const airDropSOL = async () => {
  try {
    const bits = 2;
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const airdropFromSignature = await connection.requestAirdrop(
      publicKey,
      bits * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(airdropFromSignature);
  } catch (error) {
    console.log(error);
  }
};

(async function () {
  await airDropSOL();
  await getWalletBalance();
})();
