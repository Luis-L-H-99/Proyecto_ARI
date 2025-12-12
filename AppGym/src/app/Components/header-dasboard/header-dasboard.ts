import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';


@Component({
  selector: 'app-header-dasboard',
  imports: [CommonModule],
  templateUrl: './header-dasboard.html',
  styleUrl: './header-dasboard.scss',
})
export class HeaderDasboard {
  CustomFonts = CustomFonts
  getFont = getFont
}
