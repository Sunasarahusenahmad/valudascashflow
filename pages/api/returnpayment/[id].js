// api/category/[id].js

import conn from "../dbconfig/conn";

export default async function handler(req, res) {
  const { id } = req.query; // Get the dynamic ID from the URL parameter

  if (req.method === "GET") {
    try {
      const q =
        "SELECT *, DATE_FORMAT(date, '%d-%m-%Y') as date  FROM cf_main_payment_return WHERE m_id = ? order by id desc";
      const [rows] = await conn.query(q, [id]);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({
        error: 1,
        msg: "Refund Payment Cannot Fetch... Check Connection",
      });
    } finally {
      conn.releaseConnection();
    }
  }

  if (req.method == "DELETE") {
    try {
      const { id } = req.query;
      // Query the database
      const q = "DELETE FROM cf_main_payment_return WHERE id = ?";

      const [rows] = await conn.query(q, [id]);

      // Process the data and send the response
      res.status(200).json(rows);
    } catch (error) {
      if (error.toString().includes("Cannot delete or update a parent row")) {
        res.status(500).json({
          error: 1,
          msg: "Refund Payment Not Deleted... Already Use In Any Payment",
        });
      } else {
        res.status(500).json({
          error: 1,
          msg: "Refund Payment Cannot Delete... Check Connection",
        });
      }
    } finally {
      conn.releaseConnection();
    }
  }

  if (req.method == "PATCH") {
    const {
      amount,
      returnby,
      widhrawername,
      mobileno,
      date,
      note,
      mid,
      cid,
      username,
    } = req.body;

    try {
      // Query the database
      const q =
        "UPDATE `cf_main_payment_return` SET `amount`= ?, `return_by`= ?, `returned_user`= ?, `date`= ?, `withdrawer_name`= ?, `mobile_no`= ?, `note`= ?, `m_id`= ?, `c_id`= ?  WHERE id = ?";

      const data = [
        amount,
        returnby,
        username,
        date,
        widhrawername,
        mobileno,
        note,
        mid,
        cid,
        id,
      ];
      const [rows] = await conn.query(q, data);

      // Process the data and send the response
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({
        error: 1,
        msg: "Refund Payment Cannot Update... Check Connection",
      });
    } finally {
      conn.releaseConnection();
    }
  }
}
