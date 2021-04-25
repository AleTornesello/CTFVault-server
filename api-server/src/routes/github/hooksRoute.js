const router = require('express').Router();
const GithubHooksController = require('../../controllers/githubHooksController')

router.use(require('../../middlewares/github/integrityCheck').valid)

// Github webhooks routing
router.use((req, res, next) => {
  if(req.headers['x-github-event']) {
    req.url += `${req.headers['x-github-event']}`
    console.log(`Redirect Github Webhooks request to route ${req.url}`);
    next();
  } else {
    return res.status(STATUS.BAD_REQUEST).json({ error: 'Missing Github event' });
  }
})

router.post('/push', GithubHooksController.push);
router.post('/issues', GithubHooksController.issues);

module.exports = router;