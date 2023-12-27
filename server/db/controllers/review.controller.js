import ReviewModel from "../models/Review.model";

/**
 * Functionality used to create the new review to the database
 * @param {*} productReview product review object
 * @returns {Object} newly created review data
 */
export const createReviews = async productReview => {
    try {
        const newReview = new ReviewModel(productReview);
        const saveReview = await newReview.save();
        return {
            review: saveReview
        };
    } catch (err) {
        logger.error(`Error while creating user ${err}`);
        throw err;
    }
};

/**
 * Functionality used to get reviews from the database
 * @param {*} limit limit for the products lists
 * @param {*} offset skip for the products lists
 * @returns {Array} array of reviews data
 */
export const getReviews = async (limit = 10, offset = 0, product_id) => {
    try {

        const total = await ReviewModel.find({
            product_id: product_id
        }).count();
        const reviews = await ReviewModel.find({
            product_id: product_id
        }).populate('product_id').limit(limit).skip(offset);
        return {
            reviews,
            total
        };
    } catch (error) {
        throw error;
    }
};