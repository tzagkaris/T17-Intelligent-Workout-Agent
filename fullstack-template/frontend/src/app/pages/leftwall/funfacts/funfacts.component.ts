import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { IStatus } from 'src/app/global/models/exercise-state/exercise-state.models';
import { SocketsService } from 'src/app/global/services';
import { ExerciseStateService } from 'src/app/global/services/exercise-state/exercise-state.service';

@Component({
  selector: 'funfacts',
  templateUrl: './funfacts.component.html',
  styleUrls: ['./funfacts.component.css']
})
export class FunfactsComponent {

  facts = [
    'Your calories could light a bulb for 213 hours.',
    'Your favorite exercise is: Close Tricep Pushups.',
    'An apple a day keeps the doctors away... And using this app of course!',
    'You are reps away from one thousand pushups.',
    'Don\'t delay, burn today. Louis Rossman classic.',
    'Super Obvious Secret: All other info in this page is static...',
  ]

  changeFact = (factOutputRef: HTMLParagraphElement) => {

    let rand = this.getRandom(this.facts.length);
    factOutputRef.innerText = this.facts[rand];
  }

  getRandom = (max: number) => {
    return Math.floor(Math.random() * max);
  }
}
