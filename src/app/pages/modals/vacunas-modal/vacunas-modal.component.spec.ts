import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VacunasModalComponent } from './vacunas-modal.component';

describe('VacunasModalComponent', () => {
  let component: VacunasModalComponent;
  let fixture: ComponentFixture<VacunasModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacunasModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VacunasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
