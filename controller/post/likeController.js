const { apiSuccess, apiError } = require("../../helpers/apiHelpers");
const Like = require("../../models/Like");
const Post = require("../../models/Post")


exports.createLikes= async(req,res)=>{

try {

    let post = await Post.findOne({
        _id:req.params.id,
        user_id:req.user._id});
    if (!post) 
      return res.status(404).json(apiError("Post not found"));
    
    let findLike= await Like.findOne({user_id:req.user._id})
    if(!findLike)
    {
    await Like.create({
        user_id:req.user._id,
        post_id:post._id,
        like:true
    })
    return res.status(200).json(apiSuccess("Post Liked"))
    }
    else{
    await Like.deleteOne({user_id:findLike.user_id})
    return res.status(200).json(apiSuccess("Post dislike"))
}


} catch (error) {
    console.log(error)
}

}