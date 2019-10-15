import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from '../../components/header/header.component';
import { FormComponent } from '../../components/form/form.component';

import { AuthComponent } from './auth.component';
import { CardModule, FormFieldModule, ButtonModule } from '../../../../shared';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthComponent, HeaderComponent, FormComponent ],
      imports: [ CardModule, FormFieldModule, ButtonModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
