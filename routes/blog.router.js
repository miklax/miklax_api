import { Router } from 'express';
import BlogController from '../controllers/blog.controller';

const router = new Router();

// add new blog item
router.post('/blog', (req, res) => {
  BlogController.addBlog(req, res);
});

// get all
router.get('/blog', (req, res) => {
  BlogController.listBlog(req, res);
});

// update blog
router.put('/blog/:cuid', (req, res) => {
  BlogController.updateBlog(req, res);
});

// delete blog
router.delete('/blog/:cuid', (req, res) => {
  BlogController.deleteBlog(req, res);
});

export default router;
