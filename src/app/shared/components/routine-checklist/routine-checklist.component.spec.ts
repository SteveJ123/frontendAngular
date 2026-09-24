import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutineChecklistComponent } from './routine-checklist.component';

describe('RoutineChecklistComponent', () => {
  let component: RoutineChecklistComponent;
  let fixture: ComponentFixture<RoutineChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutineChecklistComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoutineChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
