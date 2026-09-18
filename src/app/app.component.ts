import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastComponent } from "./shared/components/toast/ToastComponent";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterModule, ToastComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  title = "Angular Ecommerce Dashboard | TailAdmin";

  ngOnInit(): void {
    const savedDir = localStorage.getItem("dir");
    if (savedDir === "rtl") {
      document.documentElement.setAttribute("dir", "rtl");
    }
  }
}
