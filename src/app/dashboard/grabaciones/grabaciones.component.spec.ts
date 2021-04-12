import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrabacionesComponent } from './grabaciones.component';

describe('GrabacionesComponent', () => {
  let component: GrabacionesComponent;
  let fixture: ComponentFixture<GrabacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrabacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrabacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
