import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';
import { UserService } from '../../Services/UserService';
import { MetodoPagoInterface } from '../../../interfaces/MetodoPagoInterface';

@Component({
  selector: 'app-membresia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.scss']
})
export class MembresiaComponent {

  CustomFonts = CustomFonts;
  getFont = getFont;

  selectedPlan: string | null = null;

  constructor(private userService: UserService) {}

  plans = [
    {
      id: 'fitstart',
      name: 'Plan FitStart',
      description: 'Ideal para usuarios principiantes que quieren iniciar una vida activa. Incluye acceso a rutinas básicas, medición de oxigenación semanal y visualización del ranking general de ejercicios.',
      price: 199
    },
    {
      id: 'powerplus',
      name: 'Plan PowerPlus',
      description: 'Pensado para personas que ya entrenan de manera regular. Incluye rutinas personalizadas por objetivo, monitoreo avanzado de oxigenación, historial de progreso y ranking por categoría (fuerza, cardio, resistencia).',
      price: 349
    },
    {
      id: 'eliteathlete',
      name: 'Plan EliteAthlete',
      description: 'La experiencia completa. Acceso a rutinas avanzadas exclusivas, oxigenación en tiempo real, rankings dinámicos, recomendaciones inteligentes según desempeño y sistema de logros gamificado.',
      price: 499
    }
  ];

  formData = {
    name: '',
    cardNumber: '',
    expiration: '',
    cvv: ''
  };

  selectPlan(planId: string) {
    this.selectedPlan = planId;
  }

  cancel() {
    this.selectedPlan = null;
    this.formData = { name: '', cardNumber: '', expiration: '', cvv: '' };
  }

  // VALIDACIONES
  isNameValid(name: string): boolean {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name.trim());
  }

  isCardNumberValid(card: string): boolean {
    return /^\d{16}$/.test(card);
  }

  isExpirationValid(exp: string): boolean {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp);
  }

  isCvvValid(cvv: string): boolean {
    return /^\d{3}$/.test(cvv);
  }

  onCardInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 16);
    this.formData.cardNumber = input.value;
  }

  onExpirationInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 3) value = value.slice(0, 2) + '/' + value.slice(2);
    input.value = value;
    this.formData.expiration = value;
  }

  onCvvInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 3);
    this.formData.cvv = input.value;
  }

  pay() {
    const { name, cardNumber, expiration, cvv } = this.formData;

    if (!name || !cardNumber || !expiration || !cvv) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (!this.isNameValid(name) ||
        !this.isCardNumberValid(cardNumber) ||
        !this.isExpirationValid(expiration) ||
        !this.isCvvValid(cvv)) {
      alert('Datos de pago inválidos');
      return;
    }

    const usuario = this.userService.usuarioActual;
    if (!usuario) return;

    const plan = this.plans.find(p => p.id === this.selectedPlan);

    usuario.metodoPago = {
      nombreTarjeta: name,
      numeroTarjeta: cardNumber,
      fechaExpiracion: expiration,
      cvv
    } as MetodoPagoInterface;

    usuario.planActivo = true;
    usuario.fechaCompraPlan = new Date();
    usuario.fechaExpiracionPlan = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    usuario.planAsociado = plan as any;
  }
}
