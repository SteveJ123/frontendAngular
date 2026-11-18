import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { ToastComponent } from "./shared/components/toast/ToastComponent";
import { NavbarcomponentComponent } from "./shared/navbarcomponent/navbarcomponent.component";
import { FooterComponent } from "./shared/footer/footer.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterModule, ToastComponent, NavbarcomponentComponent, FooterComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  title = "Angular Ecommerce Dashboard | TailAdmin";

  constructor(private router: Router) {}

  private handleStorageTamper = (event: StorageEvent) => {
    if (event.key === 'token' || event.key === 'role' || event.key === null) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  };

  ngOnInit(): void {
    window.addEventListener('storage', this.handleStorageTamper);
    const savedDir = localStorage.getItem("dir");
    if (savedDir === "rtl") {
      document.documentElement.setAttribute("dir", "rtl");
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.handleStorageTamper);
  }
}
