# Binary and decimal converter

An educational browser tool for converting non-negative integers between binary and decimal, with positional-notation/division steps, input validation, a direction toggle, and clipboard copying.

Originally built for school. Portfolio restoration adds the missing application layout, local UI components, TypeScript/build configuration, and a reproducible static export while retaining the original converter implementation.

## Run and build

Use Node.js 22 or later:

```sh
npm ci
npm run dev
npm run typecheck
npm run build
```

Open `http://localhost:3000` for development. The production build produces static files in `out/`; serve that directory with any static HTTP server. `next start` is not the deployment path for this static export.

## Structure

- `app/page.tsx`: converter logic and explanatory UI.
- `app/layout.tsx` / `app/globals.css`: application shell and styling.
- `components/ui/`: small native React UI primitives.
- `next.config.mjs`: static export and GitHub Pages base path.

## Limits

The calculations use JavaScript numbers and reject values outside the safe-integer range (0–9007199254740991). Fractions, negative values, arbitrary-precision calculations, and other number bases are outside this exercise. Clipboard access depends on browser permissions and secure context.

## License

The original [GPL license](LICENSE) is retained.

## Verification evidence

See [portfolio validation](docs/PORTFOLIO_VALIDATION.md) for checks performed and explicit limits.
