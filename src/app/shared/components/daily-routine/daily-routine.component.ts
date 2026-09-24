import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import {
  CalendarModule,
  CalendarMonthViewComponent,
  CalendarPreviousViewDirective,
  CalendarTodayDirective,
  CalendarNextViewDirective,
  CalendarEvent,
  CalendarView,
  DateAdapter,
  CalendarUtils,
  CalendarA11y,
  CalendarDateFormatter,
} from "angular-calendar";
import { Service } from "../../../shared/services/service";
import { RoutineChecklistComponent } from "../../components/routine-checklist/routine-checklist.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-daily-routine",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    CalendarMonthViewComponent,
    CalendarPreviousViewDirective,
    CalendarTodayDirective,
    CalendarNextViewDirective,
    RoutineChecklistComponent,
  ],
  providers: [
    { provide: DateAdapter, useFactory: adapterFactory },
    CalendarUtils,
    CalendarA11y,
    CalendarDateFormatter,
  ],
  styleUrl: "./daily-routine.component.css",
  templateUrl: "./daily-routine.component.html",
  host: {
    class: "w-full block px-4",
  },
})
export class DailyRoutineComponent {
  private routineService = inject(Service);

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  events: CalendarEvent[] = [];

  userId: number = 1; // Logged-in user ID
  selectedLanguage = "";
  selectedDate: string = "";

  // Mode flag: false = Calendar View, true = Checklist View
  showChecklistView: boolean = false;

  private router = inject(Router);

  get currentRouteLanguage(): string {
    const urlSegments = this.router.url.split("/").filter(Boolean);
    return urlSegments[0] === "te" ? "Telugu" : "English";
  }

  ngOnInit() {
    this.selectedDate = this.getISTDateString(new Date());
    this.selectedLanguage = this.currentRouteLanguage.toLowerCase();
    this.loadMonthlyRoutines();
  }

  // Convert Date object to IST YYYY-MM-DD
  private getISTDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  private parseISTDate(dateStr: string): Date {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  loadMonthlyRoutines() {
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth() + 1;

    this.routineService
      .getMonthlyRoutines(this.userId, year, month, this.selectedLanguage)
      .subscribe({
        next: (routines) => {
          this.events = routines.map((r) => ({
            start: this.parseISTDate(r.date),
            title: `${r.time} - ${r.task}`,
            meta: r,
          }));
        },
        error: (err) => console.error("Error fetching monthly routines:", err),
      });
  }

  // Triggered when clicking a specific date on the calendar
  onDayClicked({ date }: { date: Date }): void {
    this.selectedDate = this.getISTDateString(date);
    this.showChecklistView = true; // Switch to checklist component
  }

  // Return to Calendar view from Checklist component
  goBackToCalendar() {
    this.showChecklistView = false;
    this.loadMonthlyRoutines(); // Refresh monthly badges/events
  }
}
