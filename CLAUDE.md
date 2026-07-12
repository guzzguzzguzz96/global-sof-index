# Global SOF Index — Project Rules

## Stack
- Next.js App Router
- JavaScript / JSX only
- Do not introduce TypeScript
- Global CSS is currently maintained in `app/globals.css`

## Layout
- Main content width is centered at a maximum of 1200px via `--content-max`
- Preserve responsive layouts at 1120px, 880px, and 620px breakpoints

## Data integrity
- Every unit must have a unique `id` and `slug`
- Unit codes are not globally unique: examples include SBS and GIS
- Expanded dossiers must be matched by both country and code
- Never use `code` alone as a React key or database identity

## Content
- Separate verified, documented, reported, historical, and unknown claims
- Do not invent weapon, uniform, personnel, or operational details
- Keep the project educational and open-source-reference focused

## Before proposing a change
1. Run `npm run build`
2. Check the browser console for duplicate-key and hydration warnings
3. Verify `/`, `/units/british-sbs`, and `/units/ghana-sbs`
