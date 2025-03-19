import { useEffect, useState } from "react";
import {
  getWarpCoreStatusFirst,
  getShieldStatusFirst,
  getLifeSupportStatusFirst,
  getWeaponsStatusFirst,
} from "src/api/sensors";
import clsx from "clsx";

function EngineeringPanel() {
  const [warpCoreStatus, setWarpCoreStatus] = useState("Loading...");
  const [shieldStatus, setShieldStatus] = useState("Loading...");
  const [lifeSupportStatus, setLifeSupportStatus] = useState("Loading...");
  const [weaponsStatus, setWeaponsStatus] = useState("Loading...");

  useEffect(() => {
    async function fetchStatuses() {
      const warpCoreData = await getWarpCoreStatusFirst();
      setWarpCoreStatus(warpCoreData.data);

      const shieldData = await getShieldStatusFirst();
      setShieldStatus(shieldData.data);

      const lifeSupportData = await getLifeSupportStatusFirst();
      setLifeSupportStatus(lifeSupportData.data);

      const weaponsSupportData = await getWeaponsStatusFirst();
      setWeaponsStatus(weaponsSupportData.data);
    }

    fetchStatuses();
  }, []);

  return (
    <>
      <h2>Status der Systeme</h2>
      <ul className={"list-group list-group-flush"}>
        <li className={"d-flex list-group-item gap-3"}>
          <div>Warp-Kern: </div>
          <div
            className={clsx(
              "badge align-self-center",
              warpCoreStatus === "Critical"
                ? "text-bg-danger"
                : "text-bg-success"
            )}
          >
            {warpCoreStatus}
          </div>
        </li>
        <li className={"d-flex list-group-item gap-3"}>
          <div>Schilde:</div>
          <div
            className={clsx(
              "badge align-self-center",
              shieldStatus === "Active" ? "text-bg-danger" : "text-bg-success"
            )}
          >
            {shieldStatus}
          </div>
        </li>
        <li className={"d-flex list-group-item gap-3"}>
          <div>Lebenserhaltung:</div>
          <div
            className={clsx(
              "badge align-self-center",
              Number(lifeSupportStatus) <= 50
                ? "text-bg-danger"
                : "text-bg-success"
            )}
          >
            {lifeSupportStatus}
          </div>
        </li>
        <li className={"d-flex list-group-item gap-3"}>
          <div>Waffen:</div>
          <div
            className={clsx(
              "badge align-self-center",
              weaponsStatus === "Offline" ? "text-bg-danger" : "text-bg-success"
            )}
          >
            {weaponsStatus}
          </div>
        </li>
      </ul>
    </>
  );
}

export { EngineeringPanel };
