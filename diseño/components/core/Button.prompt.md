# Button

Rustic Andean action button for Capachica. Five variants; three sizes; icon support.

```jsx
<Button variant="primary" size="md">Reservar ahora</Button>
<Button variant="secondary" href="/destinos">Ver destinos</Button>
<Button variant="ghost" size="sm" icon="→">Saber más</Button>
<Button variant="danger" size="sm">Cancelar</Button>
<Button variant="lake" size="lg">Explorar el lago</Button>
```

**Variants**: `primary` (clay gradient), `secondary` (gold outline), `ghost` (muted border), `danger` (dark clay), `lake` (blue gradient)

**Sizes**: `sm` 4px radius · `md` 6px radius · `lg` 8px radius

**Notes**: Renders as `<a>` when `href` is provided. No pill borders — keep borderRadius ≤8px to maintain the rustic angular feel.
