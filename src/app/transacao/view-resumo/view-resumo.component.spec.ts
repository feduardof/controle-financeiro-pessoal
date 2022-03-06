import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResumoComponent } from './view-resumo.component';

describe('ViewResumoComponent', () => {
  let component: ViewResumoComponent;
  let fixture: ComponentFixture<ViewResumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewResumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
