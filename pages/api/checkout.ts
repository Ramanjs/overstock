import dbconnection from "@/dbconnection"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const dbconn = await dbconnection();
    try {
      let body = JSON.parse(req.body);
      let values: any[] = [];

      let query = "start transaction";
      let [results] = await dbconn.execute(query, values)

      query = "insert into orders (customer_id, order_id, amount) values (1, 101, ?)";
      values = [body.price];
      [results] = await dbconn.execute(query, values)

      query = "insert into order_shoe (order_id, shoe_id) values (101, ?)";
      values = [body.shoe_id];
      [results] = await dbconn.execute(query, values)

      query = "commit";
      values = [];
      [results] = await dbconn.execute(query, values)

      dbconn.end()
      res.status(200).json({ results })
    } catch (e: any) {
      console.log(e)
      res.status(500).json({ error: e.message })
    }
  }
}
