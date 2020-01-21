import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorCrearComponent } from './actor-crear.component';

describe('ActorCrearComponent', () => {
  let component: ActorCrearComponent;
  let fixture: ComponentFixture<ActorCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
