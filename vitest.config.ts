import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',  // necesario para Angular DOM
    coverage: {
      provider: 'v8',       // cobertura compatible con SonarQube
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage'
    }
  }
});
