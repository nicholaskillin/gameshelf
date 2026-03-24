# Frontend Architecture

## Component Mounting (Stimulus + React)

ERB views mount React components via data attributes:

```erb
<div data-controller="react-component"
     data-react-component="Views/Games/Index"
     data-react-props="<%= { games: @games }.to_json %>">
</div>
```

`ReactComponentController` (Stimulus) reads the attribute, looks up the component in `AppProvider`'s registry, and mounts it with the given props.

## Component Registry (`AppProvider.tsx`)

```ts
'Views/Games/Index'      // Games list (sortable)
'shared/ProfileHeader'   // User profile header
'shared/NewGameModal'    // BGG search + add game
'Games/GameDetailsModal' // Game detail popup
'delete_user_button'     // Account deletion
```

Apollo Client is configured here:
- HTTP link to `/graphql/`
- CSRF token from `<meta name="csrf-token">`
- `credentials: 'same-origin'`

## Key Components

**`NewGameModal.tsx`**
1. User types a search term
2. Fetches XML from `https://www.boardgamegeek.com/xmlapi2/search`
3. User selects a game from results
4. Fires `CREATE_GAME` GraphQL mutation with game + categories + mechanics

**`Views/Games/Index.tsx`**
- Sortable by title or play time
- Renders `GameCard` components
- Opens `GameDetailsModal` on click

## Conventions

- New components: `.tsx` / `.ts`
- Legacy components (`.jsx` / `.js`): leave as-is
- Path aliases: `components/`, `modules/`, `hooks/`
- Bootstrap utility classes over custom CSS
- No semicolons (ESLint airbnb base, `semi: 0`)
