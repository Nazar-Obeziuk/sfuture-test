import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoacherComponent } from './coacher.component';

describe('CoacherComponent', () => {
  let component: CoacherComponent;
  let fixture: ComponentFixture<CoacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoacherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
