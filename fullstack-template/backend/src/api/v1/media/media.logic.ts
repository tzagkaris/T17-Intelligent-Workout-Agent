import { DIContainer, SocketsService } from '@app/services';
import { Request, Response, NextFunction, Router } from 'express';

export interface ISecondaryState {
  'name': String;
  'path': String;
}

export class MediaLogic {

  state: ISecondaryState = {
    name: 'none',
    path: ''
  }

  getSecondaryState = (req: Request, res: Response, next: NextFunction) => {

    if(this.state.name == 'none') {

      res.send('no state to share');
      return;
    }

    this.broadcastState('secondary-video')
    res.send(this.state);
  }

  setSecondaryVideo = (req: Request, res: Response, next: NextFunction) => {

    console.log(req.body);
    if(!req.body.name || !req.body.path) { next('missing arguments'); return; }

    this.state.name = req.body.name;
    this.state.path = req.body.path;

    this.broadcastState('secondary-video');
    res.send(this.state);
  }

  onError = (err: Error, req: Request, res: Response, next: NextFunction) => {

    res.send('error');
  }

  public broadcastState = (event: string) => {

    const cs = DIContainer.get(SocketsService);
    cs.broadcast(event, this.state);
  }
}
