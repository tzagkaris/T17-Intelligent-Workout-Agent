import { Router, Request, Response, NextFunction } from 'express';
import { MediaLogic } from './media.logic';

export class MediaController {

  public logic: MediaLogic  = new MediaLogic();

  public applyRoutes(): Router {
    const router = Router();

    /* SECONDARY MEDIA */
    /* broadcasts on: "secondary-video" event */

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

    /* MIRROR ROUTES */
    /* broadcasts on: "mirror/state" "mirror/update" events */

    router.post('/mirror',
      this.logic.mirrorInit,
      this.logic.onError
    )

    router.post('/mirror/update',
    this.logic.mirrorUpdate,
    this.logic.onError
    )

    router.delete('/mirror',
      this.logic.mirrorClose,
      this.logic.onError
    )

    /* MUSIC ROUTES */
    /* broadcasts on: "music/state" event */

    /* get music state */
    router.get('/music',
      this.logic.getMusicState,
      this.logic.onError
    )

    router.get('/music/list',
      this.logic.getSongList,
      this.logic.onError
    )

    router.get('/music/play',
      this.logic.startMusic,
      this.logic.onError
    )

    router.get('/music/pause',
      this.logic.stopMusic,
      this.logic.onError
    )

    router.get('/music/next',
      this.logic.nextSong,
      this.logic.onError
    )

    router.post('/music/song',
      this.logic.changeSongByName,
      this.logic.onError
    )

    router.post('/music/volume',
      this.logic.changeVolume,
      this.logic.onError
    )

    router.delete('/music',
      this.logic.resetMusicState,
      this.logic.onError
    )

    router.get('/bell',
      this.logic.ringBell,
      this.logic.onError
    )

    return router;
  }
}
