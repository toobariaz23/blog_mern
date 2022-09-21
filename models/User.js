const mongoose = require("mongoose");
const Post = require("./Post");

let userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      // required:true
    },
    last_name: {
      type: String,
      // required:true
    },
    phone_number: {
      type: String,
      // required:true
    },
    email: {
      type: String,
      required:[true,"Enter unique Email address"] 
    },
    password: {
      type: String,
      
    },
    avatar: {
      type: String,
    },
    posts:{
      type:mongoose.Types.ObjectId,
      ref:"Post"
    }
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('postCount').get(function(){
  return this.posts.length
})
module.exports = mongoose.model("User", userSchema);
