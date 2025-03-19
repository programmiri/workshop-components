import {
  getWeaponsStatusSecond,
  WeaponsStatusSecond,
} from "src/api/sensors.ts";
import { createSensorHook } from "src/app/hooks/utils/create-sensor-hook.tsx";

// Konkrete Hook-Instanz für das Warp-Core System
//
// - Wir rufen die Factory Function auf
// - Der Hook holt sich Daten von einer spezifischen API-Funktion
// - Er weiß, wie man die Daten interpretiert
// - Open-Closed Prinzip: Wir erweitern das System für neue Sensoren, ohne bestehende Logik zu ändern

const useWeaponsSensor = createSensorHook<WeaponsStatusSecond>(
  getWeaponsStatusSecond,
  (data) => ({
    message: data.status,
    statusLevel: data.status === "Online" ? "OK" : "ALERT",
  })
);

export { useWeaponsSensor };
