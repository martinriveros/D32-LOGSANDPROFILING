const cp=                    require('child_process')
const path=                  require('path')
const {calculateRandom}=     require('../usersServices/calculateRandom')
const { cpus }=              require('os')
const args=                  require('../../../utils/yargs')
const logger =               require('../../../utils/logger')
 


var childProcessActive = false
let calculateRandomCP

const {mode, port, block} = args

class UsersHandler {
    
  async getArgvInfo(req, res, next) {

    const data = [
      
      {desc: 'Argumentos de entrada: ', value: process.argv.length === 2 ?  'no arguments on command line': process.argv[2]},
      {desc: 'Path de Ejecucion: ', value: process.execPath},
      {desc: 'Sistema operativo: ', value: process.platform},
      {desc: 'Version de Node: ', value: process.version},
      {desc: 'Uso de CPU: ', value: process.memoryUsage.rss()},
      {desc: 'Numero de CPUs: ', value: cpus().length},
      {desc: 'ID de Proceso: ', value:process.pid},
      {desc: 'Carpeta de Proyecto', value: process.cwd()},
    ];

    if (args.block){                          // executes logging to console with BLOCKING statements
    data.forEach(element => {
      console.log(element.desc, element.value)
    })
    
  }
    if (!args.block){                         // executes logging to console with NO BLOCKING statements
    data.forEach(element => {
      logger.getLogger('consola').info(element.desc, element.value)
    })
    
  }
    
    res.render('layouts/info', {data})
  }

  async getRandoms(req, res, next){
    
        const {cant} = req.query;
        
        if(!cant) cant=1000000;
        if(args.mode==='child' && !childProcessActive){
          
                
            calculateRandomCP = cp.fork(path.join(__dirname, '../usersServices/calculateRandom'))
            console.log(`este es el proceso lanzado de child_process ${calculateRandomCP.pid}`)          
            
            calculateRandomCP.on('message', response =>{
              res.send(response.data)
              calculateRandomCP.kill()
            })
      
            calculateRandomCP.send(cant)}
        
        else{
          
          if(args.mode!=='child') {
            logger.getLogger('outerror').error('this is a test error, always gonna print')
            res.send(calculateRandom(cant))

          }
          if(childProcessActive) calculateRandomCP.send(cant)
        }
}
}
module.exports = new UsersHandler();



