import mongoose from 'mongoose';

const Products = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		model_id: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true
		},
		categoery: {
			type: String,
			enum: ['power_tools', 'hand_tools', 'plumbing_tools', 'other'],
			default: 'other'
		},
		inOffer: {
			type:Boolean,
			default:false
		}
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

Products.index(
	{
		name: 1,
		model_id: 1
	}
);
export default mongoose.model('Products', Products);
