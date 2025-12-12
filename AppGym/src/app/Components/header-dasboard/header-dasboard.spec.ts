import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDasboard } from './header-dasboard';

describe('HeaderDasboard', () => {
  let component: HeaderDasboard;
  let fixture: ComponentFixture<HeaderDasboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDasboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderDasboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
