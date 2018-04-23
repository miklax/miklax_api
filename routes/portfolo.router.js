import express from 'express';
import PortfolioController from '../controllers/portfolio.controller';

const { router } = express;

// list all
router.get('/portfolio', (req, res) => {
  PortfolioController.listPortf(req, res);
});

// list one
router.get('/portfolio/:cuid', (req, res) => {
  PortfolioController.listOnePortf(req, res);
});

// add
router.post('/portfolio', (req, res) => {
  PortfolioController.addPortf(req, res);
});

// edit
router.put('/portfolio/:cuid', (req, res) => {
  PortfolioController.updatePortf(req, res);
});

// remove
router.delete('/portfolio/:cuid', (req, res) => {
  PortfolioController.deletePortf(req, res);
});
