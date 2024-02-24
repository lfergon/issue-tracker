import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
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
      imports: [ClarityModule, NoopAnimationsModule, FormsModule],
      declarations: [ConfirmDialogComponent],
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
    fixture.componentRef.setInput('issueNumber', 123);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit true when agree is called', () => {
    jest.spyOn(component.confirm, 'emit');
    component.agree();
    expect(component.confirm.emit).toHaveBeenCalledWith(true);
  });

  it('should emit false when disagree is called', () => {
    jest.spyOn(component.confirm, 'emit');
    component.disagree();
    expect(component.confirm.emit).toHaveBeenCalledWith(false);
  });

  it('should reset issueNumber when agree is called', () => {
    component.agree();
    expect(component.issueNumber()).toBe(0);
  });

  it('should reset issueNumber when disagree is called', () => {
    component.disagree();
    expect(component.issueNumber()).toBe(0);
  });

  it('should open modal when issueNumber is defined', () => {
    component.issueNumber = input(123);
    fixture.detectChanges();
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

  // Issues with Clarity UI
  // it('should match snapshot', () => {
  //   fixture.detectChanges();
  //   expect(fixture).toMatchSnapshot();
  // });
});
