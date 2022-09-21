const mongoose = require("mongoose");

let mediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required:true
    },
    
    media_type: {
      type: String,
      // required:true
    },
    post_id: {
      type: Number,
      // required:true
    },
  
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Media", mediaSchema);
