import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SocketsService } from 'src/app/global/services';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';

@Component({
  selector: 'main-video',
  templateUrl: './secondary-video.component.html',
  styleUrls: ['./secondary-video.component.css']
})
export class MainVideoComponent implements OnInit {

  @ViewChild('videoPlayer', {static: true}) videoPlayer: ElementRef;
  @ViewChild('vidContainer', {static: true}) vidContainer: ElementRef;

  @Output() removeMe = new EventEmitter();

  videoSource: String = "./../../assets/cactus.mp4";

  constructor(private exService: ExerciseStateService, private socketService: SocketsService) {}

  ngOnInit(): void {

  }

  removeVideo = () => {
    console.log(1);
    this.removeMe.emit('removeMe');
  }
}
