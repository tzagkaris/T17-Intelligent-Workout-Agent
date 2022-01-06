import { Injectable } from "@angular/core";
import { SocketsService } from "..";
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
    private exercise: ExerciseStateService,
    private sock: SocketsService) {}

    /* add all commands that assistant will recognice */
    init = () => {
      this.speaker.speak('Voice Assistant is activated.');

      /*  workout */

      this.speaker.addCommand(["please start workout", "please workout"],
        this.startWorkout
      )

      this.speaker.addCommand(["please end workout", "please abort workout"],
        this.abortWorkout
      )

      this.speaker.addCommand(["please workout pause", "please wait"],
        this.pauseWorkout
      )

      this.speaker.addSmartCommand(["please lower reps to *"],
        this.onLowerReps
      )

      this.speaker.addSmartCommand(["please raise reps to *"],
      this.onRaiseReps
    )

    this.speaker.addSmartCommand(["please decreace time to *"],
      this.onLowerTime
    )

    this.speaker.addSmartCommand(["please increase time to *"],
      this.onRaiseTime
    )

    this.speaker.addSmartCommand(["please select video *"],
      this.onMediaSelection
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

    /* send a req to broadcast to center-wall and navigate to on-workout */
    startWorkout = () => {
      //console.log('on start workout');
      this.exercise.startWorkout().subscribe();
    }

    /* send a req to broadcast to on-workout to quickly abort the workout */
    abortWorkout = () => {
      //console.log('on abort workout');
      this.exercise.endWorkout().subscribe();
    }

    /* send a req to broadcast to on-workout to stop ongoing timer and heart rate monitor */
    pauseWorkout = () => {
      //console.log('on pause workout);
      this.exercise.pauseWorkout().subscribe();
    }

    /* TO DO: send a req to broadcast to on-workout to modify the reps */
    onLowerReps = (i, wildcard) => {
      /* this function will not run anything other that confirmation or invalidation*/
      /* wildcard is unexpected */
      /* will manualy trigger code from /deb */
    }

    /* TO DO: send a req to broadcast to on-workout to modify the reps */
    onRaiseReps = (i, wildcard) => {
      /* this function will not run anything other that confirmation or invalidation*/
      /* wildcard is unexpected */
      /* will manualy trigger code from /deb */
    }

    /* TO DO: send a req to broadcast to on-workout to modify the time */
    onLowerTime = (i, wildcard) => {
      /* this function will not run anything other that confirmation or invalidation*/
      /* wildcard is unexpected */
      /* will manualy trigger code from /deb */
    }

    /* TO DO: send a req to broadcast to on-workout to modify the time */
    onRaiseTime = (i, wildcard) => {
      /* this function will not run anything other that confirmation or invalidation*/
      /* wildcard is unexpected */
      /* will manualy trigger code from /deb */
    }

    /* TO DO: send a req to broadcast to on-workout to modify the secondary media  */
    onMediaSelection = (i, wildcard) => {
      /* this function will not run anything other that confirmation or invalidation*/
      /* wildcard is unexpected */
      /* will manualy trigger code from /deb */
    }

    onPlay = () => {
      /* play a confirmation sound */
      this.speaker.speak(this.getRandomPhrase(0));
      this.media.setMusicPlaying().subscribe();
      //console.log('on play')
    }

    onPause = () => {

      this.speaker.speak(this.getRandomPhrase(0));
      this.media.setMusicPaused().subscribe();
      //console.log('on pause')
    }

    onNextTrack = () => {

      this.speaker.speak(this.getRandomPhrase(0));
      this.media.nextTrack().subscribe();
      //console.log('on next track')
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
