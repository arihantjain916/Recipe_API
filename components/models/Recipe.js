const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema({
    name:{
      type: String,
      require: true
    },
    description:{
      type: String,
      require: true
    },
    createdAt:{
      type: String,
    },
});

const Recipe = mongoose.model(
  "Recipe Information",
  recipeSchema
);
module.exports = Recipe;
