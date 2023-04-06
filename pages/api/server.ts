import Moralis from 'moralis';
import { EvmChain, EvmAddressish } from '@moralisweb3/common-evm-utils';
import type { NextApiRequest, NextApiResponse } from 'next'
 

Moralis.start({
    apiKey: process.env.MORALIS_KEY,
  });
export default async function runApp(
  req: NextApiRequest,
  res: NextApiResponse
){
  const {query} = req;

  const address1= query.addressOne;

  const address2 = query.addressTwo;

  const chain = EvmChain.ETHEREUM;

  const responseOne = await Moralis.EvmApi.token.getTokenPrice({
    address: address1 as EvmAddressish,
    chain,
  })

  const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
    address: address2 as EvmAddressish,
    chain
  })

  const usdPrices ={
    tokenOne: responseOne.raw.usdPrice,
    tokenTwo: responseTwo.raw.usdPrice,
    ratio: responseOne.raw.usdPrice/responseTwo.raw.usdPrice,
  }

  console.log(responseOne.toJSON());
  console.log(responseTwo.toJSON());

  return res.status(200).json(usdPrices);
};
