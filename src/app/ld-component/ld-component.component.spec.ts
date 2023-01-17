import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdComponentComponent } from './ld-component.component';

describe('LdComponentComponent', () => {
  let component: LdComponentComponent;
  let fixture: ComponentFixture<LdComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LdComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LdComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
