import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA, input, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InteractivityChecker } from '@angular/cdk/a11y';
import { FormsModule } from '@angular/forms';

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
      imports: [NoopAnimationsModule, FormsModule],
      declarations: [ConfirmDialogComponent],
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
    component.issueNumber = signal(123);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit true when agree is called', () => {
    jest.spyOn(component.confirm, 'emit');
    component.agree();
    expect(component.confirm.emit).toHaveBeenCalledWith(true);
    expect(component.issueNumber()).toBe(0);
  });

  it('should emit false when disagree is called', () => {
    jest.spyOn(component.confirm, 'emit');
    component.disagree();
    expect(component.confirm.emit).toHaveBeenCalledWith(false);
    expect(component.issueNumber()).toBe(0);
  });

  it('should open modal when issueNumber is defined', () => {
    const modal = fixture.debugElement.query(By.css('clr-modal'));
    expect(modal).toBeTruthy();
  });

  it('should close modal when click Cancel', () => {
    jest.spyOn(component, 'disagree');
    fixture.detectChanges();
    const cancelButton = fixture.debugElement.query(By.css('.btn-outline'));
    cancelButton.triggerEventHandler('click', null);
    expect(component.disagree).toHaveBeenCalled();
  });

  it('should emit event when click Yes, continue', () => {
    jest.spyOn(component, 'agree');
    fixture.detectChanges();
    const agreeButton = fixture.debugElement.query(By.css('.btn-danger'));
    agreeButton.triggerEventHandler('click', null);
    expect(component.agree).toHaveBeenCalled();
  });
});
