const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.route('/').get(getProducts).post(protect, admin, createProduct);
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

// Upload endpoint for separate image upload (optional, but good for react frontend)
// We will also allow direct update in updateProduct if url is provided
// But for file upload we need a specific route logic if using Dropzone
const uploadRoute = express.Router();
uploadRoute.post('/', upload.single('image'), (req, res) => {
    res.send(req.file.path);
});

// We can export both or handle routing in server.js
// I'll export just the product router for now and handle upload in a separate file if needed
// Actually, let's put the upload route in a separate file called uploadRoutes.js
module.exports = router;
