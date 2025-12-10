import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dasboard-medium',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dasboard-medium.html',
  styleUrl: './dasboard-medium.scss',
})
export class DasboardMedium implements OnInit {

  /* DATOS BASE */
  weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  monthNames = [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ];

  /* ESTADO DEL CALENDARIO */
  currentYear!: number;
  currentMonth!: number;
  selectedDate: Date | null = null;

  calendarCells: Array<{ day?: number; date?: Date } | null> = [];

  yearOptions: number[] = [];
  monthOptions = this.monthNames;

  /* INIT */
  ngOnInit(): void {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();

    // años (ej: 2020–2030)
    for (let y = this.currentYear - 5; y <= this.currentYear + 5; y++) {
      this.yearOptions.push(y);
    }

    this.generateCalendar();
  }

  /* LÓGICA CALENDARIO */
  generateCalendar(): void {
    this.calendarCells = [];

    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const startWeekDay = firstDay.getDay(); // 0 = Domingo

    const daysInMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();

    // espacios vacíos antes del día 1
    for (let i = 0; i < startWeekDay; i++) {
      this.calendarCells.push(null);
    }

    // días reales
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(this.currentYear, this.currentMonth, d);
      this.calendarCells.push({ day: d, date });
    }

    // completar filas
    while (this.calendarCells.length % 7 !== 0) {
      this.calendarCells.push(null);
    }
  }

  /* NAVEGACIÓN */
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

  /* SELECCIÓN */
  selectDay(cell: any): void {
    if (!cell || !cell.date) return;
    this.selectedDate = cell.date;
  }

  isSelected(cell: any): boolean {
    if (!cell || !cell.date || !this.selectedDate) return false;
    return cell.date.toDateString() === this.selectedDate.toDateString();
  }

  isToday(cell: any): boolean {
    if (!cell || !cell.date) return false;
    const today = new Date();
    return cell.date.toDateString() === today.toDateString();
  }
}
