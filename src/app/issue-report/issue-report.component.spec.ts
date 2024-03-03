import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueReportComponent } from './issue-report.component';
import { IssuesService } from '../issues.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('IssueReportComponent', () => {
  let component: IssueReportComponent;
  let fixture: ComponentFixture<IssueReportComponent>;
  let mockIssuesService: { createIssue: jest.Mock; getSuggestions: jest.Mock };

  beforeEach(async () => {
    mockIssuesService = {
      createIssue: jest.fn(),
      getSuggestions: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [IssueReportComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: IssuesService, useValue: mockIssuesService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit formClose event when addIssue is called and form is valid', () => {
    component.issueForm.controls.title.setValue('Test title');
    component.issueForm.controls.description.setValue('Test description');
    component.issueForm.controls.priority.setValue('High');
    component.issueForm.controls.type.setValue('Bug');

    const emitSpy = jest.spyOn(component.formClose, 'emit');

    component.addIssue();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should get suggestions based on title value changes', () => {
    const mockSuggestions = [
      { title: 'Test', description: '', priority: '', type: '' },
    ];
    mockIssuesService.getSuggestions.mockReturnValue(mockSuggestions);
    component.issueForm.controls.title.setValue('Test');
    expect(component.suggestions).toEqual(mockSuggestions);
  });
});
