import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';

@Component({
  selector: 'app-login-up',
  imports: [ CommonModule ],
  templateUrl: './login-up.html',
  styleUrl: './login-up.scss',
})
export class LoginUp {
  customFonts = CustomFonts
  getFont = getFont
}
