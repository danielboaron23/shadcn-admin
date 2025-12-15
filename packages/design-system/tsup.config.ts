import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    core: 'src/core/index.ts',
    extended: 'src/extended/index.ts'
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    'react',
    'react-dom',
    '@radix-ui/*',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
    'lucide-react',
    'cmdk',
    'date-fns',
    'input-otp',
    'react-day-picker',
    'sonner'
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";'
    }
  },
  // Copy CSS files and type declarations to dist
  onSuccess: 'mkdir -p dist/styles && cp src/styles/*.css dist/styles/ && cp src/styles/index.d.ts dist/styles/'
})

