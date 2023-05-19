import { NextApiRequest, NextApiResponse } from "next";

import getQuote from "~/utils/notion-quote"

export default async function handle(req: NextApiResponse, res: NextApiResponse){
  try {
    const quote = await getQuote()
    res.status(200).send({quote})
  } catch (error) {
    res.status(500).send({error})
  }
} 
