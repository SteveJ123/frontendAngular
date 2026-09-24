import { ChangeDetectorRef, Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns"; // 1. Import adapterFactory
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
import { forkJoin } from "rxjs";
import { ToastService } from "../../services/toast.service";

@Component({
  selector: "app-admin-daily-routine",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    CalendarMonthViewComponent,
    CalendarPreviousViewDirective,
    CalendarTodayDirective,
    CalendarNextViewDirective,
  ],
  providers: [
    // 2. Provide DateAdapter required by angular-calendar
    {
      provide: DateAdapter,
      useFactory: adapterFactory,
    },
    CalendarUtils,
    CalendarA11y,
    CalendarDateFormatter,
  ],
  styleUrl: "./admin-daily-routine.component.css",
  templateUrl: "./admin-daily-routine.component.html",
  host: {
    class: "w-full block px-4",
  },
})
export class AdminDailyRoutineComponent {
  private routineService = inject(Service);
  private cd = inject(ChangeDetectorRef);
  private toastService = inject(ToastService);

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  events: CalendarEvent[] = [];

  selectedUserId: number = 1;
  selectedLanguage: "english" | "telugu" = "english";
  selectedDate: string = ""; // "YYYY-MM-DD"
  dayRoutines: any[] = [];

  showModal = false;
  routineText: string = ""; // Single textarea content
  recordId: any = "";
  ngOnInit() {
    this.loadMonthlyRoutines();
  }

  // Helper method to convert JS Date to IST Date string (YYYY-MM-DD)
  private getISTDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Helper method to convert IST "YYYY-MM-DD" string into local Date object for angular-calendar
  private parseISTDate(dateStr: string): Date {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  loadMonthlyRoutines() {
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth() + 1;

    this.routineService
      .getMonthlyRoutines(
        this.selectedUserId,
        year,
        month,
        this.selectedLanguage,
      )
      .subscribe((routines) => {
        this.events = routines.map((r) => ({
          start: this.parseISTDate(r.date),
          title: `${r.time}`,
        }));
      });
    this.cd.detectChanges();
  }

  // When a day on the calendar is clicked
  onDayClicked({ date }: { date: Date }): void {
    this.selectedDate = this.getISTDateString(date);
    console.log("this.selectedDate", this.selectedDate);
    this.fetchDayRoutines();
    this.showModal = true;
  }

  fetchDayRoutines() {
    this.routineService
      .getRoutinesByDate(
        this.selectedUserId,
        this.selectedDate,
        this.selectedLanguage,
      )
      .subscribe((data: any) => {
        console.log("data routine", data);
        this.recordId = data.id; // Parent record ID (e.g., 4)
        // this.dayRoutines = data;
        let parsedRoutines = data?.routines;

        // Check if routines is a string (due to backslashes) and parse it
        if (typeof parsedRoutines === "string") {
          try {
            parsedRoutines = JSON.parse(parsedRoutines);
          } catch (e) {
            console.error("Failed to parse routines string:", e);
            parsedRoutines = [];
          }
        }

        // Now parsedRoutines is a clean JavaScript Array of Objects:
        // [{ time: '6-7 am', task: 'task1', isCompleted: false }, ...]
        this.dayRoutines = parsedRoutines;
        this.populateTextareaFromRoutines(this.dayRoutines);
        this.cd.detectChanges();
      });
  }

  // Populate textarea with time on line 1, task on line 2
  populateTextareaFromRoutines(routines: any[]) {
    this.routineText = routines
      .map((item) => `${item.time}\n${item.task}`)
      .join("\n");
    this.cd.detectChanges();
  }

  // On click of "Edit", load existing tasks into the textarea for modification
  editDayRoutines() {
    this.populateTextareaFromRoutines(this.dayRoutines);
    this.toastService.success("Routine edited successfully!");
    this.cd.detectChanges();
  }

  saveAllRoutines() {
    if (!this.routineText.trim()) return;

    // Split text into lines, trimming extra whitespace
    const lines = this.routineText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const routinesArray: { time: string; task: string }[] = [];

    // Pair line i (time) and line i+1 (task)
    for (let i = 0; i < lines.length; i += 2) {
      const time = lines[i];
      const task = lines[i + 1];

      if (time && task) {
        routinesArray.push({ time, task });
      }
    }

    if (routinesArray.length > 0) {
      const payload = {
        userId: this.selectedUserId,
        language: this.selectedLanguage,
        date: this.selectedDate,
        routines: routinesArray,
      };

      this.routineService.createRoutine(payload).subscribe({
        next: () => {
          this.fetchDayRoutines();
          this.loadMonthlyRoutines();
          this.closeModal();
          this.toastService.success("Routine added successfully!");
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error("Error saving routines:", err);
          this.closeModal();
          this.toastService.error("Routine not added successfully!");
        },
      });
    }
  }

  deleteRoutine(id?: any) {
    if (!id) return;
    this.routineService.deleteRoutine(this.recordId, id).subscribe(() => {
      this.fetchDayRoutines();
      this.loadMonthlyRoutines();
      this.toastService.success("Routine deleted successfully!");
      this.cd.detectChanges();
    });
  }

  closeModal() {
    this.showModal = false;
    this.routineText = "";
    this.cd.detectChanges();
  }
}
