let express = require("express");
let app = express();
let multer = require("multer");
let upload = multer();
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let parser = require("cookie-parser");
app.use(parser());
let sha1 = require("sha1");
let reloadMagic = require("./reload-magic.js");

reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

let dbo = undefined;
let url =
  "mongodb+srv://johnnycaron:Databot23@cluster0-5frkx.gcp.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db("management");
});

let sessionIds = {};

// Your endpoints go after this line

app.post("/login", upload.none(), (req, res) => {
  let email = req.body.email;
  let enteredPassword = req.body.password;
  dbo.collection("users").findOne({ email: email }, (err, user) => {
    if (err) {
      console.log("error at /login endpoint", err);
      res.send(JSON.stringify({ success: false }));
    } else if (user === null) {
      res.send(JSON.stringify({ success: false }));
    } else if (user.password === enteredPassword) {
      sessionId = Math.floor(Math.random() * 10000000);
      sessionIds[sessionId] = email;
      res.cookie("sid", sessionId);
      res.send(JSON.stringify({ success: true }));
    } else {
      res.send(JSON.stringify({ success: false }));
    }
  });
});

app.post("/signup", upload.none(), (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  dbo.collection("users").findOne({ email }, (err, user) => {
    if (err) {
      console.log("error at the /signup endpoint", err);
      res.send(JSON.stringify({ success: false }));
    } else if (user !== null) {
      res.send(JSON.stringify({ success: false }));
      console.log("email already exists");
    } else {
      dbo.collection("users").insertOne({ email, password }, (err, user) => {
        if (err) {
          console.log("error inserting user at the /signup endpoint", err);
          res.send(JSON.stringify({ success: false }));
        } else {
          res.send(JSON.stringify({ success: true }));
        }
      });
    }
  });
});

app.get("/progress", (req, res) => {
  let sid = req.cookies.sid;
  let email = sessionIds[sid];
  dbo
    .collection("logs")
    .find({ email })
    .toArray((err, item) => {
      if (err) {
        return;
      } else {
        res.send(JSON.stringify(item));
      }
    });
});

app.post("/new-log", upload.none(), (req, res) => {
  // let date = new Date();
  // let month = date.getMonth() + 1;
  // let day = date.getDate();
  // let year = date.getFullYear();
  // let hour = date.getHours();
  // let minute = date.getMinutes();
  // console.log("date", month, day, year);
  let sid = req.cookies.sid;
  let email = sessionIds[sid];
  let date = req.body.date;
  let time = req.body.time;
  let beforeOrAfter = req.body.beforeOrAfter;
  let reading = Number(req.body.reading);
  let mealOrSnack = req.body.mealOrSnack;
  let foodEntered = req.body.foodEntered;
  let insulinTaken = Number(req.body.insulinTaken);
  console.log(email);
  dbo.collection("logs").insertOne(
    {
      email,
      date,
      time,
      beforeOrAfter,
      reading,
      mealOrSnack,
      foodEntered,
      insulinTaken
    },
    (err, user) => {
      console.log(user);
      if (err) {
        console.log("error adding log to user", err);
        res.send({ success: false });
      } else {
        res.send({ success: true });
      }
    }
  );
});

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
