import { Application } from 'express';
import LoginController from '../controller/login';
import HealthController from '../controller/health';
import { LoginServiceImpl } from '../service/login';
import authenticateJWT from '../middleware/authenticate';

export default class Router {
  private readonly loginController: LoginController;

  private readonly healthController: HealthController;

  constructor(private readonly development: boolean, private readonly app: Application) {
    this.loginController = new LoginController(new LoginServiceImpl(), development);
    this.healthController = new HealthController();
  }

  initPublicRoutes() {
    this.app.get('/health', this.healthController.ping.bind(this.healthController));
    this.app.get('/login', this.loginController.authenticate.bind(this.loginController));
    this.app.get('/logout', this.loginController.logout.bind(this.loginController));
    this.app.get('*', this.healthController.anyPath.bind(this.healthController));
  }

  initPrivateRoutes() {
    this.app.get('/admin', authenticateJWT);
  }
}
