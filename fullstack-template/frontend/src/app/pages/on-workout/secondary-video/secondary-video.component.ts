import { AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ISecondaryMediaState } from 'src/app/global/models/media/media.models';
import { SocketsService } from 'src/app/global/services';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';

@Component({
  selector: 'secondary-video',
  templateUrl: './secondary-video.component.html',
  styleUrls: ['./secondary-video.component.css']
})
export class MainVideoComponent implements AfterViewInit {

  @ViewChild('videoPlayer', {static: true}) videoPlayer: ElementRef;
  @ViewChild('vidContainer', {static: true}) vidContainer: ElementRef;

  @Output() removeMe = new EventEmitter();

  sourceEmitter = new EventEmitter();

  @Input() videoInfo: Observable<any>;
  videoName: String ='';
  videoPath: String = './../../../../assets/video0_1.mp4';

  constructor(private exService: ExerciseStateService, private socketService: SocketsService) {}

  ngAfterViewInit(): void {

    this.videoInfo.subscribe((info) => {
      this.videoName = info.videoName;

      this.sourceEmitter.emit(info.videoPath);
    })
  }

  removeVideo = () => {
    this.removeMe.emit('removeMe');
  }
}
