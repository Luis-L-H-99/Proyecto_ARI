import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproductorVideo } from './reproductor-video';

describe('ReproductorVideo', () => {
  let component: ReproductorVideo;
  let fixture: ComponentFixture<ReproductorVideo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReproductorVideo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReproductorVideo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
