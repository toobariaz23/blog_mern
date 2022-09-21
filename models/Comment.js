const mongoose = require("mongoose");

let commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      // required:true
    },
    
    user: {
      type: mongoose.Types.ObjectId,
      // required:true
      ref:"User"
    },
    posts:[ {
      type: mongoose.Types.ObjectId,
      ref:"Post"
    },]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
