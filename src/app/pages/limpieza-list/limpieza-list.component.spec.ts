import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LimpiezaListComponent } from './limpieza-list.component';

describe('LimpiezaListComponent', () => {
  let component: LimpiezaListComponent;
  let fixture: ComponentFixture<LimpiezaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimpiezaListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LimpiezaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
