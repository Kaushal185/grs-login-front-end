import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BypageComponent } from './bypage.component';

describe('BypageComponent', () => {
  let component: BypageComponent;
  let fixture: ComponentFixture<BypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BypageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
