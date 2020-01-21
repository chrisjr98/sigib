import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoraFormularioComponent } from './productora-formulario.component';

describe('ProductoraFormularioComponent', () => {
  let component: ProductoraFormularioComponent;
  let fixture: ComponentFixture<ProductoraFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoraFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoraFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
