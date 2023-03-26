import dbconnection from "@/dbconnection"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const dbconn = await dbconnection();
  try {
    const query = "select shoe_seller.seller_id as seller_id, order_shoe.shoe_id as shoe_id, category.name, sum(amount) as sales from orders natural join order_shoe natural join shoe_seller natural join category group by seller_id, shoe_id, category.name"
    const [results] = await dbconn.execute(query, [])
    dbconn.end()
    res.status(200).json({ results })
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}
