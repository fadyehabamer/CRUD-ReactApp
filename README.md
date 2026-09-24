# CRUD React App
> CRUD operations application built with React.js

### Features
- Add employees
   - name , address , department , salary
- Edit employees data
- Remove employeess data
- Sort ascending by salary
- Filter employee's salary > 2500 (toggle, nothing is deleted)

**Live demo:** https://crud-employee-react.vercel.app

Data lives in component state only, so it resets when the page reloads.

### Getting started
Built with [Vite](https://vite.dev) and React 19. Requires Node.js 22.12+ (the dev server and build also run on 20.19+; the Vitest test runner needs 22.12+).

```bash
npm install
npm run dev
```

### Scripts
| Command | Description |
| --- | --- |
| `npm run dev` (or `npm start`) | Start the Vite dev server on http://localhost:3000 |
| `npm test` | Run the Vitest / Testing Library tests (watch mode; `npm test -- --run` for a single run) |
| `npm run lint` | Lint with ESLint (flat config, CRA rule set) |
| `npm run build` | Production build into `build/` |
| `npm run preview` | Serve the production build locally |
