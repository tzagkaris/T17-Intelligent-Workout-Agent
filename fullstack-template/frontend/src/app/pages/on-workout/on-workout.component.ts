import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { SocketsService } from 'src/app/global/services';
import { MediaService } from 'src/app/global/services/media/media.service';

@Component({
  selector: 'on-workout',
  templateUrl: './on-workout.component.html',
  styleUrls: ['./on-workout.component.css']
})

export class OnWorkoutComponent implements OnInit, AfterViewInit{

  @ViewChild('mainVideo', {static: false}) mainVideo: ElementRef;

  ClosedState: boolean = true;
  videoInfoEmitter = new EventEmitter<any>();

  constructor(private media: MediaService, private socketService: SocketsService) {}

  ngOnInit(): void {
    this.ClosedState = false;
  }

  ngAfterViewInit(): void {

    /* dynamicaly add a video source to page */
    this.socketService.syncMessages('secondary-video').subscribe((msg) => {

      this.videoInfoEmitter.emit({videoName: msg.message.name, videoPath: msg.message.path});

      this.ClosedState = true;
    })
  }

  removeMediaVideo = () => {
    this.ClosedState = false;
  }
}

/*
 *  TO DO:
      ADD A LIST OF VIDEOS IN ASSETS ( not done yet ) and on deb screen selection and array.
 */
