import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilialeCreateComponent } from './filiale-create.component';

describe('FilialeCreateComponent', () => {
  let component: FilialeCreateComponent;
  let fixture: ComponentFixture<FilialeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilialeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilialeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
