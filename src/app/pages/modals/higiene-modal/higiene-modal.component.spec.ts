import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HigieneModalComponent } from './higiene-modal.component';

describe('HigieneModalComponent', () => {
  let component: HigieneModalComponent;
  let fixture: ComponentFixture<HigieneModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HigieneModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HigieneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
