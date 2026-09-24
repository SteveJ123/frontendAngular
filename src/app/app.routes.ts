import { Routes } from "@angular/router";
import { Login } from "../../src/app/shared/components/login/login";
import { Register } from "../../src/app/shared/components/register/register";
import { Notfound } from "../../src/app/shared/components/notfound/notfound";
import {
  guestGuard,
  roleGuard,
} from "../../src/app/shared/services/auth.guard";
// import { MainLayoutComponent } from "./main-layout.component";
import { AppLayoutComponent } from "./shared/layout/app-layout/app-layout.component";
import { Admin } from "../../src/app/shared/components/admin/admin";

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },

  // Public Routes (No Header/Sidebar)
  { path: "login", component: Login, canActivate: [guestGuard] },
  { path: "register", component: Register, canActivate: [guestGuard] },
  {
    path: "admin",
    component: Admin,
    canActivate: [roleGuard],
    data: { roles: ["admin"] },
  },

  // Authenticated Shell (Wraps Header + Sidebar for all module routes)
  {
    path: "",
    component: AppLayoutComponent,
    children: [
      {
        path: "en",
        canMatch: [roleGuard],
        loadChildren: () =>
          import("./shared/routes/english.routes").then(
            (m) => m.ENGLISH_ROUTES,
          ),
      },
      {
        path: "te",
        canMatch: [roleGuard],
        loadChildren: () =>
          import("./shared/routes/telugu.routes").then((m) => m.TELUGU_ROUTES),
      },
    ],
  },

  { path: "**", component: Notfound },
];
