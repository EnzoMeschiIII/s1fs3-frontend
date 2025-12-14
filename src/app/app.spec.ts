import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  template: '' // nada de HTML ni dependencias
})
class AppComponentStub {
  logout = () => {};
}

describe('AppComponent minimal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponentStub],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AppComponentStub);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
