import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BhagavatgitainpracticallifelistComponent } from './bhagavatgitainpracticallifelist.component';

describe('BhagavatgitainpracticallifelistComponent', () => {
  let component: BhagavatgitainpracticallifelistComponent;
  let fixture: ComponentFixture<BhagavatgitainpracticallifelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BhagavatgitainpracticallifelistComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BhagavatgitainpracticallifelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
