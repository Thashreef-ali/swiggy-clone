import express from "express";
import { User, Category, Fooditems,Fslider ,Sslider,Restuarant, Offers ,Cart, Logo, City, CityResto} from "./schema.js";
import multer from "multer";
import bcrypt from "bcryptjs";

const route = express.Router();

// Signup Route
route.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    const savedUser = await user.save();

    res.status(201).json({
      message: "User created",
      user: { _id: savedUser._id, name: savedUser.name, email: savedUser.email },
    });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ error: "Signup failed" });
  }
});

// Login
route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    res.status(200).json({
      message: "Login successful",
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
});

// Get User
route.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: "Error fetching user" });
  }
});

// Update User
route.put("/user/:id", async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true, select: "-password" }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.error("Update Error:", err.message);
    res.status(500).json({ error: "Failed to update user" });
  }
});


// catogary route
const imagestorage = multer.memoryStorage();
const upload = multer({ storage: imagestorage });

route.post("/category", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File Upload Failed" });
    }

    console.log("Received file:", req.file); // Debugging log
    console.log("Received type:", req.body.type);

    const newCategory = new Category({
      type: req.body.type,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    console.log("Saving to DB:", newCategory); // Debugging log

    const savedCategory = await newCategory.save();
    res
      .status(200)
      .json({ message: "Image added successfully!", data: savedCategory });
  } catch (error) {
    console.error("Error saving image:", error);
    res
      .status(500)
      .json({ message: "Failed to upload image", error: error.message });
  }
});

route.get("/category", async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    console.log("Error fetching categories:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch categories", error: error.message });
  }
});

// fooditems
route.post('/fooditems',upload.single("image"),async(req,res)=>{
  try {
    const { restuarantname, restuarantdesc, rating, time, place,type ,foodcatagory,fooddescription} = req.body;
    const fooditems = new Fooditems({
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      restuarantname,
      restuarantdesc,
      rating,
      time,
      place,
      type,
      foodcatagory,
      fooddescription,
    });
    const savedfooditems = await fooditems.save()
    res.status(200).json({
      message: "Image added successfully!",
      data: savedfooditems,
    });

  } catch (error) {
    console.error("Error saving image:", error);
    res.status(500).json({
      message: "Failed to upload image",
      error: error.message,
    });
  }
});

// GET food items by type
route.get("/fooditems/type/:type", async (req, res) => {
  try {
    const type = req.params.type;
    const sortBy = req.query.sortBy || "rating"; // default sort
    const order = req.query.order === "asc" ? 1 : -1; // ascending or descending

    const fooditems = await Fooditems.find({ type }).sort({ [sortBy]: order });

    const processedFoodItems = fooditems.map((item) => {
      const base64Image =
        item.image && item.image.data
          ? `data:${item.image.contentType};base64,${item.image.data.toString(
              "base64"
            )}`
          : null;

      return {
        _id: item._id,
        foodcatagory: item.foodcatagory,
        fooddescription: item.fooddescription,
        restuarantname: item.restuarantname,
        restuarantdesc: item.restuarantdesc,
        rating: item.rating,
        time: item.time,
        place: item.place,
        image: base64Image,
      };
    });

    res.status(200).json(processedFoodItems);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching food items by type",
        error: error.message,
      });
  }
});




// first slider
route.post("/fslider", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File Upload Failed" });
    }

    //  Log the request body to check if data is received properly
    console.log("Received body:", req.body);

    // Extract individual fields
    const { restuarantname, restuarantdesc, rating, time, place } = req.body;

    //  Ensure fields exist
    if (!restuarantname || !restuarantdesc || !rating || !time || !place) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new instance of Fslider
    const firstSlider = new Fslider({
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      restuarantname,
      restuarantdesc,
      rating,
      time,
      place,
    });

    // Save to database
    const savedfirsslider = await firstSlider.save();

    res.status(200).json({
      message: "Image added successfully!",
      data: savedfirsslider,
    });
  } catch (error) {
    console.error("Error saving image:", error);
    res.status(500).json({
      message: "Failed to upload image",
      error: error.message,
    });
  }
});


route.get('/fslider',async (req,res)=>{
  try{
  const sliderone = await Fslider.find()
  res.status(200).json(sliderone)
  }
  catch(error){
    res
    .status(500)
    .json({ message: "Failed to fetch categories", error: error.message });
  }
})
// second slider
route.post("/secslider",upload.single("image"),async(req,res)=>{
  try {
    const { restuarantname, restuarantdesc, rating, time, place } = req.body;
    const secondslider = new Sslider({
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      restuarantname,
      restuarantdesc,
      rating,
      time,
      place,
    });
    const newSslider = await secondslider.save()
    res.status(200).json({
      message: "Image added successfully!",
      data: newSslider,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to upload image",
      error: error.message,})
  }
})

route.get('/secslider',async(req,res)=>{
  try{
  const slidertwo = await Sslider.find()
   res.status(200).json(slidertwo)
  }catch(error){
   res.status(500).json({message:"failed to fetch",error})
  }
})

// restuarents
route.post('/restuarants',async(req,res)=>{
  try {
    const {hotel, resto , rating , outlet, time, menu} =req.body
    const newResto = new Restuarant({
      hotel,
      resto,
      rating,
      outlet,
      time,
      menu
    })
    const savedRestuarant = await newResto.save()
    res.status(200).json(savedRestuarant)
  } catch (error) {
    res.status(500).json({
      message:"data error",
      error:error.message
    })
  }
})

