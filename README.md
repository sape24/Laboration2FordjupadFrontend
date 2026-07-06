# Att göra-lista (Todo List)

En single page application (SPA) byggd med react och vite. Applikationen kommunicerar med ett REST-API för att hantera en att göra lista genom ett responsivt gränssnitt med fullständig CRUD.

## Funktioner

- Hämta och visa alla todos
- Lägga till nya todos med validering
- Uppdatera status (ej påbörjad, pågående och avklarad)
- Ta bort todos
- Hantering av laddnings och felmeddelanden
- Responsiv design för desktop och mobil

## Tekniker

- React
- TypeScript
- Vite
- CSS (global, komponentspecifik och inline)
- .env

## Komponenter

| Komponent   | Beskrivning                                                    |
| ----------- | ---------------------------------------------------------------|
| App         | Huvudkomponent som sköter bland annat API-anropen.             |
| TodoForm    | Formulär för att lägga till nya todos med validering.          |
| TodoList    | Renderar listan av todos.                                      |
| TodoItem    | En enskild todo med statusväljare och ta bort knapp.           |


## Project Setup

```bash
npm install
```