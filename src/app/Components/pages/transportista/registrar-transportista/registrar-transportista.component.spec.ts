import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTransportistaComponent } from './registrar-transportista.component';

describe('RegistrarTransportistaComponent', () => {
  let component: RegistrarTransportistaComponent;
  let fixture: ComponentFixture<RegistrarTransportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarTransportistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarTransportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