route.get("/restuarants/hotel/:hotel", async (req, res) => {
  try {
    const hotel = req.params.hotel;
    const rest = await Restuarant.find({ hotel: hotel });

    const processedResto = rest.map(item => {
      return {
        hotel: item.hotel,
        resto: item.resto,
        rating: item.rating,
        outlet: item.outlet,
        time: item.time,
        menu:item.menu
      };
    });

    res.status(200).json(processedResto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// search route
route.get("/search", async (req, res) => {
  const query = req.query.query?.toString().toLowerCase();
  const wordMatch = new RegExp(`\\b${query}\\b`, "i");

  try {
    const allRestaurants = await Restuarant.find();

    const matchedItems = [];

    allRestaurants.forEach((restaurant) => {
      if (Array.isArray(restaurant.menu)) {
        restaurant.menu.forEach((menuCategory) => {
          if (Array.isArray(menuCategory.items)) {
            menuCategory.items.forEach((item) => {
              if (
                wordMatch.test(item.name) ||
                wordMatch.test(item.description)
              ) {
                matchedItems.push(item);
              }
            });
          }
        });
      }
    });

    res.status(200).json({ items: matchedItems });
  } catch (error) {
    console.error("Error searching for items:", error);
    res.status(500).json({ message: "Error searching for items" });
  }
});

// offers-route
route.post('/offers',upload.single('image'),async(req,res)=>{
  try {
    const { name, rating, cuisines, price, location, distance, prebooking, extraOffers, bankOffer, coupon } = req.body;
    const offers = new Offers({
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      },
      name, 
      rating,
      cuisines,
      price,
      location,
      distance,
      prebooking,
      extraOffers,
      bankOffer,
      coupon,
    })
    await offers.save()
    res.status(200).json({
      message: "Image added successfully!",
      data: offers,
    });
  } catch (error) {
    console.error("Error saving image:", error);
    res.status(500).json({
      message: "Failed to upload image",
      error: error.message,
    });
  }
})

route.get('/offers', async (req, res) => {
  try {
    const offers = await Offers.find();

    const offersWithImage = offers.map((offer) => {
      return {
        _id: offer._id,
        name: offer.name,
        rating: offer.rating,
        cuisines: offer.cuisines,
        price: offer.price,
        location: offer.location,
        distance: offer.distance,
        prebooking: offer.prebooking,
        extraOffers: offer.extraOffers,
        bankOffer: offer.bankOffer,
        coupon: offer.coupon,
        img: `data:${offer.img.contentType};base64,${offer.img.data.toString('base64')}`,
      };
    });

    res.status(200).json(offersWithImage);
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({ message: "Failed to fetch offers", error: error.message });
  }
});


route.post("/upload", async (req, res) => {
  try {
    const { userId, item } = req.body;

    if (!userId || !item) {
      return res.status(400).json({ message: "Missing userId or item" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [item] });
    } else {
      cart.items.push(item);
    }

    await cart.save();

    res.status(200).json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
});

route.get("/upload", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    // Ensure that items exist in the cart
    const items = cart.items || [];

    res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart" });
  }
});


// Route to remove an item from the cart
route.post("/remove", async (req, res) => {
  try {
    const { userId, item } = req.body;

    if (!userId || !item) {
      return res.status(400).json({ message: "Missing userId or item" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the item from the cart
    cart.items = cart.items.filter(
      (cartItem) => cartItem._id.toString() !== item._id.toString()
    );

    await cart.save();

    res.status(200).json({ message: "Item removed from cart successfully" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Error removing item from cart" });
  }
});



// logo
route.post('/logo',upload.single('image'),async(req,res)=>{
  try {
  const img = new  Logo({
    img: {
      data: req.file.buffer,
      contentType: req.file.mimetype
    },
  })
  await img.save()
  res.status(200).json('logo added')
}catch(error){
res.status(500).json({message:"error fetching"})
}
})

route.get("/logo", async (req, res) => {
  try {
    const data = await Logo.find();
    res.status(200).json(data); 
  } catch (error) {
    res.status(500).json({ message: "not ok" });
  }
});

// city
route.post("/city", async (req, res) => {
  try {
    const { name } = req.body;
    const city = new City({ name });
    await city.save();
    res.status(201).json({ message: "City added successfully", city });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in adding city" });
  }
});

route.get("/city", async (req, res) => {
  try {
    const cities = await City.find().select("name -_id"); 
    res.status(200).json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in fetching cities" });
  }
});


// GET city by name
route.get("/city/:name", async (req, res) => {
  try {
    const cityName = req.params.name.toLowerCase(); // Make it case-insensitive
    const city = await City.findOne({ name: cityName });
    if (!city) return res.status(404).json({ message: "City not found" });

    res.status(200).json(city);
  } catch (error) {
    console.error("Error fetching city:", error);
    res.status(500).json({ message: "Server error" });
  }
});

route.post("/cityresto",upload.single('img'),async(req,res)=>{
  try {
    const {hotel,rating,cuisines,price,location,distance,prebooking,extraOffers,bankOffer,cityName} = req.body 
    const city = await City.findOne({ name: cityName.toLowerCase() });
    if (!city) return res.status(404).json({ message: "City not found" });
    const restuarant = new CityResto({
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      },
      hotel,rating,cuisines,price,location,distance,prebooking,extraOffers,bankOffer,city: city._id,
    })
    await restuarant.save()
    res.status(201).json({ message: "Restaurant added", restuarant });
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(500).json({ message: "Server error" });
  }
})

// GET /restaurant/:cityName
route.get("/cityresto/:cityName", async (req, res) => {
  try {
    const cityName = req.params.cityName.toLowerCase();

    const city = await City.findOne({ name: cityName });
    if (!city) return res.status(404).json({ message: "City not found" });

    const restaurants = await CityResto.find({ city: city._id });

    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Server error" });
  }
});





export default route;