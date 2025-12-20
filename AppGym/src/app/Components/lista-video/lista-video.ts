import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';

@Component({
  selector: 'app-lista-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-video.html',
  styleUrls: ['./lista-video.scss'],
})

export class ListaVideoComponent {
  CustomFonts = CustomFonts
  getFont = getFont
  videos = [
    { id: 1, title: 'Video 1 - Quema grasa', active: true },
    { id: 2, title: 'Video 2 - Quema grasa', active: false },
    { id: 3, title: 'Video 3 - Quema grasa', active: false },
    { id: 4, title: 'Video 4 - Quema grasa', active: false },
    { id: 5, title: 'Video 5 - Quema grasa', active: false },
    { id: 6, title: 'Video 6 - Quema grasa', active: false },
    { id: 7, title: 'Video 7 - Quema grasa', active: false },
    { id: 8, title: 'Video 8 - Quema grasa', active: false },
    { id: 9, title: 'Video 9 - Quema grasa', active: false }
  ];

  seleccionarVideo(id: number): void {
    this.videos.forEach(video => {
      video.active = video.id === id;
    });

    console.log('Video seleccionado:', id);
  }

}

