import dbconnection from "@/dbconnection"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const dbconn = await dbconnection();
  try {
    const query = "select shoe_seller.seller_id as seller_id, order_shoe.shoe_id as shoe_id, sum(case when year(orders.datetime) = 2022 then orders.amount else 0 end) as '2022', sum(case when year(orders.datetime) = 2023 then orders.amount else 0 end) as '2023' from orders natural join order_shoe natural join shoe_seller group by seller_id, shoe_id"
    const [results] = await dbconn.execute(query, [])
    dbconn.end()
    res.status(200).json({ results })
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}
