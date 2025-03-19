import React, { createContext, useContext, useId, useState } from "react";
import clsx from "clsx";

/**
 *
 * Composite Pattern (mit Compound Components)
 * & Inversion of Control
 *
 **/

// Wir definieren einen Typ für Tabs, damit klar ist, was jedes Tab beschreibt
type TabDefinition = {
  key: string;
  label: string;
};

// ✅API der Haupt-Komponent LCARSTabs
// - Bietet die umschließende Struktur
// - Definiert statische Properties (List, Tab, Panels, Panel) für Compound Components
type LCARSTabs = React.FC<{
  children: React.ReactNode;
  defaultTabKey: TabDefinition["key"];
}> & {
  List: typeof TabList;
  Tab: typeof Tab;
  Panels: typeof TabPanels;
  Panel: typeof TabPanel;
};

// ✅ Context für Inversion of Control
// - Die Tabs selbst kontrollieren den aktiven Tab nicht mehr direkt.
// - Stattdessen wird die Logik ausgelagert und von einem zentralen Provider gesteuert.
// - Die Kontrolle wird von den Tabs abgegeben.
const TabsContext = createContext<{
  activeKey: string | null;
  setActiveKey: (key: string) => void;
}>({
  activeKey: null,
  setActiveKey: () => {},
});

// ✅ Provider-Komponente
// - Kapselt State-Logik und stellt diese via Context zur Verfügung
// - Inversion of Control: Die State-Verwaltung passiert hier, nicht in den Tab Komponenten
// - Interne "setActiveKey" kann jetzt erweitert werden, ohne die Tab Komponenten zu verändern.
// - Das ist das Open/Closed Prinzip!
// - Mögliche Erweiterungen wären:
//   - Ein Analytik Event aufrufen
//   - Api Abruf bei Tab Click
//   - URL Updates (für Deep Links)
function TabsProvider({
  defaultTabKey,
  children,
}: {
  defaultTabKey: string;
  children: React.ReactNode;
}) {
  const [activeKeyInternal, setActiveKeyInternal] = useState<string | null>(
    defaultTabKey ?? null
  );

  function setActiveKey(key: string) {
    setActiveKeyInternal(key);
  }

  return (
    <TabsContext.Provider
      value={{ activeKey: activeKeyInternal, setActiveKey }}
    >
      {children}
    </TabsContext.Provider>
  );
}

// ✅ View-Only Komponente für Tab-Leiste
// - "Dumb" Component
const LCARSTabs: LCARSTabs = ({ children, defaultTabKey }) => {
  return (
    <TabsProvider defaultTabKey={defaultTabKey}>
      <div className="container mt-4">{children}</div>
    </TabsProvider>
  );
};

// ✅ View-Only Komponente für Tab-Liste
// - "Dumb" Component
function TabList({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="nav nav-custom nav-pills" role="tablist" aria-label={label}>
      {children}
    </div>
  );
}

// ✅ Tab Button
// - Fragt den aktuellen aktiven Tab aus dem Context ab und reagiert darauf
// - Ändert bei Klick den aktiven Tab (weiss aber nicht, was sonst noch passiert)
// - Trennung von Logik (Context) und Darstellung (Button)
function Tab({ tab }: { tab: TabDefinition }) {
  const { activeKey, setActiveKey } = useContext(TabsContext);

  return (
    <button
      className={clsx("nav-link", activeKey === tab.key && "active")}
      id={`tab-${tab.key}`}
      role="tab"
      aria-controls={`panel-${tab.key}`}
      aria-selected={activeKey === tab.key ? "true" : "false"}
      onClick={() => setActiveKey(tab.key)}
    >
      {tab.label}
    </button>
  );
}

// ✅ Container für alle Panels
// - Rein visuelles Layout ohne Logik
// - "Dumb" Component
function TabPanels({ children }: { children: React.ReactNode }) {
  return <div className="mt-5">{children}</div>;
}

// ✅ Ein Panel für den jeweiligen Tab
// - Zeigt Inhalte nur, wenn der aktive Key übereinstimmt
// - Nutzt useId für gute Accessibility
function TabPanel({
  tabKey,
  headline,
  children,
}: {
  tabKey: string;
  headline: string | React.ReactElement;
  children: React.ReactNode;
}) {
  const headerId = useId();
  const { activeKey } = useContext(TabsContext);

  return activeKey === tabKey ? (
    <div
      id={`panel-${tabKey}`}
      role="tabpanel"
      aria-labelledby={`tab-${tabKey}`}
    >
      <section aria-labelledby={headerId}>
        <h1 className="mb-5" id={headerId}>
          {headline}
        </h1>
        <hr role="presentation" />
        {children}
        <hr role="presentation" />
      </section>
    </div>
  ) : null;
}

LCARSTabs.List = TabList;
LCARSTabs.Tab = Tab;
LCARSTabs.Panels = TabPanels;
LCARSTabs.Panel = TabPanel;

export { LCARSTabs };

export type { TabDefinition };
