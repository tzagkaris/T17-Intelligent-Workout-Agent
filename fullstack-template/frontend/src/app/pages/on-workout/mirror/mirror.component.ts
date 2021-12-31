import { AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketsService } from 'src/app/global/services';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';
import { IMirrorBundle, MediaService } from 'src/app/global/services/media/media.service';

@Component({
  selector: 'mirror',
  templateUrl: './mirror.component.html',
  styleUrls: ['./mirror.component.css']
})
export class MirrorComponent implements AfterViewInit {

  @ViewChild('mirrorImg', {static: true}) mirrorImg: ElementRef;
  @Input() deviceName: string;
  @Input() bundle: IMirrorBundle;

  @Output() removeMe = new EventEmitter();

  constructor(private socketService: SocketsService, public mediaService: MediaService) {}

  ngAfterViewInit(): void {
    let mirror: HTMLImageElement = this.mirrorImg.nativeElement;

    mirror.setAttribute('width', `${this.bundle.width}`);
    mirror.setAttribute('height', `${this.bundle.height}`);

    this.socketService.syncMessages('mirror/update',).subscribe((img_data) => {
      /* update img as fast as possible */
      this.mirrorImg.nativeElement.setAttribute('src', img_data.message);
    })
  }



  removeVideo = () => {
    this.removeMe.emit('removeMe');
  }
}
