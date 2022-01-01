import { DIContainer, SocketsService } from '@app/services';
import { Request, Response, NextFunction, Router } from 'express';

export interface ISecondaryState {
  'name': String;
  'path': String;
}

export interface IMirrorBundle {
  'width': number,
  'height': number,
  'image': string,
  'command'?: string
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

    if(!req.body.name || !req.body.path) { next('missing arguments'); return; }

    this.state.name = req.body.name;
    this.state.path = req.body.path;

    this.broadcastState('secondary-video');
    res.send(this.state);
  }

  onError = (err: Error, req: Request, res: Response, next: NextFunction) => {

    res.status(500).send({error: err});
  }

  /* MIRROR */
  mirrorInit = (req: Request, res: Response, next: NextFunction) => {

    let bundle: IMirrorBundle = req.body;
    bundle.command = 'open';

    this.broadcastMirrorState(bundle);
    res.status(200).send();
  }


  mirrorUpdate = (req: Request, res: Response, next: NextFunction) => {

    let data = req.body;

    this.broadcastMirrorUpdate(data);
    res.status(200).send();
  }

  mirrorClose = (req: Request, res: Response, next: NextFunction) => {

    let bundle: IMirrorBundle = req.body;
    bundle.command = 'close';

    this.broadcastMirrorState(bundle);
    res.status(200).send();
  }

  public broadcastMirrorUpdate = (data) => {

    const cs = DIContainer.get(SocketsService);
    cs.broadcast('mirror/update', data.data);
  }

  public broadcastMirrorState = (bundle: IMirrorBundle) => {

    const cs = DIContainer.get(SocketsService);
    cs.broadcast('mirror/state', bundle);
  }

  public broadcastState = (event: string) => {

    const cs = DIContainer.get(SocketsService);
    cs.broadcast(event, this.state);
  }


}
