import Mongoose, { Schema } from "mongoose";

Mongoose.connect(
  "mongodb+srv://admin:1605--Vr@myatlasclusteredu.x34edzz.mongodb.net/sample_data"
).then(() => {
  console.log("Database Connected");
});

const dataScheme = Mongoose.Schema({
  _id: String,
  city: String,
  loc: [Number],
  pop: Number,
  state: String,
});

const schemas = Mongoose.model("datas", dataScheme);
export default schemas;
