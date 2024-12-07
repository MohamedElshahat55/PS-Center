import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  template: `<div
    class="text-center p-1 bg-blue-500 rounded-full text-white text-sm mt-3"
  >
    {{ hours }} hour : {{ minutes }} min : {{ seconds }} sec
  </div> `,
})
export class TimerComponent {
  @Input() startTime: number = 0; // The start time input
  elapsedTime: number = 0; // Elapsed time in seconds
  timerInterval: any; // Store the interval reference

  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  ngOnInit() {
    // Calculate the initial elapsed time when the component loads
    const timerStartTime = Date.now() - this.startTime;
    this.elapsedTime = timerStartTime / 1000; // in seconds

    // Update the timer every second
    this.timerInterval = setInterval(() => {
      this.elapsedTime += 1; // Increment elapsed time by 1 second
      this.updateTime(); // Update hours, minutes, and seconds
    }, 1000);
  }

  ngOnDestroy() {
    // Cleanup the interval when the component is destroyed
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  // Update the hours, minutes, and seconds based on elapsedTime
  updateTime() {
    this.hours = Math.floor(this.elapsedTime / 3600);
    this.minutes = Math.floor((this.elapsedTime % 3600) / 60);
    this.seconds = Math.floor(this.elapsedTime % 60);
  }
}
