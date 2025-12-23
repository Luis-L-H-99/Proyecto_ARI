import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';
import { AsistenciasInterface } from '../../../interfaces/AsistenciasInterface';
/* INTERFAZ PARA USUARIOS DEL RANKING */
interface RankingUser {
  position: number;
  name: string;
  trophies: number;
}
/* INTERFAZ PARA CELDAS DEL CALENDARIO */
interface CalendarCell {
  day?: number;
  date?: Date;
}
@Component({
  /* SELECTOR DEL COMPONENTE */
  selector: 'app-dasboard-medium',

  /* COMPONENTE STANDALONE */
  standalone: true,

  /* MODULOS UTILIZADOS */
  imports: [CommonModule, FormsModule],

  /* ARCHIVOS DEL COMPONENTE */
  templateUrl: './dasboard-medium.html',
  styleUrl: './dasboard-medium.scss',
})
export class DasboardMedium implements OnInit {

  /* FUENTES PERSONALIZADAS */
  customFonts = CustomFonts;
  getFont = getFont;

  // asi se van a poner se debe de poner de acuerdo con la persona que guardara los datos en el reproductor por que el 
  // mes debe de ser uno antes del actual si es diciembre se debe de guardar 11 y si es enero 0
  // 0 → Enero
  // 11 → Diciembre
  asistencias: AsistenciasInterface[] = [
  {
    fechaAsistencia: new Date(2025, 11, 21),
    dia: 21,
    mes: 11,
    anio: 2025,
    tiempoCronometroSegundos: 25
  },
  {
    fechaAsistencia: new Date(2025, 11, 20),
    dia: 20,
    mes: 11,
    anio: 2025,
    tiempoCronometroSegundos: 10
  },
  {
    fechaAsistencia: new Date(2025, 11, 22),
    dia: 22,
    mes: 11,
    anio: 2025,
    tiempoCronometroSegundos: 10
  },
  {
    fechaAsistencia: new Date(2025, 11, 23),
    dia: 23,
    mes: 11,
    anio: 2025,
    tiempoCronometroSegundos: 10
  }
];
  /* RANKING DE USUARIOS */
  rankingUsers: RankingUser[] = [
    { position: 1, name: 'Jorge Armando', trophies: 200 },
    { position: 2, name: 'Jorge Armando', trophies: 150 },
    { position: 3, name: 'Jorge Armando', trophies: 100 },
    { position: 4, name: 'Jorge Armando', trophies: 80 },
    { position: 5, name: 'Jorge Armando', trophies: 50 },
  ];
  /* DATOS BASE DEL CALENDARIO */
  weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  /* ESTADO DEL CALENDARIO */
  currentYear!: number;
  currentMonth!: number;
  selectedDate: Date | null = null;

  calendarCells: Array<CalendarCell | null> = [];

  yearOptions: number[] = [];
  monthOptions = this.monthNames;

  /* INIT DEL COMPONENTE */
  ngOnInit(): void {
    const today = new Date();

    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();

    /* GENERAR LISTA DE AÑOS */
    for (let y = this.currentYear - 5; y <= this.currentYear + 5; y++) {
      this.yearOptions.push(y);
    }

    this.generateCalendar();
  }

  /* LOGICA DEL CALENDARIO */
  generateCalendar(): void {
    this.calendarCells = [];

    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const startWeekDay = firstDay.getDay();

    const daysInMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();

    /* ESPACIOS VACIOS */
    for (let i = 0; i < startWeekDay; i++) {
      this.calendarCells.push(null);
    }

    /* DIAS DEL MES */
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(this.currentYear, this.currentMonth, d);
      this.calendarCells.push({ day: d, date });
    }

    /* COMPLETAR SEMANAS */
    while (this.calendarCells.length % 7 !== 0) {
      this.calendarCells.push(null);
    }
  }

  /* NAVEGACION */
  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  /* SELECCION DE DIAS */
  selectDay(cell: CalendarCell | null): void {
    if (!cell || !cell.date) return;
    this.selectedDate = cell.date;
  }

  isSelected(cell: CalendarCell | null): boolean {
    if (!cell || !cell.date || !this.selectedDate) return false;
    return cell.date.toDateString() === this.selectedDate.toDateString();
  }

  isToday(cell: CalendarCell | null): boolean {
    if (!cell || !cell.date) return false;
    const today = new Date();
    return cell.date.toDateString() === today.toDateString();
  }
// Función para saber si un día tiene asistencia
  hasAttendance(cell: CalendarCell | null): boolean {
  if (!cell || !cell.date) return false;

  return this.asistencias.some(asistencia =>
    asistencia.tiempoCronometroSegundos !== 0 &&
    asistencia.fechaAsistencia!.toDateString() === cell.date!.toDateString()
  );
}

}