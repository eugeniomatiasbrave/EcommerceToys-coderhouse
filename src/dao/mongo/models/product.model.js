import mongoose from 'mongoose';
import mongoosPaginate from 'mongoose-paginate-v2' 

const collection = "Products";

const schema = new mongoose.Schema({

	title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
	price: {
        type: Number,
        min: 0,
        required: true
    },
    code: {
        type:String,
        unique:true,
        require:true
    },
    status: {
        type:Boolean, 
        default:true
    },
	stock: {
        type: Number,
        required: true,
        min: 0
    },
	category: {
        type:String,
        required:true
    },
    slug: {
        type: String,
        unique: true
    },
	thumbnails:{
		type:Array
	}
});

schema.plugin(mongoosPaginate)

const productModel = mongoose.model(collection,schema);

export default productModel