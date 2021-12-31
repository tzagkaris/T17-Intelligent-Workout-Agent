import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

export interface IMirrorBundle {
  width: number,
  height: number,
  image: string,
  command?: string
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
}
