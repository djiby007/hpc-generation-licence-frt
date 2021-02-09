import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFacturationEditComponent } from './details-facturation-edit.component';

describe('DetailsFacturationEditComponent', () => {
  let component: DetailsFacturationEditComponent;
  let fixture: ComponentFixture<DetailsFacturationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsFacturationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFacturationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
