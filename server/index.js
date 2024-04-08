require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const Model = require("./models/Model");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log("Error in Connecting Database :", err);
  });

const db = mongoose.connection;

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.get("/models", async (req, res) => {
  try {
    const query = req.query.search;
    const tag = req.query.tag;
    let queryObj = {};

    if (query && query.length > 2) {
      queryObj.name = { $regex: new RegExp(query, "i") };
    }
    if (tag && tag.length > 0) {
      queryObj.category = tag;
    }

    const offset = parseInt(req.query.offset) || 0;
    const batchSize = 10;

    const models = await Model.find(queryObj)
      .skip(offset)
      .limit(batchSize)
      .exec();

    res.json(models);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/topModel", async (req, res) => {
  try {
    const topModelData = await Model.find()
      .sort({ likes: -1 })
      .limit(10)
      .exec();
    res.json(topModelData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/allModels", async (req, res) => {
  try {
    const allModels = await Model.find();
    res.json(allModels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/uniqueCategories", async (req, res) => {
  try {
    const uniqueCategories = await Model.distinct("category");
    res.json(uniqueCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/uniqueProviders", async (req, res) => {
  try {
    const uniqueProviders = await Model.distinct("provider");
    res.json(uniqueProviders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/favorites", async (req, res) => {
  try {
    const idsParam = req.query.ids;
    if (!idsParam) {
      return res.status(400).json({ message: "IDs parameter is missing" });
    }
    const ids = idsParam.split(',').map(id => id.trim());
    const favoriteModels = await Model.find({ _id: { $in: ids } });
    if (favoriteModels.length > 0) {
      res.json(favoriteModels);
    } else {
      res.status(404).json({ message: "Favorites not found for the provided IDs" });
    }
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/model/:id", async (req, res) => {
  try {
    const modelId = req.params.id;
    const model = await Model.findById(modelId);

    if (!model) {
      return res.status(404).json({ message: "Model not found" });
    }

    res.json(model);
  } catch (error) {
    console.error("Error fetching model details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/models/upload", async (req, res) => {
  try {
    const newModel = new Model(req.body);
    const savedModel = await newModel.save();
    res.status(201).json(savedModel);
  } catch (error) {
    console.error("Error uploading model:", error);
    res.status(500).json({ message: "Error uploading model" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
