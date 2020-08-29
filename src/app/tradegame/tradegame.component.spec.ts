import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradegameComponent } from './tradegame.component';

describe('TradegameComponent', () => {
  let component: TradegameComponent;
  let fixture: ComponentFixture<TradegameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradegameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradegameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
