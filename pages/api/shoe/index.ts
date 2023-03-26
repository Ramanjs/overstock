import dbconnection from "@/dbconnection"
import { query } from "@/query"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const dbconn = await dbconnection();
  try {
    const querry = "SELECT * from shoe where category_id = ?"
    const [results] = await dbconn.execute(query, [])
    dbconn.end()
    res.status(200).json({ results })
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}
