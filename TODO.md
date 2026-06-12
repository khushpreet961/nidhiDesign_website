# TODO

- [x] Update `src/app/layout.js`
  - [x] Reorder layout to render `<Navbar />`, then `{children}`, then `<Footer />`.
  - [x] Add top padding so fixed navbar doesn’t cover page content.


- [x] Uplift/fix `src/app/Components/Navbar.jsx`
  - [x] Add backdrop + click-outside to close mobile drawer.
  - [x] Add ESC to close drawer and lock body scroll while open.
  - [x] Add accessibility attributes (aria-expanded/aria-controls).
  - [x] Stabilize header padding/transition to reduce jumpiness.
  - [x] Minor JSX formatting cleanup.


- [ ] Verify
  - [ ] Run `npm run dev` and smoke test desktop + mobile.

