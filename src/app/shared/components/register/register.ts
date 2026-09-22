import { Component, inject, ChangeDetectorRef } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/AuthService";
import { ToastService } from "../../services/toast.service";

@Component({
  selector: "app-register",
  imports: [CommonModule, FormsModule],
  templateUrl: "./register.html",
  styleUrl: "./register.css",
  host: {
    class: "w-full block px-4",
  },
})
export class Register {
  formData = {
    username: "",
    mobile: "",
    password: "",
    repassword: "",
    courseType: "Face Yoga", // Default selected option
    role: "user", // Set default user type on the frontend
    language: "Telugu",
  };

  constructor() {
    // private authService: AuthService,
    // private router: Router,
  }

  private authService = inject(AuthService);
  private router = inject(Router);
  private cd = inject(ChangeDetectorRef);
  private toastService = inject(ToastService);

  isLoading: any = false;
  error: any = "";

  formReset() {
    this.formData = {
      username: "",
      mobile: "",
      password: "",
      repassword: "",
      courseType: "Face Yoga", // Default selected option
      role: "user", // Set default user type on the frontend
      language: "Telugu",
    };
  }
  onRegister(form: NgForm) {
    if (form.invalid || this.formData.password !== this.formData.repassword) {
      return;
    }
    this.isLoading = true;

    // this.authService.register(this.formData).subscribe({
    //   next: () => this.router.navigate(['/login']),
    //   error: (err) => console.error('Registration failed:', err),
    // });

    this.authService.register(this.formData).subscribe({
      next: () => {
        // Determine language path ('en' vs default route)
        // const rawLang = this.formData.language || 'English';
        // const isEnglish = rawLang.toLowerCase().trim() === 'english';
        // const targetRoute = isEnglish ? '/en/login' : '/login';
        // console.log('targetRoute', targetRoute);
        // this.router.navigate(["/login"]);
        this.isLoading = false;
        this.formReset();
        this.cd.detectChanges();
        this.toastService.success("User is registered successfully!");
      },
      error: (err: any) => {
        console.error("Registration failed:", err);
        this.error = err;
        this.isLoading = false;
        this.cd.detectChanges();
        this.toastService.error("User is not registered successfully!");
      },
    });
  }
}
