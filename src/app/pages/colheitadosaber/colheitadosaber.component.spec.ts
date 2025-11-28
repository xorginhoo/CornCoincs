import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColheitadosaberComponent } from './colheitadosaber.component';

describe('ColheitadosaberComponent', () => {
  let component: ColheitadosaberComponent;
  let fixture: ComponentFixture<ColheitadosaberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColheitadosaberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColheitadosaberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
