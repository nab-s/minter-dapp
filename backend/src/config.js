require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Bunnies Band";
const description = "A community driven project of 5000 randomly generated Bunnies living in the ecofriendly Polygon blockchain. Each NFT doubles as your Bunnies Band membership card, and grants access to the members only benefits, such as:  -Highly Bunnies PFP that can serve as your digital identity, and open digital doors for you. -Gaining membership access to the private  BB Discord. -Systematic whitelist spot on the upcoming project. -BB brand merchandise hoodies, Tshirts, caps ...and more";
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 780,
    layersOrder: [
      { name: "BACKGROUND" },
      { name: "BLUE CLOTHES" },
      { name: "HEAD" }, 
      { name: "FACE" },
      { name: "BLUE HAIR" },
      { name: "EAR" },
    ],
  },{
    growEditionSizeTo: 1560,
    layersOrder: [
      { name: "BACKGROUND" },
      { name: "BLACK CLOTHES" },
      { name: "HEAD" },     
      { name: "FACE" },
      { name: "BLACK HAIR" },
      { name: "EAR" },
    ],
  },{
    growEditionSizeTo: 2340,
    layersOrder: [
      { name: "BACKGROUND" },
      { name: "GREEN CLOTHES" },
      { name: "HEAD" }, 
      { name: "FACE" },
      { name: "GREEN HAIR" },
      { name: "EAR" },
    ],
  },{
    growEditionSizeTo: 3120,
    layersOrder: [
      { name: "BACKGROUND" },
      { name: "PINK CLOTHES" },
      { name: "HEAD" },
      { name: "FACE" },
      { name: "PINK HAIR" },
      { name: "EAR" },
    ],
  },{
    growEditionSizeTo: 3900,
    layersOrder: [
      { name: "BACKGROUND" },
      { name: "LAVENDER CLOTHES" },
      { name: "HEAD" }, 
      { name: "FACE" },
      { name: "LAVENDER HAIR" },
      { name: "EAR" },
    ],
  },{
    growEditionSizeTo: 4680,
    layersOrder: [
      { name: "BACKGROUND" },
      { name: "CLOTHES" },
      { name: "HEAD" },
      { name: "FACE" },
      { name: "HAIR" },
      { name: "EAR" },
    ],
  },{
    growEditionSizeTo: 4989,
    layersOrder: [
      { name: "BACKGROUND" },
      { name: "CLOTHES 2" }, 
      { name: "OPEN HEAD" },
      { name: "PUKE" },
    ],
  },{
    growEditionSizeTo: 4999,
    layersOrder: [
      { name: "BACKGROUND 2" },
      { name: "GOLDEN BODY" },
    ],
  },
];


const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 3000,
  height: 3000,
  smoothing: false,
};

const extraMetadata = {
  external_url: "https://bunniesband.xyz", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 2; // Your API key rate limit
const CHAIN = 'rinkeby'; // only rinkeby or polygon

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'bunnies band';
const CONTRACT_SYMBOL = 'BB';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0x4d7Ee28C53F2ad352ef36DD6D00e7B9A9314FD4d';
const TREASURY_ADDRESS = '0xFdebDE602F1d424D71300Ce420B306AD70926c75';
const MAX_SUPPLY = 5000; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 0.001; // Minting price per NFT. Rinkeby = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 10; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2022-06-01T11:30:48+00:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = "2022-05-26T11:30:48+00:00"; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 1000; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0xa14477efAA3301423241033E3197f165755c85C6"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = ['0x4d7Ee28C53F2ad352ef36DD6D00e7B9A9314FD4d']; // only update if you want to manually set the whitelisted addresses

// ** OPTIONAL **
let CONTRACT_ADDRESS = "0x47E3Bd7c3e27e10517090D667F07158D3CA3A548"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = CONTRACT_NAME; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "Bunnies Band is a completely autonomous community governed by its own rules and codes. would you be lucky enough to mint one of the Golden Bunnies that allow you to rise to the rank of band chief and enjoy the countless privileges that come with? only ten Golden BB available. good luck!."; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/bafybeibm5s2tnlh7ot2adexw4elf2ev237s6yayn5jajecum4vutil5j7m"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK" && contractData.error === null) {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "0xa14477efAA3301423241033E3197f165755c85C6",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
