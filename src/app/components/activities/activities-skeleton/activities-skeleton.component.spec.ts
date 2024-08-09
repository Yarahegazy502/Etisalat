import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesSkeletonComponent } from './activities-skeleton.component';

describe('ActivitiesSkeletonComponent', () => {
  let component: ActivitiesSkeletonComponent;
  let fixture: ComponentFixture<ActivitiesSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitiesSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivitiesSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
