import { Router, Request, Response, NextFunction } from 'express';
import { MediaLogic } from './media.logic';

export class MediaController {

  public logic: MediaLogic  = new MediaLogic();

  public applyRoutes(): Router {
    const router = Router();

    /* Set the secondary video */
    router.post('/secondary/video',
      this.logic.setSecondaryVideo,
      this.logic.onError
    )

    /* Get the secondary video. If state is not set, does not broadcast */
    router.get('/secondary/video',
      this.logic.getSecondaryState,
      this.logic.onError
    )

    return router;
  }
}
