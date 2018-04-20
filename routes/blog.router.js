import { Router } from 'express';
import BlogController from '../controllers/blog.controller';

const router = new Router();

// add new blog item
router.post('/blog', (req, res) => {
  BlogController.addBlog(req, res);
});

router.get('/blog', (req, res) => {
  BlogController.listBlog(req, res);
});

export default router;
