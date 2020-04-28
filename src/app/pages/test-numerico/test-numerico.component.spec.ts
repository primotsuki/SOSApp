import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestNumericoComponent } from './test-numerico.component';

describe('TestNumericoComponent', () => {
  let component: TestNumericoComponent;
  let fixture: ComponentFixture<TestNumericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestNumericoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestNumericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
