const multer = require('multer')
const path = require('path')
const { apiError } = require('../helpers/apiHelpers')
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, './tmp/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage,
  fileFilter: function fileFilter (req, file, cb) {

  if(file.fieldname=='image')
  {
    if(path.extname(file.originalname)=='.jpeg' || path.extname(file.originalname)=='.jpg' || path.extname(file.originalname)=='.png')
    {
      cb(null,true)
    }
    else{
      cb(new Error('only JPEG,PNG and JPG are allowed'),false)
    }
  }
  
}

})
// const uploadVideos = multer({
//   storage: storage,
//   fileFilter: function (req, file, cb) {
//     var ext = path.extname(file.originalname);
//     if (ext != ".mkv" && ext != ".mp4")
//   {    return cb(new Error("Only videos are allowed"))
//   }
//   cb(null,true)
// }

// })
module.exports = upload;
// module.exports=uploadVideos;