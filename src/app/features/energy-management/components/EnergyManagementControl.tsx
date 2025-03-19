import {
  AttackEnergy,
  EnergyStrategy,
  EscapeEnergy,
  NormalEnergy,
} from "src/app/utils/energy-management.ts";

type Props = {
  setEnergyStrategy: (strategy: EnergyStrategy) => void;
};

// Rein für View zuständig!
// (Dumb component)
function EnergyManagementControl({ setEnergyStrategy }: Props) {
  return (
    <div className={"d-flex gap-3 justify-content-center"}>
      <button
        className={"btn btn-moonlit-violet btn-lg"}
        onClick={() => setEnergyStrategy(NormalEnergy)}
      >
        <span aria-hidden={true}>🔄</span> Normal
      </button>
      <button
        className={"btn btn btn-moonlit-violet btn-lg"}
        onClick={() => setEnergyStrategy(AttackEnergy)}
      >
        <span aria-hidden={true}>🚀</span> Angriff
      </button>
      <button
        className={"btn btn btn-moonlit-violet btn-lg"}
        onClick={() => setEnergyStrategy(EscapeEnergy)}
      >
        <span aria-hidden={true}>🏃</span> Flucht
      </button>
    </div>
  );
}

export { EnergyManagementControl };
