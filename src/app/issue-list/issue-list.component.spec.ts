import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueListComponent } from './issue-list.component';
import { IssuesService } from '../issues.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Mock } from '@testing-library/angular/jest-utils';

describe('IssueListComponent', () => {
  let component: IssueListComponent;
  let fixture: ComponentFixture<IssueListComponent>;
  let mockIssuesService: IssuesService;

  beforeEach(async () => {
    mockIssuesService = {
      getPendingIssues: jest.fn(),
      completeIssue: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [IssueListComponent],
      providers: [{ provide: IssuesService, useValue: mockIssuesService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(IssueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPendingIssues on init', () => {
    expect(mockIssuesService.getPendingIssues).toHaveBeenCalled();
  });

  it('should call completeIssue on onConfirm', () => {
    component.selectedIssue = {
      issueNumber: 5,
      title: '',
      description: '',
      priority: 'low',
      type: 'bug',
    };
    component.onConfirm(true);
    expect(mockIssuesService.completeIssue).toHaveBeenCalled();
  });

  it('should not call completeIssue on onConfirm if not confirmed', () => {
    component.selectedIssue = {
      issueNumber: 4,
      title: '',
      description: '',
      priority: 'medium',
      type: 'feature',
    };
    component.onConfirm(false);
    expect(mockIssuesService.completeIssue).not.toHaveBeenCalled();
    expect(component.selectedIssue).toBeUndefined();
  });
});
