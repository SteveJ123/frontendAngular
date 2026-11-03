import { ChangeDetectorRef, Component, inject, Input } from "@angular/core";
import { Service } from "../shared/services/service";
import { AuthService } from "../shared/services/AuthService";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  imports: [CommonModule, FormsModule],
  selector: "app-leaderboard",
  styleUrl: "./leaderboard.component.css",
  templateUrl: "./leaderboard.component.html",
  host: {
    class: "w-full block px-4",
  },
})
export class LeaderboardComponent {
  private service = inject(Service);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cd = inject(ChangeDetectorRef);

  get currentRouteLanguage(): string {
    const urlSegments = this.router.url.split("/").filter(Boolean);
    return urlSegments[0] === "te" ? "Telugu" : "English";
  }

  allTimeTopper: any = [];
  monthlyTopper: any = [];
  weeklyTopper: any = [];
  userType: any = "";
  @Input() filteredUsers: any[] = [];
  activeTab: any = "alltime";

  ngOnInit(): void {
    this.userType = this.authService.getUserRole();
    this.fetchLeaderBoard();
  }

  fetchLeaderBoard(): void {
    this.service.getLeaderboard(this.currentRouteLanguage).subscribe({
      next: (res) => {
        console.log("res data", res);
        if (res.success) {
          this.allTimeTopper = [...res.allTime];
          this.filteredUsers = [...this.allTimeTopper];
          this.monthlyTopper = [...res.monthly];
          this.weeklyTopper = [...res.weekly];
          this.cd.detectChanges();
        }
      },
      error: (err) => console.error("Error fetching users summary:", err),
    });
  }

  setActiveTab(tab: any): void {
    this.activeTab = tab;
    if (tab == "alltime") {
      this.filteredUsers = [...this.allTimeTopper];
      this.cd.detectChanges();
    } else if (tab == "month") {
      this.filteredUsers = [...this.monthlyTopper];
      this.cd.detectChanges();
    } else if (tab == "week") {
      this.filteredUsers = [...this.weeklyTopper];
      this.cd.detectChanges();
    }
  }

  // @Input() filteredUsers: any[] = [];

  // Limit initially set to 10
  userLimit: number = 10;

  // Filter out excluded usernames ('మంజుల' and 'admin') first
  get displayableUsers(): any[] {
    return (this.filteredUsers || []).filter(
      (user) => user.username !== 'మంజుల' && user.username !== 'admin'
    );
  }

  // Slice the filtered array based on current limit
  get visibleUsers(): any[] {
    return this.displayableUsers.slice(0, this.userLimit);
  }

  // Toggle limit between 10 and all users
  toggleShowMore(): void {
    if (this.userLimit >= this.displayableUsers.length) {
      this.userLimit = 10; // Reset back to 10
    } else {
      this.userLimit = this.displayableUsers.length; // Show all
    }
  }
}
