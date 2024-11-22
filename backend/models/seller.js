const mongoose= require("mongoose");

const SellerSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
   
})
const Seller = mongoose.model("Product",SellerSchema)
export default Seller