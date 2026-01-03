import { Component, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderDasboard } from '../../Components/header-dasboard/header-dasboard';
import { DasboardUp } from '../../Components/dasboard-up/dasboard-up';
import { DasboardMedium } from '../../Components/dasboard-medium/dasboard-medium';
import { DasboardDown } from '../../Components/dasboard-down/dasboard-down';
import { MembresiaComponent } from '../../Components/membresia/membresia.component';
import { UserService } from '../../Services/UserService';

@Component({
  selector: 'app-dasboard',
  standalone: true,
  imports: [
    CommonModule,
    HeaderDasboard,
    DasboardUp,
    DasboardMedium,
    DasboardDown,
    MembresiaComponent
  ],
  templateUrl: './dasboard.html',
  styleUrl: './dasboard.scss',
})
export class Dasboard implements DoCheck {

  tienePlan: boolean = false;

  constructor(private userService: UserService) {}

  ngDoCheck(): void {
    const usuario = this.userService.usuarioActual;
    this.tienePlan = !!usuario?.planActivo;
  }
}
