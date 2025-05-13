import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import route from "./route.js";

const app = express();
app.use(express.json());

app.use(cors({
  origin:['https://swiggy-clone-backend-g9z2.onrender.com',
    'https://swiggy-clone-frontend-7um1.onrender.com'
  ],
  methods:["GET","POST","PUT","DELETE"],
  allowedHeaders:["Content-Type"]
}));
app.use('/api',route)

app.listen(4000, () => {
  console.log("server connected success");
});

const connectTodb = async () => {
  try {
   await mongoose.connect("mongodb+srv://thashreefalit:HmBuVuDDNVZ5uYce@swiggy.8iip2gw.mongodb.net/test?retryWrites=true&w=majority&appName=swiggy`");
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};
connectTodb();
