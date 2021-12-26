import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IStatus } from 'src/app/global/models/exercise-state/exercise-state.models';
import { ISecondaryMediaState } from 'src/app/global/models/media/media.models';
import { SocketsService } from 'src/app/global/services';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';
import { MediaService } from 'src/app/global/services/media/media.service';

@Component({
  selector: 'ami-fullstack-deb',
  templateUrl: './deb.component.html',
  styleUrls: ['./deb.component.css']
})
export class DebComponent implements OnInit {

  @ViewChild('secondaryVideoSelection', {static: false}) videoSelection: ElementRef;

  public currentExerciseState: IStatus;

  constructor(private exStateService: ExerciseStateService,
              private mediaService: MediaService,
              private socketService: SocketsService) {

    this.currentExerciseState = {
      currExercise: { name: "No Data", type: "none"},
      exerciseNo: 0,
      currSet: 1,
      currRep: 0,
      condition: "ongoing",
    };
  }

  mediaVideosArray = {
    cactus: {name: 'Cactus Meme Video', path: './../../../../assets/cactus.mp4'},
    another: {name: 'Another Video', path: './../../../../assets/video0_1.mp4'}
  }

  secondaryMediaState: ISecondaryMediaState = {
    name: 'initial',
    path: 'initial'
  }

  ngOnInit() {

    this.socketService.syncMessages("exercise-state").subscribe((msg) => {
      this.currentExerciseState = msg.message;
    })

    this.socketService.syncMessages('secondary-video').subscribe((msg) => {
      this.secondaryMediaState = msg.message;
    })


  }


  public fetchSecondaryState =() => {
    this.mediaService.getSecondaryMedia().subscribe();  /* Return value is propagated from socket  */
  }

  public setSelected =() => {
    let videoSelection = this.videoSelection.nativeElement;
    let vid = this.mediaVideosArray[videoSelection.value];
    this.mediaService.setSecondaryMedia(vid.name, vid.path).subscribe();
  }

  public fetchExState =() => {
    this.exStateService.fetchExerciseState().subscribe();
  }

  public upExState =() => {
    this.exStateService.upExerciseState().subscribe();
  }

  public resetExState =() => {
    this.exStateService.resetExerciseState().subscribe();
  }

}
