import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRidesComponent } from './favorite-rides.component';

describe('FavoriteRidesComponent', () => {
  let component: FavoriteRidesComponent;
  let fixture: ComponentFixture<FavoriteRidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteRidesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
