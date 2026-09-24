import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDailyRoutineComponent } from './admin-daily-routine.component';

describe('AdminDailyRoutineComponent', () => {
  let component: AdminDailyRoutineComponent;
  let fixture: ComponentFixture<AdminDailyRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDailyRoutineComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminDailyRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
