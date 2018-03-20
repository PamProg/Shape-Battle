import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionBoardComponent } from './option-board.component';

describe('OptionBoardComponent', () => {
  let component: OptionBoardComponent;
  let fixture: ComponentFixture<OptionBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
