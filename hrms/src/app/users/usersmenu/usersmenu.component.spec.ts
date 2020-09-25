import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersmenuComponent } from './usersmenu.component';

describe('UsersmenuComponent', () => {
  let component: UsersmenuComponent;
  let fixture: ComponentFixture<UsersmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
