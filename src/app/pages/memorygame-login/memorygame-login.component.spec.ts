import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorygameLoginComponent } from './memorygame-login.component';

describe('MemorygameLoginComponent', () => {
  let component: MemorygameLoginComponent;
  let fixture: ComponentFixture<MemorygameLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemorygameLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemorygameLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
