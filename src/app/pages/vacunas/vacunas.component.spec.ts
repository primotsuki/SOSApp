import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VacunasComponent } from './vacunas.component';

describe('VacunasComponent', () => {
  let component: VacunasComponent;
  let fixture: ComponentFixture<VacunasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacunasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VacunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});