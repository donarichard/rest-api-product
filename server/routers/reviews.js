import { Joi, Segments, celebrate, errors } from "celebrate";
import { Router } from "express";
import { addReviews, getProductReviewsById } from "../services/review.services";


/**
 * review router /review
 * @param {app} app app instance
 * @returns {router} router instance
 */
export default app => {
	const router = Router();

	app.use('/reviews', router);
	/**
	 * Route to fetch a list of all reviews
	 */
	router.route('/:product_id').get(
		/**
		 * #swagger.tags = ['Reviews']
		 * #swagger.path = '/reviews/{product_id}'
		 * #swagger.auto = false
		 */
		/*  #swagger.parameters['limit'] = {
				in: 'query',
				type: 'number',
				default:10
		  } 
				  #swagger.parameters['offset'] = {
				in: 'query',
				type: 'number',
				default:0
		  } 
				#swagger.parameters['product_id'] = {
				in: 'path',
				type: 'string'
		  }
		*/
		celebrate({
			[Segments.QUERY]: Joi.object().keys({
				limit: Joi.number().default(10),
				offset: Joi.number().default(0),
				categoery_type: Joi.string().default('all')
			}),
			[Segments.PARAMS]: Joi.object().keys({
				product_id: Joi.string().required()
			})
		}),
		getProductReviewsById
	);

	/**
	 * Route to create a new review
	 */
	router.route('/').post(
		/**
		 * #swagger.auto = false
		 * #swagger.tags = ['Reviews']
		 * #swagger.path = '/reviews'
		 * #swagger.method = 'post'
		 */
		/* #swagger.parameters['body'] = {
           in: 'body',
           required: true,
           schema: {
               product_id: "SKU-123456789",
			   content: "This is a good product",
			   rating:4
           }
          } 
        */
		celebrate({
			[Segments.BODY]: Joi.object().keys({
				product_id: Joi.string().required(),
				content: Joi.string().required(),
				rating: Joi.number().required(),
			})
		}),
		addReviews
	);
	app.use(errors());
}