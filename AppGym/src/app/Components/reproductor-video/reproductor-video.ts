import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';

@Component({
  selector: 'app-reproductor-video',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reproductor-video.html',
  styleUrl: './reproductor-video.scss',
})
export class ReproductorVideo {

  /* REFERENCIA AL ELEMENTO <video> */
  @ViewChild('video', { static: false })
  videoRef!: ElementRef<HTMLVideoElement>;

   /* fuente de letra */
  customFonts = CustomFonts;
  getFont = getFont;

 /* ESTADO DEL REPRODUCTOR */
  isPlaying = false;      // Indica si el video está reproduciéndose
  hasStarted = false;     // Indica si el video ya ha comenzado alguna vez
  currentTime = 0;        // Tiempo actual del video
  duration = 0;           // Duración total del video
  controlsVisible = false; // Estado de visibilidad de los controles
  controlsTimeout!: ReturnType<typeof setTimeout>; // Referencia al temporizador para ocultar controles

  /* PLAY / PAUSE Se ejecuta al hacer click en el video o botones */
  togglePlay() {
  const video = this.videoRef.nativeElement;

  if (video.paused) {
    video.play();
    this.isPlaying = true;

    if (!this.hasStarted) {
      this.hasStarted = true;
    }

    this.showControls();
  } else {
    video.pause();
    this.isPlaying = false;
    this.showControls();
  }
}

  /* Muestra los controles y los oculta después de 4 segundos */
  showControls() {
  this.controlsVisible = true;
  clearTimeout(this.controlsTimeout);
  this.controlsTimeout = setTimeout(() => {
    this.controlsVisible = false;
  }, 4000);
}

  /* ACTUALIZA EL TIEMPO ACTUAL */
  updateTime() {
  const video = this.videoRef.nativeElement;
  this.currentTime = video.currentTime;
  this.duration = video.duration;
}

  /* OBTIENE LA DURACIÓN TOTAL DEL VIDEO */
  setDuration() {
  const video = this.videoRef.nativeElement;
  this.duration = isNaN(video.duration) ? 0 : video.duration;
}

  /* ADELANTAR / RETROCEDER SEGUNDOS */
  skip(seconds: number) {
    const video = this.videoRef.nativeElement;
    video.currentTime = Math.min(
      Math.max(video.currentTime + seconds, 0),
      this.duration
    );
  }

  /* MOVER VIDEO DESDE LA BARRA DE PROGRESO */
  seekVideo() {
    this.videoRef.nativeElement.currentTime = this.currentTime;
  }

  /* PANTALLA COMPLETA */
  toggleFullscreen() {
    const video = this.videoRef.nativeElement;
    if (!document.fullscreenElement) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  /* TIEMPO RESTANTE (GETTER) */
  get remainingTime(): string {
  if (!this.duration) return '0:00';
  return this.formatTime(this.duration - this.currentTime);
}

  /* FORMATO DE TIEMPO mm:ss */
  formatTime(seconds: number): string {
    if (isNaN(seconds)) return '0:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }

  /* TERMINAR VIDEO */
  endVideo() {
    const video = this.videoRef.nativeElement;
    video.pause();
    video.currentTime = 0;
    this.isPlaying = false;
    alert('Video terminado');
  }
}
