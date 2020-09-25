import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersmainComponent } from './usersmain.component';

describe('UsersmainComponent', () => {
  let component: UsersmainComponent;
  let fixture: ComponentFixture<UsersmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
