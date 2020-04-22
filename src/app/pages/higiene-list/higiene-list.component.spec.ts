import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HigieneListComponent } from './higiene-list.component';

describe('HigieneListComponent', () => {
  let component: HigieneListComponent;
  let fixture: ComponentFixture<HigieneListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HigieneListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HigieneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
