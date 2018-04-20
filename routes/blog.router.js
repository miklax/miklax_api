import { Router } from 'express';
import BlogController from '../controllers/blog.controller';

const router = new Router();

// add new blog item
router.post('/blog', (req, res) => {
  BlogController.addBlog(req, res);
});

router.get('/blog', (req, res) => {
  res.send({ blog: 'its working' });
});

export default router;
