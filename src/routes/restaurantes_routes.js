const router = require('express-promise-router')();
const restaurantController = require('../controller/restaurante');

router.post('/restaurantes', restaurantController.createRestaurant);

router.get('/restaurantes', restaurantController.listAllRestaurants);
router.get('/restaurantes/:id', restaurantController.findRestaurantById);


router.put('/restaurantes/:id', restaurantController.updateRestaurantById);


router.delete('/restaurantes/:id', restaurantController.deleteRestaurantById);

module.exports = router;