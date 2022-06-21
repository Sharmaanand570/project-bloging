const express = require('express');
const router = express.Router();
const autherController = require("../controller/autherController")
const blogController = require("../controller/blogController")

router.post('/authors', autherController.createAuther)

router.post('/blogs', blogController.createBlogg)

router.get('/blogs', blogController.getBlogg)

router.put('/blogs/:blogId', blogController.updateBlogg)

router.delete('/blogs/:blogId', blogController.deleteBloggById)

router.delete('/blogs', blogController.deleteBloggByQueryParams)

module.exports = router;
