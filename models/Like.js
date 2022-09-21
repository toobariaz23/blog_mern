const mongoose = require("mongoose");

let likeSchema = new mongoose.Schema(
  {
    like: {
      type: Boolean,
      // required:true
    },
    
    user_id: {
      type: String,
      // required:true
    },
    post_id: {
      type: String,
      // required:true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Like", likeSchema);
