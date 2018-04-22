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

      res.send({ blog: saved });
    });
  } catch (error) {
    console.log(error);
  }
};

// list all
PortfolioController.listPortf = async (req, res) => {

};

// list one
PortfolioController.listOnePortf = async (req, res) => {

};

// update
PortfolioController.updatePortf = async (req, res) => {

};

// delete
PortfolioController.deletePortf = async (req, res) => {

};

export default PortfolioController;
