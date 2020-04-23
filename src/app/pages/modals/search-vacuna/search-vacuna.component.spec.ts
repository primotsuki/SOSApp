import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchVacunaComponent } from './search-vacuna.component';

describe('SearchVacunaComponent', () => {
  let component: SearchVacunaComponent;
  let fixture: ComponentFixture<SearchVacunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchVacunaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchVacunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
