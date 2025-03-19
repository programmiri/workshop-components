import clsx from "clsx";
import { useWarpCoreSensor } from "src/app/hooks/useWarpCoreSensor.tsx";
import { useShieldSensor } from "src/app/hooks/useShieldSensor.tsx";
import { useLifeSupportSensor } from "src/app/hooks/useLifeSupportSensor.tsx";
import { useWeaponsSensor } from "src/app/hooks/useWeaponsSensor.tsx";

// EngineeringPanel
// - Hier passiert jetzt nur noch View-Logik! (Separation of Concerns)
// - Die Sensor-Daten kommen aus Custom Hooks, die von einer Factory generiert wurden
// - Die Komponente ist dadurch einfach testbar und leicht erweiterbar
// - Die Komponente könnte noch vereinfacht werden, in dem wiederkehrende UI Muster
//   in wiederverwendbare Komponenten ausgelagert werden.
function EngineeringPanel() {
  const warpCoreStatus = useWarpCoreSensor();
  const shieldStatus = useShieldSensor();
  const lifeSupportStatus = useLifeSupportSensor();
  const weaponsStatus = useWeaponsSensor();

  return (
    <>
      <h2>Status der Systeme</h2>
      <ul className={"list-group list-group-flush"}>
        <li className={"d-flex list-group-item gap-3"}>
          <div>Warp-Kern: </div>
          <div
            className={clsx(
              "badge align-self-center",
              warpCoreStatus.statusLevel === "ALERT"
                ? "text-bg-danger"
                : "text-bg-success"
            )}
          >
            {warpCoreStatus.message}
          </div>
        </li>
        <li className={"d-flex list-group-item gap-3"}>
          <div>Schilde:</div>
          <div
            className={clsx(
              "badge align-self-center",
              shieldStatus.statusLevel === "ALERT"
                ? "text-bg-danger"
                : "text-bg-success"
            )}
          >
            {shieldStatus.message}
          </div>
        </li>
        <li className={"d-flex list-group-item gap-3"}>
          <div>Lebenserhaltung:</div>
          <div
            className={clsx(
              "badge align-self-center",
              lifeSupportStatus.statusLevel === "ALERT"
                ? "text-bg-danger"
                : "text-bg-success"
            )}
          >
            {lifeSupportStatus.message}
          </div>
        </li>
        <li className={"d-flex list-group-item gap-3"}>
          <div>Waffen:</div>
          <div
            className={clsx(
              "badge align-self-center",
              weaponsStatus.statusLevel === "ALERT"
                ? "text-bg-danger"
                : "text-bg-success"
            )}
          >
            {weaponsStatus.message}
          </div>
        </li>
      </ul>
    </>
  );
}

export { EngineeringPanel };
