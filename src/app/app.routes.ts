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
import { HomecomponentComponent } from "./shared/homecomponent/homecomponent.component";
import { AboutComponent } from "./shared/about/about.component";
import { ClassesComponent } from "./shared/classes/classes.component";
import { PriceComponent } from "./shared/price/price.component";
import { GalleryComponent } from "./shared/gallery/gallery.component";
import { ContactComponent } from "./shared/contact/contact.component";
import { MainLayoutComponent } from "./shared/main-layout/main-layout.component";

export const routes: Routes = [
  // { path: "", redirectTo: "", pathMatch: "full" },
  // {path: "", component: HomecomponentComponent},  
  // {path: "about", component: AboutComponent},
  // {path: "classes", component: ClassesComponent},
  // {path: "pricing", component: PriceComponent},
  // {path: "gallery", component: GalleryComponent},
  // {path: "contact", component: ContactComponent},
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomecomponentComponent },
      { path: 'about', component: AboutComponent },
      { path: 'classes', component: ClassesComponent },
      { path: 'pricing', component: PriceComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'contact', component: ContactComponent }
    ]
  },

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
