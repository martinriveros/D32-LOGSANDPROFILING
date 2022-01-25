const express =                 require('express');
const path =                    require('path')
const {config}  =               require('./config/index.js');
const serverRoutes =            require('./routes/routes.js');
const cors =                    require('cors');
const compression =             require('compression');
const logger =                  require('./utils/logger')




module.exports = () => {
    
const app = express()

app.use(compression())

app.use((req, res, next)=>{       // several global variables and utils
  logger.getLogger('info').info(`${req.method} - ${req.url}`)
  next() // determines the method and the path previous to router
})
app.set('view engine', 'ejs');                        // template views engine
app.set('views', path.join(__dirname, 'views'))     // views path
app.use(express.urlencoded({extended:true}));         // stores data from POST and PUT requests to req.body attr
app.use(cors(`${config.cors}`))
app.use(express.static(path.join(__dirname, './public'))) /// static css and js files for html
  
serverRoutes(app)
return app
}