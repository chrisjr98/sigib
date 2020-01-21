import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoraDetalleComponent } from './productora-detalle.component';

describe('ProductoraDetalleComponent', () => {
  let component: ProductoraDetalleComponent;
  let fixture: ComponentFixture<ProductoraDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoraDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoraDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
