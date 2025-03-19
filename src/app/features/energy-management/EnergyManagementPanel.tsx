import { useState, useEffect } from "react";
import {
  fetchEnergyDistribution,
  updateEnergyDistribution,
} from "src/api/energy";

type EnergyModus = "normal" | "attack" | "escape";
function EnergyManagementPanel() {
  const [energyModus, setEnergyModus] = useState<EnergyModus>("normal");
  const [energy, setEnergy] = useState({
    warpCore: 30,
    shields: 25,
    lifeSupport: 25,
    weapons: 20,
  });

  useEffect(() => {
    async function loadEnergy() {
      const data = await fetchEnergyDistribution();
      setEnergy(data);
    }
    loadEnergy();
  }, []);

  async function setMode(mode: EnergyModus) {
    let newEnergy;
    if (mode === "normal") {
      newEnergy = { warpCore: 30, shields: 25, lifeSupport: 25, weapons: 20 };
    } else if (mode === "attack") {
      newEnergy = { warpCore: 25, shields: 30, lifeSupport: 10, weapons: 35 };
    } else if (mode === "escape") {
      newEnergy = { warpCore: 50, shields: 20, lifeSupport: 20, weapons: 10 };
    }

    if (newEnergy) {
      setEnergy(newEnergy);
      await updateEnergyDistribution(newEnergy);
    }
    setEnergyModus(mode);
  }

  return (
    <>
      <div className={"py-4 d-flex gap-2 lead"}>
        <div>Aktueller Modus:</div>
        {energyModus === "normal" && (
          <div className={"text-success"}>
            <strong>NORMAL</strong>
          </div>
        )}
        {energyModus === "attack" && (
          <div className={"text-danger"}>
            <strong>ANGRIFF</strong>
          </div>
        )}
        {energyModus === "escape" && (
          <div className={"text-sky"}>
            <strong>FLUCHT</strong>
          </div>
        )}
      </div>
      <ul className={"list-group list-group-flush mb-5"}>
        <li className={"list-group-item"}>
          <span aria-hidden={true} className={"me-3"}>
            🛡
          </span>
          <span className={"me-3"}>Schilde: </span>
          <span className={"text-black fw-bold bg-secondary rounded p-2"}>
            {energy.shields}%
          </span>
        </li>
        <li className={"list-group-item"}>
          <span aria-hidden={true} className={"me-3"}>
            🔫
          </span>
          <span className={"me-3"}>Waffen:</span>
          <span className={"text-black fw-bold bg-secondary rounded p-2"}>
            {energy.weapons}%
          </span>
        </li>
        <li className={"list-group-item"}>
          <span aria-hidden={true} className={"me-3"}>
            🚀
          </span>
          <span className={"me-3"}>Warp Kern:</span>
          <span className={"text-black fw-bold bg-secondary rounded p-2"}>
            {energy.warpCore}%
          </span>
        </li>
        <li className={"list-group-item"}>
          <span aria-hidden={true} className={"me-3"}>
            😮‍💨
          </span>
          <span className={"me-3"}>Lebenserhaltung:</span>
          <span className={"text-black fw-bold bg-secondary rounded p-2"}>
            {energy.lifeSupport}%
          </span>
        </li>
      </ul>

      <div className={"d-flex gap-3 justify-content-center"}>
        <button
          className={"btn btn-moonlit-violet btn-lg"}
          onClick={() => setMode("normal")}
        >
          <span aria-hidden={true}>🔄</span> Normal
        </button>
        <button
          className={"btn btn btn-moonlit-violet btn-lg"}
          onClick={() => setMode("attack")}
        >
          <span aria-hidden={true}>🚀</span> Angriff
        </button>
        <button
          className={"btn btn btn-moonlit-violet btn-lg"}
          onClick={() => setMode("escape")}
        >
          <span aria-hidden={true}>🏃</span> Flucht
        </button>
      </div>
    </>
  );
}

export { EnergyManagementPanel };
