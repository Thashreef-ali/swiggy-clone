import mongoose from "mongoose";

// User Schema
const UsersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { type: String, required: true }
});

// Category Schema
const CategorySchema = new mongoose.Schema({
  type: { type: String, required: true },
  image: { 
    data: Buffer,
    contentType: String,
  },
});

// food items 
const FooditemsSchema= new mongoose.Schema({
  image : {
    data:Buffer,
    contentType:String
  },
  foodcatagory : {
    type:String
  },
  fooddescription : {
    type:String
  },
  restuarantname :{
    type:String
  },
  restuarantdesc :{
    type:String
  },
  rating:{
    type:String
  },
  time:{
    type:String
  },
  place:{
    type:String
  },
  type: { type: String, required: true },

})

// first slider
const FirstsliderSchema =  new mongoose.Schema({
  image : {
    data:Buffer,
    contentType:String
  },
  restuarantname :{
    type:String
  },
  restuarantdesc :{
    type:String
  },
  rating:{
    type:String
  },
  time:{
    type:String
  },
  place:{
    type:String
  }

})

// second slider
const secondsliderSchema =new mongoose.Schema({
  image : {
    data:Buffer,
    contentType:String
  },
  restuarantname :{
    type:String
  },
  restuarantdesc :{
    type:String
  },
  rating:{
    type:String
  },
  time:{
    type:String
  },
  place:{
    type:String
  }
})

// restuarants
const restuarantSchema = new mongoose.Schema({
  hotel:{type:String},
  resto:{type:String},
  rating:{type:String},
  outlet:{type:String},
  time:{type:String},
  menu:[
    {
      category:String, 
      items:[{
        name:String,
        price:String,
        rating:String,
        review:Number,
        description:String
      }]
    }
  ]
})

// offers schema
const offersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  cuisines: { type: String, required: true },
  price: { type: String, required: true },
  location: { type: String, required: true },
  distance: { type: String, required: true },
  img: { data:Buffer, contentType:String },
  prebooking: { type: String, required: true },
  extraOffers: { type: String, required: true },
  bankOffer: { type: String, required: true },
  coupon: { type: String, required: true },
})

// cart schema
const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      name: String,
      price: String,
      rating: String,
      review: Number,
      description: String,
    },
  ],
});

// logo
const logoSchema =new mongoose.Schema({
  img: { data:Buffer, contentType:String },
}) 

// city
const citiesSchema = new mongoose.Schema({
  name: { type: String, trim: true, lowercase: true, unique: true, required: true },
});

const cityresturantSchema = new mongoose.Schema({
    hotel: { type: String, required: true },
    rating: { type: Number, required: true },
    cuisines: { type: String, required: true },
    price: { type: String, required: true },
    location: { type: String, required: true },
    distance: { type: String, required: true },
    img: { data:Buffer, contentType:String },
    prebooking: { type: String, required: true },
    extraOffers: { type: String, required: true },
    bankOffer: { type: String, required: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City" }
})


// Creating Models
const User = mongoose.model("User", UsersSchema);
const Category = mongoose.model("Category", CategorySchema);
const Fooditems= mongoose.model("Fooditems",FooditemsSchema)
const Fslider = mongoose.model("Fslider",FirstsliderSchema);
const Sslider = mongoose.model("Sslider",secondsliderSchema);
const Restuarant = mongoose.model('Restuarants',restuarantSchema);
const Offers = mongoose.model("Offers", offersSchema);
const Cart = mongoose.model('Cart',cartSchema);
const Logo = mongoose.model("Logo",logoSchema);
const City = mongoose.model("City",citiesSchema);
const CityResto = mongoose.model("CityResto",cityresturantSchema);
// Export models
export { User, Category, Fooditems, Fslider, Sslider, Restuarant, Offers ,Cart,Logo,City,CityResto};