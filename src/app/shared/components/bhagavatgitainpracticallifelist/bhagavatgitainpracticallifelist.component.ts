import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  selector: 'app-bhagavatgitainpracticallifelist',
  styleUrl: './bhagavatgitainpracticallifelist.component.css',
  templateUrl: './bhagavatgitainpracticallifelist.component.html',
})
export class BhagavatgitainpracticallifelistComponent {
  users: any[] = [];
  filteredUsers: any[] = [];
  paginatedUsers: any[] = [];

  // Filter states
  searchTerm: string = '';
  selectedMonth: string = ''; // Format: 'MM' (e.g. '10')
  selectedYear: string = '';  // Format: 'YYYY' (e.g. '2026')
  selectedStatus: string = ''; // Filter by 'paid' or 'pending'

  // Pagination states
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  // Summary counts
  totalUserCount: number = 0;
  totalPaidUserCount: number = 0;

  private cd = inject(ChangeDetectorRef);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }
  // http://localhost:3000
  fetchUsers(): void {
    this.http.get<any>('https://apibhagavadhgitainpracticallife.younghappyandhealthy.com/api/users').subscribe({
      next: (response) => {
        console.log("response", response)
        if (response.success) {
          this.users = response.data;
          
          // Calculate overall counts from full data
          this.totalUserCount = this.users.length;
          this.totalPaidUserCount = this.users.filter(u => u.payment_status === 'paid').length;

          this.cd.detectChanges();
          this.applyFilters();
        }
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }

  // applyFilters(): void {
  //   let temp = [...this.users];
    
  //   if (this.searchTerm.trim()) {
  //     const term = this.searchTerm.toLowerCase();
  //     temp = temp.filter(user => 
  //       user.fullName.toLowerCase().includes(term) ||
  //       user.email.toLowerCase().includes(term) ||
  //       user.whatsappNumber.includes(term)
  //     );
  //     this.cd.detectChanges();
  //   }
    
  //   if (this.selectedYear || this.selectedMonth) {
  //     temp = temp.filter(user => {
  //       const date = new Date(user.created_at);
  //       const userYear = date.getFullYear().toString();
  //       const userMonth = (date.getMonth() + 1).toString().padStart(2, '0');

  //       const matchesYear = this.selectedYear ? userYear === this.selectedYear : true;
  //       const matchesMonth = this.selectedMonth ? userMonth === this.selectedMonth : true;

  //       return matchesYear && matchesMonth;
  //     });
  //   }

  //   this.filteredUsers = temp;
  //   this.currentPage = 1;
  //   this.updatePagination();
  // }

  applyFilters(): void {
    let temp = [...this.users];

    // 1. Search Filter (matches name, email, or mobile)
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      temp = temp.filter(user => 
        user.fullName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.whatsappNumber.includes(term)
      );
    }

    // 2. Status Filter (Paid vs Pending)
    if (this.selectedStatus) {
      temp = temp.filter(user => user.payment_status === this.selectedStatus);
    }

    // 3. Month & Year Filter based on created_at
    if (this.selectedYear || this.selectedMonth) {
      temp = temp.filter(user => {
        const date = new Date(user.created_at);
        const userYear = date.getFullYear().toString();
        const userMonth = (date.getMonth() + 1).toString().padStart(2, '0');

        const matchesYear = this.selectedYear ? userYear === this.selectedYear : true;
        const matchesMonth = this.selectedMonth ? userMonth === this.selectedMonth : true;

        return matchesYear && matchesMonth;
      });
    }

    this.filteredUsers = temp;
    this.currentPage = 1; // Reset to page 1 on filter change
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize) || 1;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
    this.cd.detectChanges();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }
}
