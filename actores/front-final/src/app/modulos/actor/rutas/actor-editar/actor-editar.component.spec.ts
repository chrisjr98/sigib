import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorEditarComponent } from './actor-editar.component';

describe('ActorEditarComponent', () => {
  let component: ActorEditarComponent;
  let fixture: ComponentFixture<ActorEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
