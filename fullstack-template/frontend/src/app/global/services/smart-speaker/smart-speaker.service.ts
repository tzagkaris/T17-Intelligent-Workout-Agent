/**
 * An angular service for smart speaker based on artyom.js
 *
 * In order to use it:
 *  - install artyom.js (npm i artyom.js)
 *  - add this file in src/app
 *
 *  Edited by: csd4279
 */
import { Injectable } from '@angular/core';

/* changed original import */
declare function require(name:string): any;
const Artyom = require('artyom.js/build/artyom.js')

@Injectable({
  providedIn: 'root'
})
export class SmartSpeakerService {

  private artyom: any;

  constructor() {
    this.artyom = new Artyom.default();
  }

  /**********************/

  private initializeArtyom() {
    this.artyom.fatality();

    setTimeout(() => {
      this.artyom.initialize({
        lang: 'en-GB',
        continuous: true,// Artyom will listen forever
        listen: true, // Start recognizing
        debug: false, // Show everything in the console
        speed: 1, // talk normally
        //name: 'Bot' //set a key phrase to say before each command
      }).then(function () {
        console.log('Smart Speaker is ready');
      });
    }, 250);

  }

  /**********************/

  /**
   * Speak the given text
   *
   * @param text
   * @param onSpeakEnded called when the speech ends
   */
  speak(text: string, onSpeakEnded?: () => any) {
    this.artyom.say(text, {
      onStart: () => {
        //in case you would like to run code when speak starts
      },
      onEnd: () => {
        if (onSpeakEnded)
          onSpeakEnded();
      }
    });
  }

  /**********************/

  /**
   * Set a command that you would like to be recognized
   *
   * @param text a phrase/word or multiple phrases/words to be recognized
   * @param onVoiceRecognition a callback that is triggered whenever the system recognizes the given text
   */
  addCommand(text: string[], func: any) {

    this.artyom.addCommands({indexes: text, action: func})
  }

  addSmartCommand(text: string[], func: any) {

    this.artyom.addCommands({indexes: text, smart: true, action: func})

  }

  commitCommands = () => {
    this.initializeArtyom();
  }

  /**********************/

}
