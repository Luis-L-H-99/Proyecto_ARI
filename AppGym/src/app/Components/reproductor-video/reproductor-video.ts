import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';
import { ListaVideoComponent } from '../lista-video/lista-video'; // Importar componente

@Component({
  selector: 'app-reproductor-video',
  standalone: true,
  imports: [CommonModule, FormsModule, ListaVideoComponent], // Agregar ListaVideoComponent
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
  // Variable para controlar visibilidad del menú lateral
  isMenuOpen: boolean = false; // Controla si el menú lateral está abierto

  /* ABRIR / CERRAR MENÚ LATERAL */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    // Pausar video cuando se abre el menú para mejor experiencia de usuario
    if (this.isMenuOpen && this.isPlaying) {
      this.togglePlay();
    }
  }

  /* PLAY / PAUSE Se ejecuta al hacer click en el video o botones */
  togglePlay() {
  const video = this.videoRef.nativeElement;

  if (video.paused) {
    video.play();
    this.isPlaying = true;

    if (!this.hasStarted) {
      this.hasStarted = true;
    }
  } else {
    video.pause();
    this.isPlaying = false;
  }
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

  /* FORMATO DE TIEMPO hh:mm:ss */
formatTime(seconds: number): string {
  if (isNaN(seconds)) return '00:00:00';

  const hrs = Math.floor(seconds / 3600);
  const min = Math.floor((seconds % 3600) / 60);
  const sec = Math.floor(seconds % 60);

  const h = hrs.toString().padStart(2, '0');
  const m = min.toString().padStart(2, '0');
  const s = sec.toString().padStart(2, '0');

  return `${h}:${m}:${s}`;
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