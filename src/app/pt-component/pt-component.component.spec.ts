import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtComponentComponent } from './pt-component.component';

describe('PtComponentComponent', () => {
  let component: PtComponentComponent;
  let fixture: ComponentFixture<PtComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
