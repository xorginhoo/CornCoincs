import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissoesComponent } from './missoes.component';

describe('MissoesComponent', () => {
  let component: MissoesComponent;
  let fixture: ComponentFixture<MissoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
