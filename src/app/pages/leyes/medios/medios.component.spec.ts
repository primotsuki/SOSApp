import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MediosComponent } from './medios.component';

describe('MediosComponent', () => {
  let component: MediosComponent;
  let fixture: ComponentFixture<MediosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MediosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
