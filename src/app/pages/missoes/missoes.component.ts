import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-missoes',
  imports: [RouterLink],
  templateUrl: './missoes.component.html',
  styleUrl: './missoes.component.css'
})
export class MissoesComponent implements AfterViewInit {
  isSoundOn = true;
  private audio!: HTMLAudioElement;

  ngAfterViewInit() {
    this.audio = document.getElementById('musicaFundo') as HTMLAudioElement;
    this.toggleSound(this.isSoundOn);
  }

  toggleSound(enable: boolean) {
    this.isSoundOn = enable;
    if (this.audio) {
      if (enable) {
        this.audio.play().catch(e => console.log('Autoplay prevented:', e));
      } else {
        this.audio.pause();
      }
      this.audio.muted = !enable;
    }
  }
}