import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private hostURI: string;

  constructor(private http:HttpClient) {
    this.hostURI = environment.host;
  }

  public setSecondaryMedia = (videoName: String, videoPath: String) => {

    console.log(videoPath, videoPath)
    return this.http.post(`${this.hostURI}/api/media/secondary/video`, {name: videoName, path: videoPath})
  }

  public getSecondaryMedia = () => {

    console.log(1)
    return this.http.get(`${this.hostURI}/api/media/secondary/video`)
  }
}
