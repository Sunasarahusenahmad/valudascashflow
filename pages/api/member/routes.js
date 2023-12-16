import conn from "../dbconfig/conn";

export default async function handler(req, res) {
  if (req.method == "POST") {
    let currentDate = new Date().toJSON().slice(0, 10);
    const {
      fname,
      mname,
      lname,
      nickname,
      mobileNo,
      altMobileNo,
      email,
      address,
      aadharNo,
      backAcNo,
      ifsc,
      username,
    } = req.body;
    try {
      // Query the database
      const q =
        "INSERT INTO `cf_member_master`(`fname`, `mname`, `lname`, `nickname`, `address`, `mobile_no`, `alt_mobile_no`, `email`, `aadhar_card`, `bank_ac`, `ifsc`, `add_by`, `date`, `update_by`, `update_date`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const data = [
        fname,
        mname,
        lname,
        nickname,
        address,
        mobileNo,
        altMobileNo,
        email,
        aadharNo,
        backAcNo,
        ifsc,
        username,
        currentDate,
        null,
        null,
      ];
      const [rows] = await conn.query(q, data);

      // Process the data and send the response
      res.status(200).json(rows);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: 1, msg: "Member Cannot Add... Check Connection" });
    } finally {
      conn.releaseConnection();
    }
  }

  if (req.method == "GET") {
    try {
      // Query the database
      const q = "SELECT * FROM cf_member_master";

      const [rows] = await conn.query(q);

      // Process the data and send the response
      res.status(200).json(rows);
    } catch (error) {
      res
        .status(500)
        .json({ error: 1, msg: "Member Cannot Fetch... Check Connection" });
    } finally {
      conn.releaseConnection();
    }
  }
}
