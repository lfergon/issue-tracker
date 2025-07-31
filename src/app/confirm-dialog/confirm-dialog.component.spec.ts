import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InteractivityChecker } from '@angular/cdk/a11y';
import { FormsModule } from '@angular/forms';
import { setComponentInput } from '../../test-utils/component-test-helpers';

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    window.Element.prototype.animate = jest.fn();

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, FormsModule, ConfirmDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideProvider(InteractivityChecker, {
        useValue: {
          isFocusable: () => true, // This checks focus trap, set it to true to avoid the warning cdk animation
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    // For testing, we can access the component's input signal directly
    // but we don't need to modify it since it's read-only
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit true when agree is called', () => {
    jest.spyOn(component.confirm, 'emit');
    component.agree();
    expect(component.confirm.emit).toHaveBeenCalledWith(true);
    // No longer checking for issueNumber reset as that functionality was removed
  });

  it('should emit false when disagree is called', () => {
    jest.spyOn(component.confirm, 'emit');
    component.disagree();
    expect(component.confirm.emit).toHaveBeenCalledWith(false);
    // No longer checking for issueNumber reset as that functionality was removed
  });

  it('should open modal when issueNumber is defined', () => {
    const modal = fixture.debugElement.query(By.css('clr-modal'));
    expect(modal).toBeTruthy();
  });

  it('should close modal when click Cancel', () => {
    jest.spyOn(component, 'disagree');
    setComponentInput(fixture, 'issueNumber', 123);
    fixture.detectChanges();
    const cancelButton = fixture.debugElement.query(By.css('.btn-outline'));
    cancelButton.triggerEventHandler('click', null);
    expect(component.disagree).toHaveBeenCalled();
  });

  it('should emit event when click Yes, continue', () => {
    jest.spyOn(component, 'agree');
    setComponentInput(fixture, 'issueNumber', 123);
    fixture.detectChanges();
    const agreeButton = fixture.debugElement.query(By.css('.btn-danger'));
    agreeButton.triggerEventHandler('click', null);
    expect(component.agree).toHaveBeenCalled();
  });
});
