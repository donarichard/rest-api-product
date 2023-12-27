import { Router } from 'express';
import { celebrate, Joi, errors, Segments } from 'celebrate';
import { addProducts, getProductsLists } from '../services/products.services';

/**
 * products router /products
 * @param {app} app app instance
 * @returns {router} router instance
 */
export default app => {
	const router = Router();

	app.use('/products', router);

	/**
	 * Route to fetch a list of all products
	 */
	router.route('/').get(
		/**
		 * #swagger.tags = ['Product']
		 * #swagger.path = '/products'
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
		   #swagger.parameters['categoery_type'] = {
				in: 'query',
				type: 'string',
				default:'all',
				example: 'all, power_tools, hand_tools, plumbing_tools, other'
		  }
		   #swagger.parameters['product_id'] = {
				in: 'query',
				type: 'string'
		  }
		   #swagger.parameters['feature_type'] = {
				in: 'query',
				type: 'string',
				default:'all',
				example: 'top_rating, special_offer, best_seller, new_arrival'
		  }
        */
		celebrate({
			[Segments.QUERY]: Joi.object().keys({
				limit: Joi.number().default(10),
				offset: Joi.number().default(0),
				categoery_type: Joi.string().default('all'),
				feature_type: Joi.string().default(null),
				product_id:Joi.string().allow(null).default(null)
			})
		}),
		getProductsLists
	);

	/**
	 * Route to create a new Product
	 */
	router.route('/').post(
		/**
		 * #swagger.auto = false
		 * #swagger.tags = ['Product']
		 * #swagger.path = '/products'
		 * #swagger.method = 'post'
		 */
		/* #swagger.parameters['body'] = {
           in: 'body',
           required: true,
           schema: {
               name: "Glossy Gray 19 Aluminium whell AR-19",
               model_id: "SKU-123456789",
               price: 589,
               categoery: "power_tools",
			   inOffer: false
           }
          } 
        */
		celebrate({
			[Segments.BODY]: Joi.object().keys({
				name: Joi.string().required(),
				model_id: Joi.string().required(),
				price: Joi.number().required(),
				categoery: Joi.string().required(),
				inOffer: Joi.boolean().default(false)
			})
		}),
		addProducts
	);

	app.use(errors());
};
