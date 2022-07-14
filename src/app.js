const express = require("express");
const app = express();
const router = express.Router();

app.use(express.json());

const { getMenu } = require("./ubereats");
router.post("/ubereats", async (req, res, next) => {
  try {
    const { url } = req.body;
    let menu = await getMenu(url);
    res.status(200).json(menu);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.use((req, res) => {
  res.status(404).json({ msg: "route doesn't exist" });
});

app.use(router);

module.exports = app;
