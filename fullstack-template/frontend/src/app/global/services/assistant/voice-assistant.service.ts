import { Injectable } from "@angular/core";
import { ExerciseStateService } from "../exercise-state/exercise-state.service";
import { MediaService } from "../media/media.service";
import { SmartSpeakerService } from "../smart-speaker/smart-speaker.service";

@Injectable({
  providedIn: 'root'
})
export class VoiceAssistantService {

  constructor(
    private speaker: SmartSpeakerService,
    private media: MediaService,
    private exercise: ExerciseStateService) {}

    /* add all commands that assistant will recognice */
    init = () => {
      this.speaker.speak('Voice Assistant is activated.');

      this.speaker.addCommand(["please start workout", "please workout"],
        this.startWorkout
      )

      /* music */

      this.speaker.addCommand(["please play music", "please music"],
        this.onPlay
      )

      this.speaker.addCommand(["please pause music", "please pause"],
        this.onPause
      )

      this.speaker.addCommand(["please next track", "please skip track", "please next music"],
        this.onNextTrack
      )

      this.speaker.commitCommands();
    }

    startWorkout = () => {
      
    }

    onPlay = () => {
      /* play a confirmation sound */
      this.speaker.speak(this.getRandomPhrase(0));
      this.media.setMusicPlaying().subscribe();
    }

    onPause = () => {

      this.speaker.speak(this.getRandomPhrase(0));
      this.media.setMusicPaused().subscribe();
    }

    onNextTrack = () => {

      this.speaker.speak(this.getRandomPhrase(0));
      this.media.nextTrack().subscribe();
    }



    /**
     * 0 - confirmation sound.
     * 1 - event faiure sound.
     */
    phrases: string[][] = [
      ['Got It', 'Okay', 'Roger That', 'Done'],
      ['']
    ]

    getRandomPhrase = (type: number) => {

      let len = this.phrases[type].length;
      let entry = this.generateBounded(0, len);

      return this.phrases[type][entry];
    }

    generateBounded = (min: number, max: number) => {
      return Math.floor( Math.random() * (max - min) + min )
    }
}
