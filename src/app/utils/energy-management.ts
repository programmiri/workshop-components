// Strategy Pattern in Aktion:
// - Jede Strategie hat einen key (technisch), ein label (anzeige im UI)
// und eine allocateEnergy Funktion.
// Damit erfüllen wir das Open-Closed-Prinzip:
// - Neue Strategien hinzufügen = einfach neues Objekt,
//   kein bestehender Code muss geändert werden

type EnergyAllocation = {
  shields: number;
  weapons: number;
  warpCore: number;
  lifeSupport: number;
};

type EnergyStrategy = {
  key: string;
  label: string;
  allocateEnergy: () => EnergyAllocation;
};

// Alle Strategien definieren
const NormalEnergy: EnergyStrategy = {
  key: "NORMAL",
  label: "NORMAL",
  allocateEnergy: () => ({
    warpCore: 30,
    shields: 25,
    lifeSupport: 25,
    weapons: 20,
  }),
};

const AttackEnergy: EnergyStrategy = {
  key: "ATTACK",
  label: "ANGRIFF",
  allocateEnergy: () => ({
    warpCore: 25,
    shields: 30,
    lifeSupport: 10,
    weapons: 35,
  }),
};

const EscapeEnergy: EnergyStrategy = {
  key: "ESCAPE",
  label: "FLUCHT",
  allocateEnergy: () => ({
    warpCore: 50,
    shields: 20,
    lifeSupport: 20,
    weapons: 10,
  }),
};

export type { EnergyStrategy };
export { NormalEnergy, AttackEnergy, EscapeEnergy };
