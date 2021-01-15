import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilialeDetailsComponent } from './filiale-details.component';

describe('FilialeDetailsComponent', () => {
  let component: FilialeDetailsComponent;
  let fixture: ComponentFixture<FilialeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilialeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilialeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
