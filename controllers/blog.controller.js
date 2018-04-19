import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';
import Blog from '../models/blog';

const BlogController = {};

// AddBlog
BlogController.addBlog = async (req, res) => {
  try {
    if (!req.body.blog.naslov || !req.body.blog.sadrzaj) {
      res.status(403).end();
    }

    const newBlog = new Blog(req.body.blog);

    // read from json and sanitize
    newBlog.naslov = sanitizeHtml(newBlog.naslov);
    newBlog.sadrzaj = sanitizeHtml(newBlog.sadrzaj);

    newBlog.slug = slug(newBlog.naslov.toLoverCase(), { lowercase: true });
    newBlog.cuid = cuid();

    await newBlog.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }

      res.send({ blog: saved });
    });
  } catch (error) {
    console.log(error);
  }
};

// ListAll

// DeeteBlog

// updateBlog

export default BlogController;
