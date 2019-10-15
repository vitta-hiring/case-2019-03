import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(': Host Class', () => {

    it('should not have any classes in host component', () => {
      const comp = component.hostClasses;
      const iElm = fixture.debugElement.nativeElement.getAttribute('class');
      expect(comp).toEqual('');
      expect(iElm).toEqual('');
    });

    it('should class input in host component when is required', () => {
      component.class = 'some-class';
      fixture.detectChanges();
      const iElm = fixture.debugElement.nativeElement.getAttribute('class');
      expect(component.class).toEqual('some-class');
      expect(iElm).toEqual('some-class');
    });

  });

});
