import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoraResumidoComponent } from './productora-resumido.component';

describe('ProductoraResumidoComponent', () => {
  let component: ProductoraResumidoComponent;
  let fixture: ComponentFixture<ProductoraResumidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoraResumidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoraResumidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
