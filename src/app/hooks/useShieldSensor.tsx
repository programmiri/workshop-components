import { getShieldStatusSecond, ShieldStatusSecond } from "src/api/sensors.ts";
import { createSensorHook } from "src/app/hooks/utils/create-sensor-hook.tsx";

// Konkrete Hook-Instanz für das Shield System
//
// - Wir rufen die Factory Function auf
// - Der Hook holt sich Daten von einer spezifischen API-Funktion
// - Er weiß, wie man die Daten interpretiert
// - Open-Closed Prinzip: Wir erweitern das System für neue Sensoren, ohne bestehende Logik zu ändern

const useShieldSensor = createSensorHook<ShieldStatusSecond>(
  getShieldStatusSecond,
  (data) => ({
    message: data.active ? "Active" : "Down",
    statusLevel: data.active ? "OK" : "ALERT",
  })
);

export { useShieldSensor };
