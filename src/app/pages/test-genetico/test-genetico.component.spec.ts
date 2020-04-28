import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestGeneticoComponent } from './test-genetico.component';

describe('TestGeneticoComponent', () => {
  let component: TestGeneticoComponent;
  let fixture: ComponentFixture<TestGeneticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestGeneticoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestGeneticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
