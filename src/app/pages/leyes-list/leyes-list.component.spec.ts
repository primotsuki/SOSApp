import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeyesListComponent } from './leyes-list.component';

describe('LeyesListComponent', () => {
  let component: LeyesListComponent;
  let fixture: ComponentFixture<LeyesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeyesListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeyesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
