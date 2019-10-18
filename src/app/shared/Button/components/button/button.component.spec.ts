import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(': Button Type', () => {

    it('should button type default value `button`', () => {
      expect(component.type).toEqual('button');
      const iElm = fixture.debugElement.query( By.css('button.shared-button') );
      const typeValue = iElm.nativeElement.getAttribute('type');
      expect(typeValue).toEqual(component.type);
    });

    it('should button type set to `reset`', () => {
      component.type = 'reset';
      expect(component.type).toEqual('reset');
      fixture.detectChanges();
      const iElm = fixture.debugElement.query( By.css('button.shared-button') );
      const typeValue = iElm.nativeElement.getAttribute('type');
      expect(typeValue).toEqual(component.type);
    });

    it('should button type set to `menu`', () => {
      component.type = 'menu';
      expect(component.type).toEqual('menu');
      fixture.detectChanges();
      const iElm = fixture.debugElement.query( By.css('button.shared-button') );
      const typeValue = iElm.nativeElement.getAttribute('type');
      expect(typeValue).toEqual(component.type);
    });

    it('should button type set to `submit`', () => {
      component.type = 'submit';
      expect(component.type).toEqual('submit');
      fixture.detectChanges();
      const iElm = fixture.debugElement.query( By.css('button.shared-button') );
      const typeValue = iElm.nativeElement.getAttribute('type');
      expect(typeValue).toEqual(component.type);
    });

  });

  describe(': Button Size', () => {

    it('should button size default value `medium`', () => {
      expect(component.size).toEqual('medium');
      const iElm = fixture.debugElement.query( By.css('button.shared-button') );
      const typeValue = iElm.nativeElement.classList.contains('is-size-medium');
      expect(typeValue).toBeTruthy();
    });

    it('should button size set to `small`', () => {
      component.size = 'small';
      expect(component.size).toEqual('small');
      fixture.detectChanges();
      const iElm = fixture.debugElement.query( By.css('button.shared-button') );
      const typeValue = iElm.nativeElement.classList.contains('is-size-small');
      expect(typeValue).toBeTruthy();
    });

    it('should button size set to `large`', () => {
      component.size = 'large';
      expect(component.size).toEqual('large');
      fixture.detectChanges();
      const iElm = fixture.debugElement.query( By.css('button.shared-button') );
      const typeValue = iElm.nativeElement.classList.contains('is-size-large');
      expect(typeValue).toBeTruthy();
    });

  });

  describe(': Button Disabled', () => {

    it('should button disabled default value `false`', () => {
      expect(component.isDisabled).toBeFalsy();
      const iElm = fixture.debugElement.query( By.css('button.shared-button') );
      const typeValue = iElm.nativeElement.getAttribute('disabled');
      expect(typeValue).toBeNull();
    });

    it('should button disabled set value `true`', () => {
      component.isDisabled = true;
      fixture.detectChanges();
      expect(component.isDisabled).toBeTruthy();
      const iElm = fixture.debugElement.query( By.css('button.shared-button') );
      const typeValue = iElm.nativeElement.getAttribute('disabled');
      expect(typeValue).toEqual('');
    });

  });

});
