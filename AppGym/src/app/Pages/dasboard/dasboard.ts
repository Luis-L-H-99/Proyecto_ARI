import { Component } from '@angular/core';
import { HeaderDasboard } from '../../Components/header-dasboard/header-dasboard';
import { DasboardUp } from '../../Components/dasboard-up/dasboard-up';
import { DasboardMedium } from '../../Components/dasboard-medium/dasboard-medium';
import { DasboardDown } from '../../Components/dasboard-down/dasboard-down';


@Component({
  selector: 'app-dasboard',
  imports: [HeaderDasboard, DasboardUp, DasboardMedium, DasboardDown],
  templateUrl: './dasboard.html',
  styleUrl: './dasboard.scss',
})
export class Dasboard {

}
