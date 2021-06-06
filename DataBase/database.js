const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/RestAPI", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.log("Cannot connect to Database");
    console.log(error);
  });

const DataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  passion: {
    type: String,
    required: true,
  },
  status : Boolean,
});

const PersonalData = mongoose.model('info',DataSchema);

module.exports = PersonalData;

// Trial Data

// const result = new PersonalData({
//     name : "Paras Punjabi",
//     age : 20,
//     passion : "Programming",
//     status : true,
// })

// console.log(result);
// result.save();