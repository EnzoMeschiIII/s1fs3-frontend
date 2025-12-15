import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '',
})
class AppComponentStub {}

describe('AppComponent minimal', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponentStub], 
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AppComponentStub);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
