import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComidasComponent } from './comidas.component';

describe('ComidasComponent', () => {
  let component: ComidasComponent;
  let fixture: ComponentFixture<ComidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComidasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
