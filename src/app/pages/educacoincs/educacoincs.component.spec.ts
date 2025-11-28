import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducacoincsComponent } from './educacoincs.component';

describe('EducacoincsComponent', () => {
  let component: EducacoincsComponent;
  let fixture: ComponentFixture<EducacoincsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducacoincsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducacoincsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
