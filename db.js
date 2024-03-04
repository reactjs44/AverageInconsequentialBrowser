import mongoose from 'mongoose'


 const mongodbURL='mongodb+srv://leariningcourses:0OH5tRklU0YHcIc6@cluster0.70nycvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(mongodbURL);


const db=mongoose.connection;

db.on('error',()=>{
  console.log("mongodb not connected ");
})

 db.on('connected',()=>{
   console.log('mongodb connected');
 })

export default db;