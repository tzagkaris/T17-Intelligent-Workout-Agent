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

export interface ISong {
  'name' : string,
  'artist' : string,
  'filepath' : string,
  'duration' : string,    /* only used to update visual components */
  'durationInSecs'? : number,  /* may be implemented, if there is time, to create dynamic duration bars */
}

export interface IMusicState {
  'status' : string,
  'song' : ISong | undefined,
  'index': number,
  'volume': number
}

export class MediaLogic {

  /* SECONDARY MEDIA */

  secondaryMediaState: ISecondaryState = {
    name: 'none',
    path: ''
  }

  getSecondaryState = (req: Request, res: Response, next: NextFunction) => {

    if(this.secondaryMediaState.name == 'none') {

      res.send('no state to share');
      return;
    }

    this.broadcastState('secondary-video')
    res.send(this.secondaryMediaState);
  }

  setSecondaryVideo = (req: Request, res: Response, next: NextFunction) => {

    if(!req.body.name || !req.body.path) { next('missing arguments'); return; }

    this.secondaryMediaState.name = req.body.name;
    this.secondaryMediaState.path = req.body.path;

    this.broadcastState('secondary-video');
    res.send(this.secondaryMediaState);
  }

  public broadcastState = (event: string) => {

    const cs = DIContainer.get(SocketsService);
    cs.broadcast(event, this.secondaryMediaState);
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

  /* MUSIC CONTROLS */

  /* temp songs */
  songsArray: ISong[] = [
    {name: 'Lose Yourself', artist: "Eminem", duration: "5:21", filepath: "./../../../../assets/music/Eminem - Lose Yourself.mp3"},
    {name: 'Venom', artist: "Eminem", duration: "4:31", filepath: "./../../../../assets/music/Eminem - Venom.mp3"},
    {name: 'Without Me', artist: "Eminem", duration: "4:52", filepath: "./../../../../assets/music/Eminem - Without Me.mp3"},
    {name: 'Killshot', artist: "Eminem", duration: "4:14", filepath: "./../../../../assets/music/Eminem - Killshot.mp3"},
    {name: 'Godzilla', artist: "Eminem", duration: "3:31", filepath: "./../../../../assets/music/Eminem - Godzilla.mp3"},
    {name: 'Rap God', artist: "Eminem", duration: "6:11", filepath: "./../../../../assets/music/Eminem - Rap God.mp3"},
  ]

  /* initial state */
  musicState: IMusicState = {
    status: 'paused',
    song: this.songsArray[0],
    index: 0,
    volume: .2
  }



/* returns music state */
public getMusicState = (req: Request, res: Response, next: NextFunction) => {

  res.send(this.musicState);
  return;
}

public resetMusicState = (req: Request, res: Response, next: NextFunction) => {

    this.musicState = {
      status: 'paused',
      song: this.songsArray[0],
      index: 0,
      volume: .2
    }

    this.broadcastMusicState()
    res.status(200).send()
  }

/* returns music info array */
public getSongList = (req: Request, res: Response, next: NextFunction) => {

  res.send(this.songsArray);
  return;
}

  /* set state to playing, broadcast new state */
  public startMusic = (req: Request, res: Response, next: NextFunction) => {

    /* select first song if no song was selected  */
    if(!this.musicState.song) {
      this.musicState.index = 0;
      this.musicState.song = this.songsArray[0];
    }

    /* change and broadcast state only if state is not playing */
    if(this.musicState.status != 'playing') {
      this.musicState.status = 'playing';

      this.broadcastMusicState();
    }

    res.status(200).send();
    return;
  }

  /* set state to paused, broadcast new state */
  public stopMusic = (req: Request, res: Response, next: NextFunction) => {

    /* change and broadcast state only if music is playing */
    if(this.musicState.status != 'paused') {
      this.musicState.status = 'paused';

      this.broadcastMusicState();
    }

    res.status(200).send();
  }

  /* advance current song by one, broadcast new state  */
  public nextSong = (req: Request, res: Response, next: NextFunction) => {

    /* get +1 index or loop to 0 index */
    this.musicState.index = ( this.musicState.index + 1 ) % this.songsArray.length;

    this.musicState.song = this.songsArray[this.musicState.index];
``
    this.broadcastMusicState();
    res.status(200).send();
  }

  public changeSongByName = (req: Request, res: Response, next: NextFunction) => {

    let name: string;

    if(!req.body.name) {
      next('no name provided');
      return;
    }

    name = req.body.name;

    let newSongIndex = this.songsArray.findIndex(sng => sng.name == name);
    if(newSongIndex == -1) {
      next('song not found');
      return;
    }

    this.musicState.index = newSongIndex;
    this.musicState.song = this.songsArray[this.musicState.index];
    this.broadcastMusicState();
    res.status(200).send();
  }

  public changeVolume = (req: Request, res: Response, next: NextFunction) => {

    if(req.body.volume == undefined)
      next('volumn not specified');

    if(req.body.volume > 1 || req.body.volume < 0)
      next('volumn out of bounds');

    this.musicState.volume = req.body.volume;

    this.broadcastMusicState();
    res.status(200).send();
  }

  public ringBell = (req: Request, res: Response, next: NextFunction) => {

    this.broadcastBellRing();
    res.status(200).send();
  }

  public broadcastBellRing = () => {

    const cs = DIContainer.get(SocketsService);
    cs.broadcast('media/bell', '1');
  }

  public broadcastMusicState = () => {

    const cs = DIContainer.get(SocketsService);
    cs.broadcast('music/state', this.musicState);
  }

  /* router calls this if error */
  onError = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if(!err) err = new Error('Internal server error::');
    res.status(500).send({error: err});
  }
}
