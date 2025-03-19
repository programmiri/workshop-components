# 3. Aufgabe: [`EnergyManagementPanel`](../src/app/features/energy-management/EnergyManagementPanel.tsx)

👉 Ziel: Energieverteilungen flexibel steuern, State-Management aus der Komponente herauslösen und durch das Strategy 
Pattern offen für Erweiterungen machen.

## Problem

- `EnergyManagementPanel` hat zu viele Verantwortlichkeiten - "API" calls, States händeln, States und "Backend"
  updaten, Anzeigen...
  sie ist sogar die Source of Truth, wie die Energy verteilt werden soll!
- "Api"-Calls, View und State sind zusammengepackt.
- Die Tests waren wieder brüchig und ich musste die etwas unschön stabil bekommen (🚨)

## Aufgaben

Die Aufgaben sind drei geteilt:

- Die erste befasst sich vor allem mit dem Prinzip "Separation of Concerns"
- Die zweite befasst sich etwas mit "Inversion of Control"
- Die dritte (BONUS) arbeitet mit dem Strategy Pattern, um das Open-Closed Prinzip zu erfüllen - wir haben das nicht
  wirklich gesehen heute, also eine kleine Extra Aufgabe für die, die Lust drauf haben!

Du kannst natürlich alle zusammen lösen. Das Aufteilen in drei Schritte hilft meiner Meinung nach, etwas strukturierter
vorzugehen, aber in diesem Falle sind keine überraschenden Änderungen der Anforderungen eingebaut :) deshalb kann
das auch ein grosses Refactoring auf einmal sein!

## Hilfe im Code

- [`EnergyManagementPanel.tsx`](../src/app/features/energy-management/EnergyManagementPanel.tsx) ist ausführlich getestet
- Verwende die Tests als Check, ob alles wie gewollt funktioniert.
- Achtung: Veränder am besten keinen Text, semantische Struktur oder Rollen, da die Tests darauf aufbauen. Gleiches gilt für die Werte der Energieverteilung.
  -> es sei denn, du magst das machen, natürlich!

## 💡 Tipp fuur Einsteiger

- Versuche zunächst, den „aktiven Modus“ und die Logik zur Energieverteilung in eine separate Funktion auszulagern.
- Sobald das klappt, fällt dir der Schritt zum Context und schließlich zum Strategy Pattern viel leichter.
- Frage dich: „Wenn morgen ein Modus "Cloaking" dazu kommt — muss ich dann bestehenden Code anfassen?“ → Wenn ja,
  kannst du das Strategy Pattern gut anwenden.
-

## Aufgaben

## 1. Separation of Concerns - Logik kapseln

- `setMode` sollte wirklich nur das machen, was der Name sagt: Den neuen Modus setze.
- Lagern wir doch das Feststellen, welcher neue Modus verwendet werden soll, in eine Hilfsfunktion `getEnergyMode`
  aus, die nicht in der Komponente lebt.

## 2. Inversion of Control - Context und Custom Hook again!

(note: Du kannst das auch ohne Context machen)

- Die Komponente soll _keine_ Kontrolle über die Energieverwaltung haben.
- Sie soll:
  - Anzeigen, wie die aktuelle Verteilung ist
  - Dem User Möglichkeiten geben, die Verteilung zu ändern
- Kontrolle darüber sollte an eine übergeordnete Instance gegeben werden
- Ich empfehle einen Context mit einem custom Hook
- Am Ende wollen wir einen Hook, der uns gibt:
  - aktuellen Modus der Energieverteilung
  - die aktuelle Energieverteilung
  - eine Funktion, die Energieveteilung zu ändern

## Bonus: 3. Open-Closed Prinzip - Strategy Pattern

In Zukunft werden wir noch ganz viele Energie Modi hinzufügen. Je nachdem, wie ihr bisher umgesetzt habt, könnt
ihr das vielleicht schon ganz einfach - oder müsst bspw. die Funktion
`getEnergyMode` immer wieder anfassen dafür.

Dies kann ein guter Anwendungsfall für das Strategy Pattern sein!

Refaktoriere deine aktuelle Implementation, in dem du ein Strategy Pattern benutzt!

### Lesematerial

- https://gofore.com/en/advanced-react-hooks-the-strategy-pattern/
- https://www.creowis.com/blog/openclosed-principle-writing-scalable-code-in-react-cm6ss4ysh000409l78x7a7vt4

## Von Theorie zu Praxis

- diese Übungen haben aufgegriffen
  - Separation of Concerns mit Hilfe von custom Hooks
  - Inversion of Control (ein wenig) mit Hilfe eines Context
  - Open-Closed Prinzip mit einem Strategy Pattern
    - das ist ein Pattern aus der "Behavioral" Kategorie
