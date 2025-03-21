const express=require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const users=require("./routes/api/users");
const products=require("./routes/api/products");
const app = express();

app.use(express.json());
app.use(cors());

const mongo_url = config.get("mongo_url");
mongoose.set('strictQuery', true);
mongoose
.connect(mongo_url)
.then(() => console.log("MongoDB connected..."))
.catch((err) => console.log(err));
app.use("/Users", users);
app.use("/Products", products);


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
