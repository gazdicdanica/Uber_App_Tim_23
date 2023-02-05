import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteDialogComponent } from './favorite-dialog.component';

describe('FavoriteDialogComponent', () => {
  let component: FavoriteDialogComponent;
  let fixture: ComponentFixture<FavoriteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
