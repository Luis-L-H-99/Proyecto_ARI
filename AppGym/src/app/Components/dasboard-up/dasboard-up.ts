import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';
import { UserService } from '../../Services/UserService';
import { UserInterface } from '../../../interfaces/UserInterface';

@Component({
  selector: 'app-dasboard-up',
  imports: [ CommonModule ],
  templateUrl: './dasboard-up.html',
  styleUrl: './dasboard-up.scss',
})
export class DasboardUp {
  customFonts = CustomFonts
  getFont = getFont

  userActual: UserInterface | null = null;
  frecuenciaCardiaca = 0;
  oxigenacion = 0;
  trofeos = 0;
  caloriasQuemadas = 0;
  rutinaNombre = 'Sin Rutina'
  constructor(private userService: UserService) {}
  ngOnInit(): void{
    //Obtener el usuario que inicio sesion
    this.userActual = this.userService.usuarioActual;
    if (!this.userActual) return;
    //Calculo aleatorio para las tarjetas
    this.frecuenciaCardiaca = this.random(60, 100);
    this.oxigenacion = this.random(95, 100);
    this.trofeos = this.random(0, 1000);
    this.caloriasQuemadas = this.random(120, 600);
    //Verificar si el usuario tiene una rutina
    if (this.userActual?.rutinaActiva) {
      this.rutinaNombre = this.userActual?.rutinaActiva?.nombreLista??'Sin Rutina';
    } else {
      this.rutinaNombre = 'Sin Rutina'
    }
  }
  // Genera los valores aleatorios dentro del rango que se especifico para cada tarjeta
  random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}