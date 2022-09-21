const { apiSuccess, apiError, apiSuccessWithData } = require('../../helpers/apiHelpers');
const Comment= require('../../models/Comment');
const Post = require('../../models/Post');


exports.createComment = async(req,res)=>{

    try {

        let findPost= await Post.findOne({_id:req.params.id});
        if(!findPost)
      return res.status(404).json(apiSuccess("Post not found"));

      console.log(req.user._id)
          let comment= await Comment.create({
        user:req.user._id,
        post_id:findPost._id,
        comment:req.body.comment
    })
    return res.status(200).json(apiSuccess("Comment Posted"))   
} catch (error) {
    console.log(error)
}}


exports.editComment= async(req,res)=>{
try {
    let findComment=await Comment.findOne({_id:req.params.id,user:req.user._id});
    if(!findComment) return res.status(404).json(apiError("comment not exist"));

    let updateComment=await Comment.updateOne({_id:findComment._id},{comment:req.body.comment})

    if(updateComment) return res.status(200).json(apiSuccess("Comment edited"))
} catch (error) {
    console.log(error)
}
}


exports.deleteComment = async (req, res) => {
    try {
      let getComment = await Comment.findById({ _id: req.params.id,user:req.user._id });
      if (!getComment) return res.status(404).json(apiError("Comment not found"));
  
      let removeComment = await getComment.deleteOne({ _id: getComment._id });
      if (removeComment)
        return res.status(200).json(apiSuccess("Post has been removed"));
    } catch (error) {
      console.log(error);
    }
  };

  exports.getComment = async (req, res) => {
    try {
      let CommentData = await Comment.find({ user: req.user.id }).populate('posts');
      if (CommentData.length == 0)
        return res.status(200).json(apiSuccess("No Comment available"));
      return res.status(200).json(apiSuccessWithData("my Comments", CommentData));
    } catch (error) {
      console.log(error);
    }
  };