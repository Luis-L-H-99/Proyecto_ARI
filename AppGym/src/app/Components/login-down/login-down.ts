import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';

@Component({
  selector: 'app-login-down',
  imports: [ CommonModule ],
  templateUrl: './login-down.html',
  styleUrl: './login-down.scss',
})
export class LoginDown {
  customFonts = CustomFonts
  getFont = getFont
}
