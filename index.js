const express = require("express");
const path = require("path");
const Card = require("./models/card");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const MONGO_URI =
  "mongodb+srv://Dilshaad:h80mGOG0WNFafYBN@cluster0.1xgor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("mongo db connected with the database");
});
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.use(bodyParser.json());

// Put all API endpoints under '/api'
app.get("/get-data", (req, res) => {
  console.log("/ get request");

  Card.find((err, card) => {
    if (err) {
      console.log(err);
    } else {
      res.send(card);
    }
  });
});

app.post("/post-data", (req, res) => {
  console.log("/ post requested...");
  let data = req.body.columns,
    newData = [];
  Card.remove({}, (err, cnt) => {
    console.log(cnt);
  });
  console.log(data);
  data.map((outer) => {
    outer.cards.map((inner) => {
      newData.push(
        Card({
          title: inner.title,
          description: inner.description,
          category: outer.title,
        })
      );
      return null;
    });
    return null;
  });
  newData.forEach((item) => {
    item.save();
  });

  res.send("success..");
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
