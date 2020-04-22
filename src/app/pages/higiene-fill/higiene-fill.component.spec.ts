import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HigieneFillComponent } from './higiene-fill.component';

describe('HigieneFillComponent', () => {
  let component: HigieneFillComponent;
  let fixture: ComponentFixture<HigieneFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HigieneFillComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HigieneFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
