import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts', '!**/*.test.ts', '!**/*.d.ts'],
  format: ['cjs'],
  clean: true,
  dts: true,
  bundle: false,
  sourcemap: true,
  silent: true,
});
