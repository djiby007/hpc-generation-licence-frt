import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilialeEditComponent } from './filiale-edit.component';

describe('FilialeEditComponent', () => {
  let component: FilialeEditComponent;
  let fixture: ComponentFixture<FilialeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilialeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilialeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
