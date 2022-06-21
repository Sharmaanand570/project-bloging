const express = require('express');
const router = express.Router();
const authorController = require("../controller/authorController")
const blogController = require("../controller/blogController")

router.post('/authors', authorController.createAuthor)

router.post('/blogs', blogController.createBlogg)

router.get('/blogs', blogController.getBlogg)

router.put('/blogs/:blogId', blogController.updateBlogg)

router.delete('/blogs/:blogId', blogController.deleteBloggById)

router.delete('/blogs', blogController.deleteBloggByQueryParams)

module.exports = router;
