import { createProduct, getProducts } from '../db/controllers/products.controller';
import { FORBIDDEN, CREATED, NOT_FOUND, OK } from 'http-status-codes';
import { createReviews, getReviews } from '../db/controllers/review.controller';
/**
 * Functionality used to create a new reviews to the database
 * @param {*} req request
 * @param {*} res response
 * @param {*} next middleware
 * @returns {Object} new reviews data
 */
export const addReviews = async (req, res, next) => {
    try {
        const formattedData = { ...req.body };
        const { review } = await createReviews(formattedData);
        return res.status(CREATED).send({ review: review });
    } catch (error) {
        next(error);
        return 'Error';
    }
};


/**
 * Functionality used to fetch all reviews from the database
 * @param {*} req request
 * @param {*} res response
 * @param {*} next middleware
 * @returns {Array} users list
 */
export const getProductReviewsById = async (req, res, next) => {
    try {
        console.log(req)
        const { limit, offset } = req.query;
        const { product_id } = req.params;
        const { reviews, total } = await getReviews(limit, offset, product_id);
        return res.status(OK).send({
            status: true,
            pagination: {
                offset,
                limit,
                total
            },
            reviews
        });
    } catch (error) {
        next(error);
    }
};
