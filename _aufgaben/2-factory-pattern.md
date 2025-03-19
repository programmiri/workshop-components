# 2. Aufgabe: [`EngineeringPanel`](../src/app/features/engineering/EngineeringPanel.tsx) aufräumen und verbessern

👉 Ziel: Sensor-Status-Anzeigen modularisieren und die Datenverarbeitung flexibel machen, indem Factory Functions verwendet werden.

## Problem

`EngineeringPanel` sieht ziemlich messy aus 😅

- Aktuell hat `EngineeringPanel` zu viele Verantwortlichkeiten (State, API-Calls, Anzeige).
- Wir machen oft das gleiche mit sehr wenig Änderungen - das ist unübersichtlich.
- - Die Tests waren brüchig und ich musste die etwas unschön stabil bekommen (🚨 oft ein schlechtes Zeichen)
- Die Tests sind nicht gründlich genug darin, jeden möglichen Zustand zu testen, weil sie so müsig zu schreiben
  waren (auch ein schlechtes Zeichen!).

Aktuell funktioniert das. Erweiterungen und Änderungen sind aber schwierig:

- Wenn ich einen neuen Status hinzufügen möchte, wird die Komponente noch unübersichtlicher.
- Der Test ist jetzt schon brittle, ich befürchte, mit Erweiterungen wird er instabil.

## Aufgaben

Die Aufgaben sind zweigeteilt! Die erste befasst sich vor allem mit dem Prinzip "Separation of Concerns". Bei der
zweiten wenden wir das "Factory" Pattern an. Sie bauen aufeinander auf, wenn du also nur eine lösen möchtest, am besten die erste.

Du kannst natürlich beide zusammen lösen. Das Aufteilen in zwei Schritte hilft meiner Meinung nach, strukturierter
vorzugehen und ich würde es empfehlen. Und es entspricht auch mehr dem echten Leben :D

### 1. Refactoring -> Custom Hook

Lass uns sehen, ob wir eine bessere _Separation of Concerns_ erreichen können. Die Logik sollte getrennt werden vom View.

- Die leere Datei `useSensor.tsx` könnte da helfen!

## Hilfe im Code

- [`EngineeringPanel`](../src/app/features/engineering/EngineeringPanel.tsx) ist ausführlich getestet.
- Verwende die Tests als Check, ob alles wie gewollt funktioniert.
- Achtung: Veränder am besten keinen Text, semantische Struktur oder Rollen, da die Tests darauf aufbauen.
  -> es sei denn, du magst das machen, natürlich!

#### Lesematerial

- https://react.dev/learn/reusing-logic-with-custom-hooks
- https://www.freecodecamp.org/news/how-to-create-react-hooks/

## Von Theorie zu Praxis

- Wir haben vor allem Separation of Concerns betrieben!

### 2. Refactoring -> Wir brauchen mehr Hooks!

Wir haben neue Sensoren-Apis! Wenn du in [`/src/api/sensors.ts`](../src/api/sensors.ts) nachsiehst, findest du die `
[X]StatusSecond` "Api"-Funktionen.

- Tausche alle aus -> bswp. `getWarpCoreStatusFirst` mit `getWarpCoreStatusSecond`.
- Im Test sind Mocks für diese Funktionen schon bereit, du musst sie nur einkommentieren.
- Jetzt funktioniert das alles nicht mehr so ganz, da sich die Datenstruktur geändert hat...

Wir sollten die Daten weniger generisch verarbeiten.

Lass uns das **Factory Pattern** anwenden, um einfach und schnell Hooks für jedes Sensoren System zu erzeugen:

- Eine Funktion (oder Klasse) die uns Custom Hooks je Sensoren Typ erzeugen kann.
- Der Hook kann einen default State erhalten.
- Der Hook gibt die korrekt formatierten Daten zurück, die sich je Sensoren Typ unterscheiden können.

## 💡 Tipp:

Wenn die Datenstrukturen kompliziert werden, lohnt es sich, für jeden Sensortyp genau zu überlegen, wie man die Daten transformiert.
Factory Functions helfen, das an einer einzigen Stelle zu kapseln.

## Lesematerial

- https://dev.to/pietmichal/react-hooks-factories-48bi
- https://medium.com/@ignatovich.dm/factory-functions-in-react-creating-reusable-components-and-logic-4af026e434d8

Im PDF kannst du in den Slides zum Open-Closed Prinzip noch mehr Infos finden.

## Von Theorie zu Praxis

- Diese Übung arbeitet mit dem Factory Pattern.
  -> Es ist ein Pattern aus der "Creational" Kategorie.
- In gewisser Weise kam das Open/Closed Prinzip zur Abwendung, denn mit der Factory können wir für jeden Sensor
  einen neuen Hook erstellen, ohne die bestehende Funktion oder Komponente zu verändern.
