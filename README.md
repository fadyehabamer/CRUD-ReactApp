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
Requires Node.js 14+ (verified with Node 24).

```bash
npm install
npm start
```

### Scripts
| Command | Description |
| --- | --- |
| `npm start` | Start the dev server on http://localhost:3000 |
| `npm test` | Run the Jest / Testing Library tests |
| `npm run build` | Production build into `build/` |
