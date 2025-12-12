import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';

@Component({
  selector: 'app-dasboard-down',
  imports: [CommonModule],
  templateUrl: './dasboard-down.html',
  styleUrl: './dasboard-down.scss',
})
export class DasboardDown {
  CustomFonts = CustomFonts
  getFont=getFont

 videos = [
    {
      title : 'Quema grasa',
      img: '/assets/images/dashboard/Grupo 40.png',
    },
    {
      title: 'Full Body',
      img: '/assets/images/dashboard/Grupo 41.png',
    },
    {
      title: 'Fuerza y Resistencia',
      img: '/assets/images/dashboard/Grupo 42.png',
    },
    {
      title: 'Cardio Power 30',
      img: '/assets/images/dashboard/Grupo 43.png',
    },
  ];
}
