import * as db from "@/lib/db/dbFunctions";
import nc from "next-connect";
import verifyAdmin from "@/lib/middlewares/verifyAdmin";
import auths from "@/lib/middlewares/auths";

const handler = nc();

handler
  .use(...auths)
  .get(async (req, res) => {
    try {
      const cars = await db.getAllCars();
      res.status(200).json({ success: true, data: cars });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  })
  .post(verifyAdmin, async (req, res) => {
    try {
      const car = await db.createCar(req.body);
      res.status(200).json({ success: true, data: car });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });
export default handler;
