import { ChangeDetectorRef, Component, inject, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Service } from "../../../services/service";
import { ToastService } from "../../../services/toast.service";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/AuthService";

export interface Product {
  id?: string;
  title: string;
  productUrl: string;
  imageUrl: string;
  price: string;
  storeName: string;
}

@Component({
  selector: "app-shop",
  imports: [CommonModule, FormsModule],
  templateUrl: "./shop.html",
  styleUrl: "./shop.css",
  host: {
    class: "w-full block px-4",
  },
})
export class Shop {
  apiUrl = "http://localhost:5000/api/products";

  // Set role to 'admin' or 'user'
  userRole: string = "";

  products: any[] = [];
  isEditing = false;
  editingId: any | null = null;

  productForm: any = {
    title: "",
    productUrl: "",
    imageUrl: "",
    price: "",
    storeName: "Amazon",
  };
  productToDeleteId: any = "";
  showDeleteModal: boolean = false;

  constructor(private http: HttpClient) {}
  private cd = inject(ChangeDetectorRef);
  private service = inject(Service);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private authService = inject(AuthService);

  userId: any = "";

  ngOnInit(): void {
    this.userRole = localStorage.getItem("role") || "";
    this.fetchProducts();
  }
  get currentRouteLanguage(): string {
    const urlSegments = this.router.url.split("/").filter(Boolean);
    return urlSegments[0] === "te" ? "Telugu" : "English";
  }

  fetchProducts(): void {
    // this.http.get<any>(this.apiUrl)
    this.service.getProducts(this.currentRouteLanguage).subscribe({
      next: (res: any) => {
        console.log("product res", res);
        if (res.success) {
          this.products = res.data;
          this.cd.detectChanges();
        }
      },
      error: (err) => console.error("Error fetching products:", err),
    });
  }

  saveProduct(): void {
    let payload = {
      ...this.productForm,
      language: this.currentRouteLanguage,
    };
    if (this.isEditing && this.editingId) {
      // this.http.put<any>(`${this.apiUrl}/${this.editingId}`, this.productForm)
      this.service.updateProduct(this.editingId, payload).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.fetchProducts();
            this.resetForm();
            this.toastService.success("Product edited saved successfully!");
          }
        },
        error: (err) => {
          console.error("Error updating product:", err);
          this.toastService.error("Product not edit!");
        },
      });
    } else {
      // this.http.post<any>(this.apiUrl, this.productForm)
      this.service.createProduct(payload).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.fetchProducts();
            this.resetForm();
            this.cd.detectChanges();
            this.toastService.success("Product saved successfully!");
          }
        },
        error: (err) => {
          console.error("Error creating product:", err);
          this.toastService.error("Product not saved successfully!");
        },
      });
    }
  }

  startEditing(product: any): void {
    this.isEditing = true;
    this.editingId = Number(product.id) || null;
    this.productForm = { ...product };
  }

  deleteProduct(id: string): void {
    if (confirm("Are you sure you want to delete this product listing?")) {
      // this.http.delete<any>(`${this.apiUrl}/${id}`);
      // this.service.deleteProduct(id).subscribe({
      //   next: (res: any) => {
      //     if (res.success) {
      //       this.fetchProducts();
      //     }
      //   },
      //   error: (err) => console.error('Error deleting product:', err),
      // });
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.editingId = null;
    this.productForm = {
      title: "",
      productUrl: "",
      imageUrl: "",
      price: "",
      storeName: "Amazon",
    };
  }

  openProduct(url: string): void {
    window.open(url, "_blank");
  }

  // Opens the custom popup dialog
  openDeleteModal(id: any): void {
    this.productToDeleteId = Number(id);
    alert(this.productToDeleteId);
    this.showDeleteModal = true;
  }

  // Closes the popup dialog without deleting
  cancelDelete(): void {
    this.showDeleteModal = false;
    this.productToDeleteId = "";
  }

  // Executed when "OK" / "Delete" is pressed in the modal
  confirmDelete(): void {
    if (!this.productToDeleteId) return;
    this.service.deleteProduct(this.productToDeleteId).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.fetchProducts();
          this.toastService.success("Product deleted successfully!");
          this.cancelDelete();
          this.cd.detectChanges();
        }
      },
      error: (err) => {
        (console.error("Error deleting product:", err), this.cancelDelete());
        this.cancelDelete();
        this.cd.detectChanges();
        this.toastService.error("Product not deleted!");
      },
    });
  }
}
