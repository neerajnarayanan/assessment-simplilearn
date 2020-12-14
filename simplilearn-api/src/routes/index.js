import express from 'express';

var router = express.Router();

/* GET home page. */
router.get('/health-check', (req, res, next) =>  {
  res.send(`Express app working fine`);
});

export default router;