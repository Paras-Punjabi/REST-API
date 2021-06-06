const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
const fs = require('fs');
const PersonalData = require("../DataBase/database");

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  })
);

app.get('/test',(req,res)=>{
  let html = fs.readFileSync('../Test.html','utf-8');
  res.status(200).send(html)
})


// show all databases present
app.get("/", async (req, res) => {
  try {
    res.statusCode = 200;
    let body = await PersonalData.find();
    res.json(body);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// create on database
app.post("/", async (req, res) => {
  let body = req.body;
  let result = new PersonalData(body);

  try {
    let savedResult = await result.save();
    res.status(201).json(savedResult);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// deleting a data on database
app.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    if(!id){
      return res.status(404).send("Not Found!")
    }

    let data = await PersonalData.findById(id);
    res.json(data);

     await PersonalData.findByIdAndDelete(id);
  } catch (error) {
    res.send({ message: error.message });
  }
});

// updating using patch request
app.patch('/:id',async(req,res)=>{
  let id = req.params.id;
  let body = req.body;
  try {
    let updatedData = await PersonalData.findOneAndUpdate({_id : id},body);
  res.json(updatedData);
  } catch (error) {
    res.status(404).send({message : error.message});
  }


})

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
