let User = require("../../models/User");
let Post = require("../../models/Post");
const Media = require("../../models/Media");
const {
  apiSuccess,
  apiError,
  apiSuccessWithData,
} = require("../../helpers/apiHelpers");

exports.createPost = async (req, res) => {
  try {

    let post = await Post.create({
      title: req.body.title,
      description: req.body.description,
      users: req.user._id,
    });


    return res.status(200).json(apiSuccess("Post created"));
  } catch (error) {
    console.log(error);
  }
};

exports.getPost = async (req, res) => {
  try {
    let {user}=req;
  
    let postData = await Post.find({users:user._id}).populate("users").populate({path:'comments'});
    if (postData.length == 0)
      return res.status(200).json(apiSuccess("No post available"));
    return res.status(200).json(apiSuccessWithData("my posts", postData));
  } catch (error) {
    console.log(error);
  }
};
exports.viewPost= async(req,res)=>{
  try {
    let postData = await Post.findOne({_id: req.params.id });
    if (!postData)
      return res.status(404).json(apiSuccess("No post available"));
    return res.status(200).json(apiSuccessWithData("my posts", postData));
  } catch (error) {
    console.log(error);
  }



}
exports.deletePost = async (req, res) => {
  try {
    let getPost = await Post.findById({ _id: req.params.id });
    if (!getPost) return res.status(404).json(apiError("Post not found"));

    let removePost = await getPost.deleteOne({ _id: getPost._id });
    if (removePost)
      return res.status(200).json(apiSuccess("Post has been removed"));
  } catch (error) {
    console.log(error);
  }
};

exports.editPost = async (req, res) => {
  try {
    let post = await Post.findOne({ _id: req.params.id });

    if (!post) return res.status(404).json(apiError("Post not found"));

    await Post.updateOne(
      {
        _id: post._id,
      },
      {
        title: req.body.title,
        description: req.body.description,
      }
    );

    return res.status(200).json(apiSuccess("Post updated successfully"));
  } catch (error) {
    console.log(error);
  }
};
