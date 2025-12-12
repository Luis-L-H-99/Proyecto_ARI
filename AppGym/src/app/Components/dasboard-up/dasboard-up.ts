import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';

@Component({
  selector: 'app-dasboard-up',
  imports: [ CommonModule ],
  templateUrl: './dasboard-up.html',
  styleUrl: './dasboard-up.scss',
})
export class DasboardUp {
  customFonts = CustomFonts
  getFont = getFont
}