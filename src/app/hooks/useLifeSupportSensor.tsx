import {
  getLifeSupportStatusSecond,
  LifeSupportStatusSecond,
} from "src/api/sensors.ts";
import { createSensorHook } from "src/app/hooks/utils/create-sensor-hook.tsx";

// Konkrete Hook-Instanz für das Life-Support System
//
// - Wir rufen die Factory Function auf
// - Der Hook holt sich Daten von einer spezifischen API-Funktion
// - Er weiß, wie man die Daten interpretiert
// - Open-Closed Prinzip: Wir erweitern das System für neue Sensoren, ohne bestehende Logik zu ändern

const useLifeSupportSensor = createSensorHook<LifeSupportStatusSecond>(
  getLifeSupportStatusSecond,
  (data) => ({
    message: `${data.oxygenLevel}%`,
    statusLevel: data.oxygenLevel > 20 ? "OK" : "ALERT",
  })
);

export { useLifeSupportSensor };
