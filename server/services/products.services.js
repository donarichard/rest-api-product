import { createProduct, getProducts } from '../db/controllers/products.controller';
import { FORBIDDEN, CREATED, NOT_FOUND, OK } from 'http-status-codes';
/**
 * Functionality used to create a new products to the database
 * @param {*} req request
 * @param {*} res response
 * @param {*} next middleware
 * @returns {Object} new product data
 */
export const addProducts = async (req, res, next) => {
	try {
		const formattedData = { ...req.body };
		const { product } = await createProduct(formattedData);
		return res.status(CREATED).send({ product: product });
	} catch (error) {
		next(error);
		return 'Error';
	}
};

/**
 * Functionality used to fetch all products from the database
 * @param {*} req request
 * @param {*} res response
 * @param {*} next middleware
 * @returns {Array} users list
 */
export const getProductsLists = async (req, res, next) => {
	try {
		const { limit, offset, categoery_type, product_id, feature_type } = req.query;
		const { products, total } = await getProducts(limit, offset, categoery_type, product_id, feature_type);
		return res.status(OK).send({
			status: true,
			pagination: {
				offset,
				limit,
				total
			},
			products
		});
	} catch (error) {
		next(error);
	}
};
