import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { IssueListComponent } from './issue-list/issue-list.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, IssueListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'issue-tracker'`, () => {
    expect(app.title).toEqual('issue-tracker');
  });
});
