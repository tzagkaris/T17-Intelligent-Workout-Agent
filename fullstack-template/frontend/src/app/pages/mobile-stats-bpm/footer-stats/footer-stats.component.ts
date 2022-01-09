import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { IStatus } from 'src/app/global/models/exercise-state/exercise-state.models';
import { SocketsService } from 'src/app/global/services';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';

@Component({
  selector: 'footer-stats',
  templateUrl: './footer-stats.component.html',
  styleUrls: ['./footer-stats.component.css']
})
export class FooterStatsComponent {

}
