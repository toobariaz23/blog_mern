const { apiError, apiSuccess, apiLogin, apiSuccessWithData } = require("../../helpers/apiHelpers");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const mongoose= require('mongoose');

exports.register = async (req, res) => {
  console.log(req.body);
  // return
  try {
    let { first_name, last_name, email, password, avatar } = req.body;
    console.log(req.body,"bodyyyy")

    let findUser = await User.findOne({ email: email });
    if (findUser) return res.status(401).json(apiError("User already exist"));
    let avatarData = gravatar.url(
      req.body,
      // options
      {
        // protocol: "https",
        s: "200", // size
        r: "pg", // rating
        d: "mm", // default value if avatar not exists
      }
    );
    let saltRound = 10;
    // let salt = await bcrypt.genSalt();
     let hashPassword =await  bcrypt.hash(password, saltRound)
    console.log(hashPassword);
    let createUser = new User({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashPassword,
      avatar: avatarData,
    });

    // if (req.file) {
    //   createUser.avatar = avatarData;
    //   await createUser.save();
    // }
    console.log(createUser);
    createUser.save((err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
      }
    });
    return res.status(200).json(apiSuccess("User Profile created"));
  } catch (error) {
    console.log(error);
  }
};
exports.login = async (req, res) => {
  try {
    let findUser = await User.findOne({ email: req.body.email });
    if (!findUser) return res.status(404).json(apiError("Invalid email"));
    let token = await jwt.sign({ user_id: findUser.id, expiry: moment().utc().add(1, "year") },"mern_app");
    let hashPassword = await bcrypt.compare( req.body.password,findUser.password);
  
    if (!hashPassword)
      return res.status(404).json(apiError("incorrect password"));

    return res.status(200).json(apiLogin("login successfully", token));
  } catch (error) {
    console.log(error)
  }

};

exports.editProfile = async (req, res) => {
  try {
    let { user } = req; 
   let userId=mongoose.Types.ObjectId(user._id)
    // let findUser = await User.findById(user._id);
    // if (!findUser) return res.status(404).json(apiError("Unathorized"));

    // await User.updateOne(
    //   {
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     phone_number: req.body.last_name,
    //   },

    // );

console.log(req.user._id)
    let data=await User.findOneAndUpdate(
      { _id: userId},
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.last_name,
      }
    );

    return res
      .status(201)
      .json(apiSuccessWithData("User profile updated successfully..",data));
  } catch (error) {
    console.log(error);
  }
};


exports.getProfile= async(req,res)=>{

  try {

    let auth= await User.findOne({
      id:req.user.id
    })
    if(!auth) return res.status(401).json("Unauthorized");
    return res.status(200).json(apiSuccessWithData("Auth Profile",auth));
  } catch (error) {
    
  }
}