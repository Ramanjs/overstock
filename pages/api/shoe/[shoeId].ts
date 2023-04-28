import dbconnection from "@/dbconnection"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'GET') {
    const dbconn = await dbconnection();
    try {
      const { shoeId } = req.query;
      const query = "SELECT * from shoe where shoe_id = ?"
      const values = [shoeId]
      const [results] = await dbconn.execute(query, values)
      dbconn.end()
      res.status(200).json({ results })
    } catch (e: any) {
      res.status(500).json({ error: e.message })
    }
  }

  if (req.method === 'POST') {
    const dbconn = await dbconnection();
    try {
      let body = JSON.parse(req.body);
      let values: any[] = [];

      let query = "start transaction";
      let [results] = await dbconn.execute(query, values)

      query = "SELECT * FROM shoe where shoe_id = ?";
      values = [body.shoe_id];
      [results] = await dbconn.execute(query, values)

      query = "UPDATE shoe SET quantity = ? WHERE shoe_id = ?";
      values = [body.quantity, body.shoe_id];
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
