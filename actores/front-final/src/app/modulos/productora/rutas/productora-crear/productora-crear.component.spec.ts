import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoraCrearComponent } from './productora-crear.component';

describe('ProductoraCrearComponent', () => {
  let component: ProductoraCrearComponent;
  let fixture: ComponentFixture<ProductoraCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoraCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoraCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
