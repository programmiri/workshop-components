# Workshop Praxis Repp

## Skripte

- `pnpm install`, man kennt es!
  - solltest du kein pnpm haben, kannst du npm benutzen, eine Lock Datei dafür existiert.
  - Die Skripte starten dann mit `npm run`
- `pnpm dev`, App läuft dann unter: http://localhost:5173/
- `pnpm lint` fürs Linting
- `pnpm reformat` für Code Formatierung
- `pmpm test` um die Tests laufen zu lassen

## Tech Stack

- TypeScript
  - 📃 [Documentation](https://www.typescriptlang.org/)
  - 🐙 [repository](https://github.com/microsoft/TypeScript)
- React
  - 📃 [Documentation](https://reactjs.org/docs/getting-started.html)
  - 🐙 [code](https://github.com/facebook/react/)
- Vite
  - 📃 [Documentation](https://vitejs.dev/guide/)
  - 🐙 [code](https://github.com/vitejs/vite)
- Jest
  - 📃 [Documentation](https://jestjs.io/docs/getting-started)
  - 🐙 [code](https://github.com/facebook/jest)
- React Testing Library
  - 📃 [Documentation](https://testing-library.com/docs/react-testing-library/intro/)
  - 🐙 [code](https://github.com/testing-library/react-testing-library)

⚠️ Um die App möglichst einfach benutzbar zu machen in diesem Workshop, gibt es keine weiteren Libraries wie Store. Es
gibt auch kein Backend oder echte Apis die wir benutzen.

## Die App

Wir arbeiten an einer LCARS ("Library Computer Access/Retrieval System") basierte App, die es uns ermöglicht:

- Status der Systeme zu checken
- Die Energieverwaltung des Schiffes zu sehen und zu ändern

## Das Repo

Alle wichtigen Teile findet ihr im `/src` Ordern:

### `api`

Hier findet ihr `sensor.ts` und `energy.ts`, die so tun als würden sie mit einer echten Api sprechen. Hier am besten
nichts ändern, da Tests und Test Mocks darauf angepasst sind.

### `app`

Hier findet ihr alles relevant für unser Web App. Die Ordner Struktur ist wie folgt gedacht:

### `app/components`

Alle UI Element in Form von React Komponenten, die in verschiedenen Bereichen der App genutzt werden können. Sie
sollten unabhängig von Geschäftslogik sein.

### `app/context-provider`

Dieser Ordner ist (noch) leer, später könnten hier die Context / Provider liegen.

### `app/features`

Hier wird Code zusammengefasst, der zu einem Feature gehört. Die Ordner auf erster Ebene sind nach dem Feature
benannt. Auf erster Ebenen in diesem Ordner sollte eine tsx Datei liegen, die heisst wie der Ordner. Dies ist die
einzige Datei, die ausserhalb des Feature Ordners verwendet werden sollte. Der Feature Ordner kann Unterordner haben,
hier bspw. "components", in dem alle Komponenten gelagert sind, die das Feature zusammen bauen. Hier könnte bswp.
auch ein "utils" Ordner liegen.

### `app/hooks`

Dieser Ordner ist für unsere eigenen Hooks gedacht. Auf dieser Ebenen direkt sollte nur Hooks liegen, der Dateiname ist der Hookname.

### `app/layout`

Hier liegen Komponenten, die sich strikt mit Layout beschäftigen.

### `app/pages`

Hier liegen die Eingangskomponenten für eine bestimmte Seite, dies könnte der Routing Struktur entsprechen. Wir haben nur eine Startseite, deshalb liegt da nur die `index.ts`

## Die Aufgaben

Ich habe 3 Aufgaben / Übungen definiert und in eigenen Docs beschrieben. Sie können in beliebiger Reihenfolge erledigt werden! Sucht euch raus, was ihr gerne als erstes / generell machen möchtet und los geht's 🚀

- [Composition Pattern Aufgabe](_aufgaben/1-composite-pattern.md)
- [Factory Pattern Aufgabe](_aufgaben/2-factory-pattern.md)
- [Strategy Pattern Aufgabe](_aufgaben/3-strategy-pattern.md)
