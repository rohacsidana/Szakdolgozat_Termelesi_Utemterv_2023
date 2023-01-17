import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdComponent } from './ld.component';

describe('LdComponent', () => {
  let component: LdComponent;
  let fixture: ComponentFixture<LdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
