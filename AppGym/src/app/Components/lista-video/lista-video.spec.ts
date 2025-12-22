import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVideo } from './lista-video';

describe('ListaVideo', () => {
  let component: ListaVideo;
  let fixture: ComponentFixture<ListaVideo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaVideo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaVideo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
