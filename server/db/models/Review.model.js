import mongoose from 'mongoose';

const Reviews = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Types.ObjectId,
            refs: 'Products'
        },
        content: {
            type: String,
        },
        rating: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Reviews', Reviews);
