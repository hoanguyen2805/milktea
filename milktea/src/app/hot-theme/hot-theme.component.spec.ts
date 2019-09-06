import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotThemeComponent } from './hot-theme.component';

describe('HotThemeComponent', () => {
  let component: HotThemeComponent;
  let fixture: ComponentFixture<HotThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
