import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsComponentComponent } from './ps-component.component';

describe('PsComponentComponent', () => {
  let component: PsComponentComponent;
  let fixture: ComponentFixture<PsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
