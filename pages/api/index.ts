import Moralis from 'moralis';
import *as dotenv from 'dotenv';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import type { NextApiRequest, NextApiResponse } from 'next'

dotenv.config()
export default async function runApp(
  req: NextApiRequest,
  res: NextApiResponse
){
  await Moralis.start({
    apiKey: process.env.MORALIS_KEY,
  });
  
  const address = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";

  const chain = EvmChain.ETHEREUM;

  const response = await Moralis.EvmApi.token.getTokenPrice({
    address,
    chain,
  });

  return res.status(200).json(response);


  console.log(response.toJSON());
};
