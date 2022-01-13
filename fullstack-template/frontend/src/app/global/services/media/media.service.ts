import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

/* Mirror interfaces */

export interface IMirrorBundle {
  width: number,
  height: number,
  image: string,
  command?: string
}

/* Music  interfaces */

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

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private hostURI: string;

  constructor(private http:HttpClient) {
    this.hostURI = environment.host;
  }

  /* SECONDARY MEDIA */
  /* events: secondary-video */

  public setSecondaryMedia = (videoName: String, videoPath: String) => {

    return this.http.post(`${this.hostURI}/api/media/secondary/video`, {name: videoName, path: videoPath})
  }

  public getSecondaryMedia = () => {

    return this.http.get(`${this.hostURI}/api/media/secondary/video`)
  }

  /* MIRROR */
  /* events: mirror/state - mirror/update */

  /* send a bundle containing mirror image and canvas width and height */
  public initMirror = (bundle: IMirrorBundle) => {

    return this.http.post(`${this.hostURI}/api/media/mirror`, bundle);
  }

  /*  send a bundle containing only mirror updated image */
  public newMirrorData = (data: string) => {

    return this.http.post(`${this.hostURI}/api/media/mirror/update`, {data: data});
  }

  /* signify termination */
  public closeMirror = () => {

    return this.http.delete(`${this.hostURI}/api/media/mirror`);
  }

  /* MUSIC */
  /* events: music/state */
  public getMusicState = () => {

    return this.http.get<IMusicState>(`${this.hostURI}/api/media/music`);
  }

  /* returns an array of ISong ( see interfaces above ) */
  public getMusicTrackList = () => {

    return this.http.get(`${this.hostURI}/api/media/music/list`);
  }


  /**
   *    Call this to start music on selected track.
   *    Result is propageted by music/state event. Function just returns ok.
   *   Do not forget to subscibe to the result or else angular does not send the request.
   *   No need to do anything with the result.
   *
   *   ex. this.media.setMusicPlaying().subscibe()
   */
  public setMusicPlaying = () => {

    return this.http.get(`${this.hostURI}/api/media/music/play`);
  }

  public setMusicPaused = () => {

    return this.http.get(`${this.hostURI}/api/media/music/pause`);
  }

  public nextTrack = () => {

    return this.http.get(`${this.hostURI}/api/media/music/next`);
  }

  public setTrackByName = (trackName: string) => {

    return this.http.post(`${this.hostURI}/api/media/music/song`, {name: trackName});
  }

  public setVolume = (newValue: number) => {

    return this.http.post(`${this.hostURI}/api/media/music/volume`, {volume: newValue});
  }

  public resetMusicState = () => {

    return this.http.delete(`${this.hostURI}/api/media/music`);
  }

  public ringCompletionBell = () => {

    return this.http.get(`${this.hostURI}/api/media/bell`);
  }
}
