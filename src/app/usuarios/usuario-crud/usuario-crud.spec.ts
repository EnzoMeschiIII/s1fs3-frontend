import { render } from '@testing-library/angular';
import { UsuarioCrud } from './usuario-crud';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('UsuarioCrudComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(UsuarioCrud, {
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    expect(fixture.componentInstance).toBeTruthy();
  });
});
