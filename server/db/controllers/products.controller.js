import mongoose from 'mongoose';
import logger from '../../config/logger';
import ProductModel from '../models/Products.model';

/**
 * Functionality used to create the new product to the database
 * @param {*} product product object
 * @returns {Object} newly created product data
 */
export const createProduct = async product => {
	try {
		const newProduct = new ProductModel(product);
		const saveProduct = await newProduct.save();
		return {
			product: saveProduct
		};
	} catch (err) {
		logger.error(`Error while creating user ${err}`);
		throw err;
	}
};

/**
 * Functionality used to get products from the database
 * @param {*} limit limit for the products lists
 * @param {*} offset skip for the products lists
 * @returns {Array} array of products data
 */
export const getProducts = async (limit = 10, offset = 0, categoery_type = 'all', product_id = null, feature_type=null) => {
	try {
		let filter = {}
		let fieldName = null,  sortOrder = null;
		if (categoery_type !== 'all') {
			filter = {
				categoery: categoery_type
			}
		}
		if(feature_type === 'top_rating'){
			fieldName = 'rating';
			sortOrder = 'desc';
		}
		if(feature_type === 'special_offer'){
			filter = {
				...filter,
				inOffer: true
			}
		}
		if (product_id) {
			filter = {
				...filter,
				_id: new mongoose.Types.ObjectId("658c48d8b0a02e81af936128")
			}
		}
		const total = await ProductModel.find(filter).count();
		const products = await ProductModel.aggregate([
			{
				$match: filter
			},
			{
				$lookup: {
					from: 'reviews',
					localField: '_id',
					foreignField: 'product_id',
					as: 'reviews'
				}
			},
			{
				$addFields: {
					totalRating: {
						$sum: '$reviews.rating'
					}
				}
			},
			{
				$addFields: { reviewCount: { $size: '$reviews' } }
			},
			{
				$addFields: {
					rating: {
						$cond: [
							{ $eq: ['$reviewCount', 0] },
							0,
							{ $divide: ['$totalRating', '$reviewCount'] }
						]
					}
				}
			},
			{
				$project: {
					reviews: 0,
					totalRating: 0
				}
			},
			{
				$skip: offset
			},
			{
				$limit: limit
			},
			...(fieldName && sortOrder ? [{ $sort: { [fieldName]: sortOrder === 'asc' ? 1 : -1 } }] : []),
		]);
		return {
			products,
			total
		};
	} catch (error) {
		throw error;
	}
};
