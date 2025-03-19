# 1 Aufgabe: `LCARSTabs` verbessern in [`LCARS-console`](../src/app/features/LCARS-console/LCARSConsole.tsx)

👉 Ziel: Die Komponente LCARSTabs entkoppeln, Logik auslagern und die Darstellung in wiederverwendbare Compound Components aufteilen.

## Problem

- `LCARSTabs` hat zu viel Verantwortlichkeiten - Navigation händeln, Darstellung der Inhalte, State halten.
- Dadurch ist `LCARSTabs` schwierig zu erweitern, da Logik, State und UI Vorgaben stark verknüpft sind.
- `LCARSTabs` hat viel redundanten Inhalt - eine Menge `div` und `button` werden in fast gleicher Form wiederholt -
  das macht es unübersichtlich.

Aktuell funktioniert das. Erweiterungen und Änderungen sind aber schwierig:

- Was, wenn wir später mal den State bspw. aus einer URL steuern wollen?
- Was, wenn wir die gleiche Art der Tabs später für eine weitere Seite benutzen wollen?

## Aufgabe

### Refactoring -> Compound Components

Refaktoriere die LCARSTabs-Komponente zu einem flexiblen Compound Component Pattern.

- `LCARSTabs` soll weniger Kontrolle übernehmen.
- Wiederverwendbare Komponenten wie `TabList`, `Tab` etc. bereitstellen.
  -> diese sollen sich nur um den View kümmern!

## Hilfe im Code

- [`LCARSConsole.tsx`](src/app/features/LCARS-console/LCARSConsole.tsx) ist ausführlich getestet
- Verwende die Tests als Check, ob alles wie gewollt funktioniert.
- Achtung: Veränder am besten keinen Text, semantische Struktur oder Rollen, da die Tests darauf aufbauen.
  -> es sei denn, du magst das machen, natürlich!

## 💡 Tipp für Einsteiger

- Starte damit, alle „harten“ UI-Strukturen zu identifizieren (z.B. Button-Listen und Panels).
- Überlege dann, welche Elemente nur View-Komponenten sein könnten und welche State/Logik brauchen.
- Danach Schritt für Schritt Context und Compound Components einbauen.

## Lesematerial

- https://hackernoon.com/lang/de/So-vereinfachen-Sie-die-Statusverwaltung-mit-der-ReactJS-Context-API-%E2%80%93-ein-Tutorial
- https://www.patterns.dev/react/compound-pattern/
- https://dev.to/gabrielduete/mastering-compound-components-building-flexible-and-reusable-react-components-3bnj
- https://kentcdodds.com/blog/compound-components-with-react-hooks

Im PDF kannst du in den Slides zum Composite Pattern noch mehr Infos finden.

## Vorschlag

So könnte die **Verwendung** in `LCARSConsole` am Ende aussehen:

```tsx
<LCARSTabs>
  <TabList>
    <Tab index={0}>Start</Tab>
    <Tab index={1}>Engineering</Tab>
    <Tab index={2}>Energy Management</Tab>
  </TabList>

  <TabPanels>
    <TabPanel index={0}>
      <h1>Hallo, nugneH, shacha, peldor joi</h1>
      <p>Sternenflotten-Hauptsystem online.</p>
    </TabPanel>

    <TabPanel index={1}>
      <h1>Engineering</h1>
      <EngineeringPanel />
    </TabPanel>

    <TabPanel index={2}>
      <h1>Energy Management</h1>
      <EnergyManagementPanel />
    </TabPanel>
  </TabPanels>
</LCARSTabs>
```

Oder, für noch bessere Leserlichkeit bzw. Abbildung eurer Intention:

```tsx
<LCARSTabs>
  <LCARSTabs.TabList>
    <LCARSTabs.Tab index={0}>Start</LCARSTabs.Tab>
    <LCARSTabs.Tab index={1}>Engineering</LCARSTabs.Tab>
    <LCARSTabs.Tab index={2}>Energy Management</LCARSTabs.Tab>
  </LCARSTabs.TabList>

  <LCARSTabs.TabPanels>
    <LCARSTabs.TabPanel
      index={0}
      headline={"Hallo, nugneH, shacha, peldor joi"}
    >
      <h1></h1>
      <p>Sternenflotten-Hauptsystem online.</p>
    </LCARSTabs.TabPanel>

    <LCARSTabs.TabPanel index={1} headline={"Engineering"} as={"section"}>
      <EngineeringPanel />
    </LCARSTabs.TabPanel>

    <LCARSTabs.TabPanel
      index={2}
      headline={"Energie Management"}
      as={"section"}
    >
      <EnergyManagementPanel />
    </LCARSTabs.TabPanel>
  </LCARSTabs.TabPanels>
</LCARSTabs>
```

## Kleines Extra

- `index` als Identifikation von einem Tab kann man machen, sieht aber etwas roh aus
- Die Kontrolle kann in `LCARSTabs` liegen - oder sogar woanders? (Inversion of Control)
- Was ist, wenn wir wissen, dass bald mehr passieren muss, wenn ein User auf einen Tab klickt (z.b. ein Analytic
  Event getriggert wird? Können wir uns darauf vorbereiten? (Open/CLosed Prinzip)

## Von Theorie zu Praxis

- Diese Übung arbeitet mit dem Composite Pattern.
  - Es ist ein Pattern aus der "Structural" Kategorie.
- Wir haben Separation of Concerns erreicht mit smart/dumb Components.
- Wir können Inversion of Control anwenden, indem `LCARSTabs` die Kontrolle über den Tab-State nach aussen abgibt (bswp. in einen Context Provider).
