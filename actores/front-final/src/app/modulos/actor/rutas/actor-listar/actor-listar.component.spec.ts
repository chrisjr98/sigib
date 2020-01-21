import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorListarComponent } from './actor-listar.component';

describe('ActorListarComponent', () => {
  let component: ActorListarComponent;
  let fixture: ComponentFixture<ActorListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
