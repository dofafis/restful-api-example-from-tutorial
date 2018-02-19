import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import DataBase from './config/db';
import UserRoutes from './modules/user/routes';

class App {
  public app: express.Application;
  private morgan: morgan.Morgan;
  private bodyParser;
  private database: DataBase;

  constructor(){
    this.app = express();
    this.middleware();
    this.routes();
    this.database = new DataBase();
    this.dataBaseConnection();
  }

  dataBaseConnection(){
    this.database.createConnection();
  }

  closeDataBaseConnection(message, callback){
    this.database.closeConnection(message, ()=>callback());
  }



  middleware(){
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
  routes(){
    this.app.get('/',(req, res) => res.status(200).json({ 'message': 'Hello world!' }));
    this.app.get('/api/v1/users', UserRoutes.getAll);
    this.app.get('/api/v1/users/:id', UserRoutes.getById);
    this.app.post('/api/v1/users', UserRoutes.create);
    this.app.put('/api/v1/users/:id', UserRoutes.update);
    this.app.delete('/api/v1/users/:id', UserRoutes.delete);
  }
}

export default new App();
