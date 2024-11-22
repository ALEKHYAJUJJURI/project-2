const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

require('dotenv').config()
const app = express();
require('cookie-parser')
// Middleware
app.use(cors() );
app.use(express.json());


app.use(cors({
  origin: 'http://localhost:3000',  // Only allow your frontend's origin
  credentials: true
}));
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mernauth', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:{type:String,required:true}

});

const User = mongoose.model('User', userSchema);


const generateTokens = (userId) => {
  const accessToken = jwt.sign({ email:userId}, process.env.JWT_SECRET, { expiresIn: '1m' });  
  const refreshToken = jwt.sign({ email: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' }); 
  return { accessToken, refreshToken };
};
app.get('/get',async (req,res)=>{
  try{
res.status(200).json({msg:"welcome"})
  }catch(err){
    res.status(404).json({msg:"not found"})
  }
})

// Signup route
app.post('/api/signup', async (req, res) => {
  const { username, email, password,role } = req.body;
    if(!username || !email || !password || !role){
      return res.status(400).json({error:"All feilds are required"})
    }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword,role });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password' });
   
    const {accessToken , refreshToken} = generateTokens(user.email) 
    res.cookie('accessToken',accessToken,{maxAge:60000})
    res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:'None',
        maxAge:300000
    })
    return res.status(200).json({accessToken,refreshToken,user})
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

app.post('/api/refresh-token', async (req,res)=>{
  
   const user = await User.findOne({ email });
  accessToken = jwt.sign({ _id:user.email}, process.env.JWT_SECRET, { expiresIn: '1m' });  
  refreshToken = jwt.sign({ _id:user.email}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' }); 
  if(!refreshToken){
    return res.status(403).json({error:"Refresh token is required"})
  }

try{
  const verified = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
  const {accessToken,refreshToken:newRefreshToken} = generateTokens(verified.email)


  res.status(200).json(accessToken,newRefreshToken)
}catch(err){
  res.status(400).json({error:"Invalid refresh token"})
}

}) 

// Middleware to verify JWT
app.get('/get-login',(req,res)=>{
  res.status(200).json({res:"message"})
})

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
app.get("*",(req,res)=>{
  return res.status(404).json({message:'Notfound'})
})
// Protected route
mongoose.connect('mongodb://localhost:27017/mernauth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.user.email });
});

const SellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
 
})
const Seller = mongoose.model("seller",SellerSchema)
app.post('/api/products', async (req,res)=>{
  const {name,description,price} = req.body 

  try{
    const product = new Seller({ name,description,price });
   await product.save()
   res.status(200).json({product})
  }
  catch(err){
    res.status(500).json({err:"not uploaded"})
  }
  
});

app.get('/api/get-products', async(req,res)=>{
  try{
    const products = await Seller.find()
  res.status(200).json(products)
  } catch(err){
    res.status(500).json({err:"not found products"})
  }

})



//seller modal 

/*
const sellerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:{type:String,required:true}


});
const Seller = mongoose.model('Seller', sellerSchema);

app.post('/api/user-signup', async (req, res) => {
  const { username, email, password,role } = req.body;
    if(!username || !email || !password || !role){
      return res.status(400).json({error:"All feilds are required"})
    }

  try {
   if(role==="seller"){
    const existingUser = await Seller.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Seller({ username, email, password: hashedPassword,role });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
   }
    
}); */

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));