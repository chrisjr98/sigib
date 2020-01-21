import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoraEditarComponent } from './productora-editar.component';

describe('ProductoraEditarComponent', () => {
  let component: ProductoraEditarComponent;
  let fixture: ComponentFixture<ProductoraEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoraEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoraEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
