import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  ChangeDetectorRef,
  signal,
  inject,
} from "@angular/core";
// import { SidebarService } from "../../services/sidebar.service";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { SafeHtmlPipe } from "../../pipe/safe-html.pipe";
// import { SidebarWidgetComponent } from "./app-sidebar-widget.component";
import { combineLatest, filter, Subscription } from "rxjs";
import { AuthService } from "../../services/AuthService";
import { SidebarService } from "../../services/SidebarService";

type NavItem = {
  name: string;
  icon: string;
  path?: string;
  new?: boolean;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

@Component({
  selector: "app-sidebar",
  imports: [CommonModule, RouterModule, SafeHtmlPipe],
  templateUrl: "./app-sidebar.component.html",
})
export class AppSidebarComponent {
  isSidebarOpen = signal(false);

  private authService = inject(AuthService);
  public sidebarService = inject(SidebarService);
  userRole = this.authService.getUserRole();
  private router = inject(Router);
  currentLang = "en";
  private routerSubscription!: Subscription;
  ngOnInit() {
    const rawLang = this.authService.getUserLanguage() || "en";
    this.currentLang = rawLang.toLowerCase().trim() === "telugu" ? "te" : "en";

    this.detectLanguageFromUrl(this.router.url);

    // 2. Listen for URL changes dynamically when navigating
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
      )
      .subscribe((event: NavigationEnd) => {
        this.detectLanguageFromUrl(event.urlAfterRedirects || event.url);
      });
  }

  private detectLanguageFromUrl(url: string): void {
    const isUserAdmin = this.userRole?.trim().toLowerCase() === "admin";

    if (isUserAdmin) {
      // For Admin: Strictly extract 'en' or 'te' from current URL path
      const urlSegment = url.split("/")[1]?.toLowerCase();
      if (urlSegment === "te" || urlSegment === "en") {
        this.currentLang = urlSegment;
        return;
      }
    }

    // Fallback for standard users or non-localized URLs: Read from profile preference
    const rawLang = this.authService.getUserLanguage() || "en";
    const normalized = rawLang.toLowerCase().trim();
    this.currentLang =
      normalized === "telugu" || normalized === "te" ? "te" : "en";
  }
  toggleSidebar() {
    this.isSidebarOpen.update((v) => !v);
  }

  navigateTo(courseRoute: any) {
    this.sidebarService.setSidebarState(false);
    this.router.navigate(["/", this.currentLang, courseRoute]);
  }

  toggleCoursesDropdown(): void {
    // Navigate using array format with the current language prefix
    this.sidebarService.setSidebarState(false);
    this.router.navigate(["/", this.currentLang, "courses-list"]);
    // this.router.navigate(['/courses-list']);
  }

  isLangToggleActive = false;

  onLangToggleClick(): void {
    // Highlight when clicked
    this.isLangToggleActive = true;

    // Close sidebar on mobile
    this.sidebarService.setSidebarState(false);
  }

  // Call this method whenever any OTHER sidebar item is clicked to reset the highlight
  resetLangToggle(): void {
    this.isLangToggleActive = false;
    this.sidebarService.setSidebarState(false);
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
