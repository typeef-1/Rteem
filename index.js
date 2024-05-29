let express = require(`express`);
let app = express();
let port = 3005;

app.listen(port, function () {
  console.log(`http://localhost:${port}`);
});

// Настройка CORS
let cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" }));

// Настройка POST-запроса — JSON
app.use(express.json());

// Настройка БД
let mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Rteem");
let gameSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    platphorms: String,
    description: String,
    rate: String,
    age: String,
    year: String,
    trailer: String,
    comms: Array,
  },
  {
    timestamps: true,
  }
);
let game = {
  _id: {
    $oid: "665499186b1308d111266bd2",
  },
  title: "Hogwarts Legacy",
  image:
    "https://cybersport.metaratings.ru/storage/images/b7/71/b77110b676485088275a437e27b42068.png",
  platphorms: "ПК, PS, Xbox, Switch",
  description:
    "Hogwarts Legacy (или «Хогвартс: Наследие») — большой ролевой экшен по вселенной «Гарри Поттера». Его события разворачиваются в конце XIX века и рассказывают о восстании гоблинов во главе с Ранроком и тёмным магом Виктором Руквудом. Вместе они попытаются завладеть артефактом, который ставит под угрозу существование всего волшебного сообщества.",
  rate: 85,
  age: "17",
  year: "2023",
  trailer: "https://www.youtube.com/embed/1O6Qstncpnc?si=QFH8XTWoGeInZ08J",
  comms: [], 
  __v: 26,
  updatedAt: {
    $date: "2024-05-28T15:56:21.164Z",
  },
};
let Game = mongoose.model("game", gameSchema);
app.get(`/games`, async function (req, res) {
  let data = await Game.find();
  res.send(data);
});

app.post(`/game`, async function (req, res) {
  let id = req.body.id;
  let data = await Game.findOne({ _id: id });
  game = data;
  console.log(game);
  res.send(201);
});

app.get("/lgame", async function (req, res) {
  res.send(game);
});

app.put("/comm", async function (req, res) {
  let newcomm = req.body;
  console.log(game);
  let data = await Game.findOne({ _id: game._id });
  game.comms.push(newcomm);
  data.comms.push(newcomm);
  await data.save();
  res.send(201);
});

app.delete("/del", async function (req, res) {
  let a = req.body;
  console.log(a);
  let data = await Game.findOne({ _id: game._id });
  data.comms.splice(a, 1);
  await data.save();
  game = data;
  console.log(data);
  res.send(201);
});
