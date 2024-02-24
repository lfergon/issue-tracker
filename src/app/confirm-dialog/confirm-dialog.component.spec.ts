import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

@Component({
  template: `
    <app-confirm-dialog
      [issueNumber]="issueNumber"
      (confirm)="onConfirm($event)"
    ></app-confirm-dialog>
  `,
})
class TestHostComponent {
  issueNumber: number | undefined = 123;
  onConfirm(confirm: boolean) {}
}

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    window.Element.prototype.animate = jest.fn();

    TestBed.configureTestingModule({
      imports: [ClarityModule, BrowserAnimationsModule],
      declarations: [ConfirmDialogComponent, TestHostComponent],
    });

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hostFixture = TestBed.createComponent(TestHostComponent);
    component = hostFixture.debugElement.query(
      By.directive(ConfirmDialogComponent),
    ).componentInstance;
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
    component.issueNumber = 123;
    component.agree();
    expect(component.issueNumber).toBeUndefined();
  });

  it('should reset issueNumber when disagree is called', () => {
    component.issueNumber = 123;
    component.disagree();
    expect(component.issueNumber).toBeUndefined();
  });

  // TODO: TypeError: Cannot read properties of undefined (reading 'addEventListener')
  // it('should trigger agree method when agree button is clicked', async () => {
  //   jest.spyOn(component, 'agree');
  //   hostFixture.detectChanges();
  //
  //   const button = hostFixture.debugElement.query(By.css('.btn-danger'));
  //   fireEvent.click(button.nativeElement);
  //   expect(component.agree).toHaveBeenCalled();
  // });
  //
  // it('should trigger disagree method when disagree button is clicked', async () => {
  //   jest.spyOn(component, 'disagree');
  //   hostFixture.detectChanges();
  //
  //   const button = hostFixture.debugElement.query(By.css('.btn-outline'));
  //   fireEvent.click(button.nativeElement);
  //   expect(component.disagree).toHaveBeenCalled();
  // });
});
