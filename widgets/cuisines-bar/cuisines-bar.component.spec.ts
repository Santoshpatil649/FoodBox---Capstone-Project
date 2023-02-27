import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisinesBarComponent } from './cuisines-bar.component';

describe('CuisinesBarComponent', () => {
  let component: CuisinesBarComponent;
  let fixture: ComponentFixture<CuisinesBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuisinesBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuisinesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
