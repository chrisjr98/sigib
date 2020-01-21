import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorDetalleComponent } from './actor-detalle.component';

describe('ActorDetalleComponent', () => {
  let component: ActorDetalleComponent;
  let fixture: ComponentFixture<ActorDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
