const mongoose = require("mongoose");



const connectDB = async () => {

  try {

    await mongoose.connect(`mongodb://169.47.198.147:27017/testdb`, {

      // useNewUrlParser: true,

      // useUnifiedTopology: true,

      // useCreateIndex: true,

      // useFindAndModify: false,

    });

    console.log("\u001b[" + 34 + "m" + `Connected to Database` + "\u001b[0m");

  } catch (error) {

    console.error(error.message);

    // exit process with failure

    process.exit(1);

  }

};

module.exports = connectDB;