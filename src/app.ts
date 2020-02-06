import express from 'express';
import { Application } from 'express';
import { Request, Response } from 'express';
import join from 'path';

class App {
  public app: Application;
  public port: number;

  constructor(appInit: { port: number; middleWares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
    this.assets();
  }

  private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: { forEach: (arg0: (controller: any) => void) => void }) {
    controllers.forEach(controller => {
      this.app.use('/api', controller.router);
    });
  }

  private assets() {
    this.app.use(express.static('public'));

    const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];

    this.app.get('*', (req: Request, res: Response) => {
      if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(join.resolve(`src/public/${req.url}`));
      } else {
        res.sendFile(join.resolve('src/public/index.html'));
      }
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
