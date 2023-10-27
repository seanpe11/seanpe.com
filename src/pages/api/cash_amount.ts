import type { NextApiRequest, NextApiResponse } from "next";

interface SumReq extends NextApiRequest {
  body: {
    cash_debit: number
    cash_credit: number
  }
}

export default function handle(req: SumReq, res: NextApiResponse){
  
  const amount = req.body.cash_credit - req.body.cash_debit

  if (!(req.body.cash_credit && req.body.cash_debit)) {
    res.status(500).send({ "error": "bad request" })
  }

  res.status(200).send({ amount })
} 
