import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoraListarComponent } from './productora-listar.component';

describe('ProductoraListarComponent', () => {
  let component: ProductoraListarComponent;
  let fixture: ComponentFixture<ProductoraListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoraListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoraListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
