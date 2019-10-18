import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(': Logo', () => {
    it('should render a logo', () => {
      const imgComp = fixture.debugElement.query( By.css('figure.auth-header-logo img') );
      const logo =  imgComp.nativeElement.getAttribute('src');
      expect(logo).toEqual('./assets/images/logo.png');
    });
  });

  describe(': Title', () => {
    it('should render a title', () => {
      const imgComp = fixture.debugElement.query( By.css('div.auth-header-title') );
      const logo =  imgComp.nativeElement.textContent;
      expect(logo).toEqual(' FAÇA LOGIN NA SUA CONTA ');
    });
  });

});
