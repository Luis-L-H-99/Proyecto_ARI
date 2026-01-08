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
  // Variable que indica si el usuario actual tiene un plan activo //
  // Se usa en el HTML para mostrar u ocultar componentes //
  tienePlan: boolean = false;
  // Se inyecta el UserService para acceder al usuario actual //
  constructor(private userService: UserService) { }
  // ngDoCheck se ejecuta constantemente y permite detectar cambios //
  // en el usuario actual para actualizar la vista de forma reactiva //
  ngDoCheck(): void {
    // Obtener el usuario actual desde el servicio //
    const usuario = this.userService.usuarioActual;
    // Si el usuario tiene plan activo, se establece la bandera en true //
    // Esto permite mostrar el dashboard completo en lugar de la membresía //
    this.tienePlan = !!usuario?.planActivo;
  }
}
