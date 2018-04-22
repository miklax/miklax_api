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
    newBlog.tagovi = newBlog.tagovi.map(tag => sanitizeHtml(tag));

    newBlog.slug = slug(newBlog.naslov.toLowerCase(), { lowercase: true });
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
BlogController.listBlog = async (req, res) => {
  try {
    await Blog.find().sort('-datKreiranja').exec((err, data) => {
      if (err) {
        res.send(500).send(err);
      }

      res.send(data);
    });
  } catch (error) {
    console.log(error);
  }
};

// updateBlog
BlogController.updateBlog = async (req, res) => {
  try {
    if (!req.body.blog.naslov && !req.body.blog.sadrzaj) {
      res.status(403).end();
    }

    await Blog.findOne({ cuid: req.params.cuid }).exec((err, blog) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const blogEdit = blog;

        blogEdit.naslov = req.body.blog.naslov || blog.naslov;
        blogEdit.sadrzaj = req.body.blog.sadrzaj || blog.sadrzaj;
        // TODO: update tags fix to push or pull
        blogEdit.tagovi = blog.tagovi.map(tag => sanitizeHtml(tag)) || blog.tagovi;
        console.log('Post about to be saved');
        // Save
        blogEdit.save((error, saved) => {
          if (error) {
            res.status(500).send(err);
          }
          res.json({ post: saved });
        });
      }
    });
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};

// DeleteBlog
BlogController.deleteBlog = async (req, res) => {
  try {
    await Blog.findOne({ cuid: req.params.cuid }).exec((err, blog) => {
      if (err) {
        res.status(500).send(err);
      }

      blog.remove(() => {
        res.status(200).end();
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export default BlogController;
