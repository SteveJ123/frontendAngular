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
  @Input() language: string = "english";

  @Output() backToCalendar = new EventEmitter<void>();

  tasks: any[] = [];
  loading: boolean = false;
  recordId: any = "";
  ngOnInit() {
    this.fetchTasksForDate();
  }

  fetchTasksForDate() {
    this.loading = true;
    this.routineService
      .getRoutinesByDate(this.userId, this.selectedDate, this.language)
      .subscribe({
        next: (data: any) => {
          // this.tasks = data.routines;
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
      taskIndex: i,
      isCompleted: updatedStatus,
    };
    this.routineService
      .toggleRoutineCompletion(this.recordId, payload)
      .subscribe({
        next: () => {
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
