import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaludComponent } from './salud.component';

describe('SaludComponent', () => {
  let component: SaludComponent;
  let fixture: ComponentFixture<SaludComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaludComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});