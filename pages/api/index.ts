const Moralis = require('moralis').default;
const cors = require('cors');
require('dotenv').config();
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function tokenPrice(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {query}= req;

  const responseOne = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressOne
  })

  const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressTwo
  })

  const  usdPrices = {
    tokenOne: responseOne.raw.usdPrice,
    tokenTwo: responseTwo.raw.usdPrice,
    ratio: responseOne.raw.usdPrice/responseTwo.raw.usdPrice
  }
  
  return res.status(200).json(usdPrices);
};

Moralis.start({
  apiKey: process.env.Moralis_KEY,
})
