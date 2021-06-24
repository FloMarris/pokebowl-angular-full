import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresAvanceesEquipeComponent } from './parametres-avancees-equipe.component';

describe('ParametresAvanceesEquipeComponent', () => {
  let component: ParametresAvanceesEquipeComponent;
  let fixture: ComponentFixture<ParametresAvanceesEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametresAvanceesEquipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametresAvanceesEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
