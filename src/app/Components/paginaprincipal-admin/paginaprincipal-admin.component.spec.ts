import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaprincipalAdminComponent } from './paginaprincipal-admin.component';

describe('PaginaprincipalAdminComponent', () => {
  let component: PaginaprincipalAdminComponent;
  let fixture: ComponentFixture<PaginaprincipalAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaprincipalAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaprincipalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
