import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function runApp(
  req: NextApiRequest,
  res: NextApiResponse
){
  await Moralis.start({
    apiKey: process.env.MORALIS_KEY,
  });
  
  const {query} = req;

  const chain = EvmChain.ETHEREUM;

  const responseOne = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressOne,
    chain,
  })

  const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressTwo,
    chain
  })

  console.log(responseOne.toJSON());
  console.log(responseTwo.toJSON());

  return res.status(200).json({});
};
