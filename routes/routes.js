const { Router } =          require("express");
const router =              Router();
const usersHandler =        require("../components/users/usersHandlers/usersHandler");
const logger =              require('../utils/logger')

module.exports = (app) => {
  
  app.use("/", router);


  router.get('/info', usersHandler.getArgvInfo)
  router.get('/api/randoms', usersHandler.getRandoms)
  router.get('*', (req, res, next)=>{
      logger.getLogger('outwarning').warn(`Try to access non existing route ${req.method} - ${req.url}`);
      res.send(`WARNING, route ${req.method} - ${req.url} does not exist, like Colon`)
  })

 

};



