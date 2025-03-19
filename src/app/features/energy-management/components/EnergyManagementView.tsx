import { EnergyStrategy } from "src/app/utils/energy-management.ts";

type Props = {
  activeEnergyStrategy: EnergyStrategy;
};

// Rein für View zuständig!
// (Dumb component)
function EnergyManagementView({ activeEnergyStrategy }: Props) {
  const currentAllocation = activeEnergyStrategy.allocateEnergy();

  const modeClass = () => {
    if (activeEnergyStrategy.key === "NORMAL") {
      return "text-success";
    }
    if (activeEnergyStrategy.key === "ATTACK") {
      return "text-danger";
    }

    if (activeEnergyStrategy.key === "ESCAPE") {
      return "text-sky";
    }
    return "";
  };

  return (
    <div>
      <div className={"py-4 d-flex gap-2 lead"}>
        <div>Aktueller Modus:</div>

        <div className={modeClass()}>
          <strong>{activeEnergyStrategy.label}</strong>
        </div>
      </div>
      <ul className={"list-group list-group-flush mb-5"}>
        <li className={"list-group-item"}>
          <span aria-hidden={true} className={"me-3"}>
            🛡
          </span>
          <span className={"me-3"}>Schilde: </span>
          <span className={"text-black fw-bold bg-secondary rounded p-2"}>
            {currentAllocation.shields}%
          </span>
        </li>
        <li className={"list-group-item"}>
          <span aria-hidden={true} className={"me-3"}>
            🔫
          </span>
          <span className={"me-3"}>Waffen:</span>
          <span className={"text-black fw-bold bg-secondary rounded p-2"}>
            {currentAllocation.weapons}%
          </span>
        </li>
        <li className={"list-group-item"}>
          <span aria-hidden={true} className={"me-3"}>
            🚀
          </span>
          <span className={"me-3"}>Warp Kern:</span>
          <span className={"text-black fw-bold bg-secondary rounded p-2"}>
            {currentAllocation.warpCore}%
          </span>
        </li>
        <li className={"list-group-item"}>
          <span aria-hidden={true} className={"me-3"}>
            😮‍💨
          </span>
          <span className={"me-3"}>Lebenserhaltung:</span>
          <span className={"text-black fw-bold bg-secondary rounded p-2"}>
            {currentAllocation.lifeSupport}%
          </span>
        </li>
      </ul>
    </div>
  );
}

export { EnergyManagementView };
