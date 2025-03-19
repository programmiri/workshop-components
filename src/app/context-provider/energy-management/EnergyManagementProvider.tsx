// Strategy Provider!
import React, { createContext, useContext, useState } from "react";
import {
  EnergyStrategy,
  NormalEnergy,
} from "src/app/utils/energy-management.ts";
import { updateEnergyDistribution } from "src/api/energy.ts";

// Context + Provider + Strategy Pattern
// - Separation of Concerns:
//   Die Logik zur Steuerung der Energieverteilung liegt nicht mehr in der UI.
// - Inversion of Control:
//   Die Komponente übergibt die Kontrolle an diesen Provider.
// - Strategy Pattern: Jede Verteilungsstrategie (Normal, Angriff, Flucht)
//   ist als eigenständige Strategie definiert.

// Der Context stellt die Strategie und eine Methode zur Änderung bereit
const EnergyContext = createContext<
  | {
      strategy: EnergyStrategy;
      setStrategy: (strategy: EnergyStrategy) => void;
    }
  | undefined
>(undefined);

// Proxy Hook zur Nutzung der Strategie
function useEnergyStrategy() {
  const context = useContext(EnergyContext);
  if (!context) {
    throw new Error("useEnergyStrategy must be used within an EnergyProvider");
  }
  return context;
}

// Provider: Verwaltet die aktuelle Strategie & kümmert sich um Updates in der "API"
function EnergyProvider({ children }: { children: React.ReactNode }) {
  const [strategy, setStrategyInternal] =
    useState<EnergyStrategy>(NormalEnergy);

  // 👉 Bei einer Strategie-Änderung wird sofort der State aktualisiert
  // & die "API" benachrichtigt
  const setStrategy = async (newStrategy: EnergyStrategy) => {
    /// Strategie entscheidet selbst, wie Energie verteilt wird
    const allocation = newStrategy.allocateEnergy();
    setStrategyInternal(newStrategy);
    await updateEnergyDistribution(allocation); // Update im "Backend"
  };

  return (
    <EnergyContext.Provider value={{ strategy, setStrategy }}>
      {children}
    </EnergyContext.Provider>
  );
}

export { EnergyProvider, useEnergyStrategy };
