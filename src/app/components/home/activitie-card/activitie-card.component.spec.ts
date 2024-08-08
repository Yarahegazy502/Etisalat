import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitieCardComponent } from './activitie-card.component';

describe('ActivitieCardComponent', () => {
  let component: ActivitieCardComponent;
  let fixture: ComponentFixture<ActivitieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitieCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivitieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
