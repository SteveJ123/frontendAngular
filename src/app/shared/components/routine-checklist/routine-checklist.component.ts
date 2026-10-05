import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  inject,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Service } from "../../../shared/services/service";
import { Router } from "@angular/router";

@Component({
  selector: "app-routine-checklist",
  standalone: true,
  imports: [CommonModule],
  styleUrl: "./routine-checklist.component.css",
  templateUrl: "./routine-checklist.component.html",
  host: {
    class: "w-full block px-4",
  },
})
export class RoutineChecklistComponent {
  private routineService = inject(Service);
  private cd = inject(ChangeDetectorRef);

  @Input() userId!: number;
  @Input() selectedDate!: string;
  @Input() language: string = "";

  @Output() backToCalendar = new EventEmitter<void>();

  tasks: any[] = [];
  loading: boolean = false;
  recordId: any = "";
  private router = inject(Router);


  // Helper function to extract YYYY-MM-DD in IST timezone

  get currentRouteLanguage(): string {
    const urlSegments = this.router.url.split("/").filter(Boolean);
    return urlSegments[0] === "te" ? "Telugu" : "English";
  }

  ngOnInit() {
    this.fetchTasksForDate();
  }

//   getISTDateString(dateInput:any) {
//   const d = dateInput ? new Date(dateInput) : new Date();
//   const formatter = new Intl.DateTimeFormat("en-CA", {
//     timeZone: "Asia/Kolkata",
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   });
//   return formatter.format(d); // Returns "YYYY-MM-DD"
// }

getISTDateString(dateInput: any): string {
  if (!dateInput) return "";

  // If already a "YYYY-MM-DD" string, return directly to prevent UTC shift
  if (typeof dateInput === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    return dateInput;
  }

  const d = new Date(dateInput);

  // Extract local date components directly if it's a JS Date object from calendar picker
  if (dateInput instanceof Date && !isNaN(d.getTime())) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(d);
}

  fetchTasksForDate() {
    this.loading = true;
    let updatedDate = this.getISTDateString(this.selectedDate)
    this.routineService
      .getRoutinesByDate(this.userId, updatedDate, this.language)
      .subscribe({
        next: (data: any) => {
          // this.tasks = data.routines;
          console.log("data", data)
          this.recordId = data.id;
          let parsedRoutines = data.routines;

          // Check if routines is a string (due to backslashes) and parse it
          if (typeof parsedRoutines === "string") {
            try {
              parsedRoutines = JSON.parse(parsedRoutines);
            } catch (e) {
              console.error("Failed to parse routines string:", e);
              parsedRoutines = [];
            }
          }

          this.tasks = parsedRoutines;
          console.log("this.tasks", this.tasks)
          this.loading = false;
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error("Error fetching tasks for date:", err);
          this.loading = false;
          this.cd.detectChanges();
        },
      });
  }

  toggleComplete(task: any, i: any) {
    const updatedStatus = !task.isCompleted;
    // this.recordId = task.id;
    let payload = {
      taskIndex: Number(i),
      isCompleted: updatedStatus,
    };
    this.routineService
      .toggleRoutineCompletion(this.recordId, payload)
      .subscribe({
        next: (data) => {
          console.log("update list data", data);
          task.isCompleted = updatedStatus;
          this.cd.detectChanges();
        },
        error: (err) => console.error("Error toggling completion:", err),
      });
  }

  onBack() {
    this.backToCalendar.emit();
  }
}
