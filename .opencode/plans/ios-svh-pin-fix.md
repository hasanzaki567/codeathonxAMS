# Fix — iOS Safari scroll jump / white-gap in the pinned Hero/About/Patrons stage

## Root cause (confirmed by reading the real files)

`App.tsx` links the hero → about → patrons mirror as a single pinned scroll
stage. The connect between them is built with dynamic-viewport units:

- `src/App.tsx:35` `.about-stage relative h-2x-dvh`  (stage where About is pinned)
- `src/App.tsx:38` `.patrons-stage ... neg-mt-screen-dvh` (pulled up over About)
- `src/components/About.tsx:9` `About` is `sticky top-0 min-h-screen-dvh` inside that stage

implemented by three utilities in `src/index.css`:

```css
h-2x-dvh          { height: 200dvh; }      /* index.css:42 */
neg-mt-screen-dvh { margin-top: -100dvh; } /* index.css:46 */
min-h-screen-dvh  { min-height: 100dvh; }  /* via Tailwind dvh */
```

### Why iOS Safari breaks

`dvh` on iPhone Safari is **live**: its value changes continuously as the
top/bottom toolbar (address bar + home indicator) collapses or expands while the
user scrolls. Three things on the page are measured in `dvh`, and they combine
into one reflow chain:

1. The hero section uses `h-2x-dvh` (200dvh) as the About **stage height**.
2. `About` is `position: sticky` at `min-height: 100dvh` pinned inside it.
3. The following section is pulled up with `margin-top: -100dvh` so it overlaps.

The telescoping pin collapses precisely on the boundary between the About
(sticky) stage and the next section. When you keep dragging downward past that
boundary while Safari's toolbar is mid-resize, `dvh` re-evaluates → the 200dvh
height and the −100dvh offset both move → the document's total height changes
while you are holding a scroll gesture. That produces exactly the recorded
behaviour:

- the pinned section temporarily *drops out* (blank/pale stretch),
- the browser's scroll anchoring re-fixes the offset → the page "jumps" to a
  different scroll position,
- no visible navigation/reload (it is a re-layout, not a page load),
- desktop is unaffected (dvh is constant there).

## The fix (CSS only, no redesign, no scroll containers)

Pin the stage geometry to the **stable** `svh` unit instead of `dvh`. `svh` is
anchored to the *small* viewport (toolbar always visible) and never changes on
iOS, so the 200svh stage + −100svh overlap stay constant while scrolling →
native pull-free document scroll, no mid-scroll height change, no jump.
On desktop `svh === vh`, so desktop is byte-for-byte identical.

Two utilities in `src/index.css`:

```diff
 @utility h-2x-dvh {
-  height: 200dvh;
+  height: 200svh;
 }

 @utility neg-mt-screen-dvh {
-  margin-top: -100dvh;
+  margin-top: -100svh;
 }
```

One class in `src/components/About.tsx` (line 9, so the sticky child and its
200svh parent share the same stable unit — keeps About sticky working):

```diff
-    <section id="about" className="about sticky top-0 z-20 flex min-h-screen-dvh flex-col justify-center bg-paper py-16 sm:py-24">
+    <section id="about" className="about sticky top-0 z-20 flex min-h-screen-svh flex-col justify-center bg-paper py-16 sm:py-24">
```

No other file changes. Hero/Events keep their `dvh` viewport-fit
`min-h-screen-dvh` (genuine dynamic-viewport usage). Ferrofluid, SplashCursor,
WarpText, Reveal and all framer-motion animations are untouched.

## Verification

1. `npx tsc --noEmit -p tsconfig.json`
2. `npm run build`
3. Scroll on physical iPhone Safari through the About/Patron stage repeatedly on
   the page top; confirm no blank band nor scroll jump alert; confirm desktop
   unchanged.

## Notes / alternatives considered

- `overscroll-behavior-y: none` was already added to html earlier (index.css:89);
  it is necessary but not the whole story — the disable-stretch is only
  effective when the layout doesn't reflow underneath the gesture. `svh` is what
  removes the reflow.
- Keeping `dvh` is safe only if every element measured by the same unit changes
  in lockstep; mixing a 200dvh stage with a −100dvh overlap breaks that lockstep
  on iOS. `svh` removes the dependency entirely.
