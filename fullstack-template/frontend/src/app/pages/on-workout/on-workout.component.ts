import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { SocketsService } from 'src/app/global/services';
import { IMirrorBundle, MediaService } from 'src/app/global/services/media/media.service';

@Component({
  selector: 'on-workout',
  templateUrl: './on-workout.component.html',
  styleUrls: ['./on-workout.component.css']
})

export class OnWorkoutComponent implements OnInit, AfterViewInit{

  @ViewChild('mainVideo', {static: false}) mainVideo: ElementRef;

  ClosedState: boolean = true;
  videoInfoEmitter = new EventEmitter<any>();

  /* MIRROR */
  mirrorState: boolean = false;
  mirrorBundle: IMirrorBundle = undefined;
  mirrorDeviceName: string = 'Unset';


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

    /* Mirror */
    this.socketService.syncMessages('mirror/state').subscribe((msg) => {

      console.log(msg.message.command);
      if(msg.message.command == 'open') {
        this.mirrorBundle = msg.message;
        this.mirrorDeviceName = 'mobile#1';

        this.mirrorState = true;
      }
      else {
        this.mirrorState = false;
      }

    })
  }

  removeMirror = () => {

  }

  removeMediaVideo = () => {
    this.ClosedState = false;
  }
}

/*
 *  TO DO:
      ADD A LIST OF VIDEOS IN ASSETS ( not done yet ) and on deb screen selection and array.
 */
