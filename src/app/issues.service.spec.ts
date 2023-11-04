import { TestBed } from '@angular/core/testing';

import { IssuesService } from './issues.service';
import { issues } from '../assets/mock-issues';
import { Issue } from './issue';

describe('IssuesService', () => {
  let service: IssuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a createIssue method', () => {
    expect(service.createIssue).toBeDefined();
  });

  it('should have a getPendingIssues method', () => {
    expect(service.getPendingIssues).toBeDefined();
  });

  it('should have a getSuggestions method', () => {
    expect(service.getSuggestions).toBeDefined();
  });

  it('should have a completeIssue method', () => {
    expect(service.completeIssue).toBeDefined();
  });

  it('should create an issue correctly', () => {
    const initialLength = issues.length;
    const newIssue: Issue = {
      priority: 'low',
      type: 'bug',
      title: 'New Issue',
      description: 'Test Description',
      issueNumber: 0,
    };
    service.createIssue(newIssue);
    expect(issues.length).toBe(initialLength + 1);
    expect(issues[issues.length - 1].issueNumber).toBe(initialLength + 1);
  });

  it('should complete an issue correctly', () => {
    const issueToComplete = { ...issues[0] };
    service.completeIssue(issueToComplete);
    const updatedIssue = issues.find(
      (issue) => issue.issueNumber === issueToComplete.issueNumber,
    );
    expect(updatedIssue?.completedAt).toBeDefined();
  });

  it('should get suggestions based on title', () => {
    const titleToMatch = 'Display';
    const suggestions = service.getSuggestions(titleToMatch);
    expect(suggestions.length).toBeGreaterThan(0);
    suggestions.forEach((issue) => {
      expect(issue.title.includes(titleToMatch)).toBeTruthy();
    });
  });

  it('should return empty array if title length is less than or equal to 3', () => {
    const suggestions = service.getSuggestions('Tes');
    expect(suggestions.length).toBe(0);
  });
});
