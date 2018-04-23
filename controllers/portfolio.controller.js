import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';
import Portfolio from '../models/portfolio';

const PortfolioController = {};

// add new
PortfolioController.addPortf = async (req, res) => {
  if (!req.body.portfolio.naslov && !req.body.portfolio.opis) {
    req.status(403).end();
  }

  try {
    const portf = new Portfolio(req.body.portfolio);

    portf.naslov = sanitizeHtml(portf.naslov);
    portf.opis = sanitizeHtml(portf.opis);
    portf.tagovi = portf.tagovi.map(tag => sanitizeHtml(tag));

    portf.cuid = cuid();
    portf.slug = slug(portf.naslov.toLowerCase(), { lowercase: true });

    await portf.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }

      res.send({ portfolio: saved });
    });
  } catch (error) {
    console.log(error);
  }
};

// list all
PortfolioController.listPortf = async (req, res) => {
  try {
    await Portfolio.find().sord('-datProjekta').exec((err, data) => {
      if (err) {
        res.status(500).send(err);
      }

      res.send(data);
    });
  } catch (error) {
    console.log(error);
  }
};

// list one
PortfolioController.listOnePortf = async (req, res) => {
  try {
    await Portfolio.findOne({ cuid: req.params.cuid }).exec((err, data) => {
      if (err) {
        res.status(500).send(err);
      }

      res.send(data);
    });
  } catch (error) {
    console.log(error);
  }
};

// update
PortfolioController.updatePortf = async (req, res) => {
  if (!req.body.portfolio.naslov && !req.body.portfolio.opis) {
    res.status(403).end();
  }

  try {
    await Portfolio.findOne({ cuid: req.params.cuid }).exec((err, portfolio) => {
      if (err) {
        res.status(500).send(err);
      }

      const dataEdit = portfolio;
      dataEdit.naslov = req.body.portfolio.naslov || portfolio.naslov;
      dataEdit.opis = req.body.portfolio.opis || portfolio.opis;
      // TODO: update tags fix to push or pull
      dataEdit.tagovi = portfolio.tagovi.map(tag => sanitizeHtml(tag)) || portfolio.tagovi;
      console.log('Post about to be saved');
      // Save
      dataEdit.save((error, saved) => {
        if (error) {
          res.status(500).send(err);
        }
        res.json({ post: saved });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

// delete
PortfolioController.deletePortf = async (req, res) => {
  try {
    await Portfolio.findOne({ cuid: req.params.cuid }).exec((err, data) => {
      if (err) {
        res.status(500).send(err);
      }

      data.remove(() => {
        res.status(200).end();
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export default PortfolioController;
