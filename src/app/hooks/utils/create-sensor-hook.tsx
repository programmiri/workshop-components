import { useEffect, useState } from "react";

/**
 * Factory Function für Sensor-Hooks
 *
 * - `T` ist ein Generic: Er steht für den Typ des Datenobjekts, das die
 *   API zurückliefert.
 * - Beispiel: Wenn fetchSensorData() `{ health: string }` zurückgibt,
 *   wird T automatisch dieser Typ.
 * - Dadurch können wir den Prozess zur Daten-Verarbeitung (`processData`) perfekt
 *   typisieren.
 * - Vorteil: Wir schreiben diese Factory-Funktion nur einmal und können sie für
 *   jede Art von Sensor verwenden.
 */

// Wir definieren den Typ des Rückgabewerts für unsere Sensor-Hooks
type SensorResult = {
  message: string;
  statusLevel: "OK" | "ALERT" | "LOADING";
};

// Generische Typen für die API-Funktion und die Logik zur Verarbeitung der Daten
type SensorFetcher<T> = () => Promise<T>;
type SensorProcessor<T> = (data: T) => SensorResult;

// Factory Function, die einen Custom Hook erzeugt
// - Wir kapseln die Wiederverwendung von Logik (Separation of Concerns)
// - Wir wenden das Factory Pattern an
// - Durch Injection von `fetchSensorData` und `processData` sind wir maximal flexibel

function createSensorHook<T>(
  fetchSensorData: SensorFetcher<T>,
  processData: SensorProcessor<T>
) {
  return function useSensor(): SensorResult {
    const [sensorState, setSensorState] = useState<SensorResult>({
      message: "Loading...",
      statusLevel: "LOADING",
    });

    useEffect(() => {
      // Fetch-Logik bleibt generisch
      async function fetchStatus() {
        const data = await fetchSensorData();

        // Die Datenverarbeitung ist spezifisch und wird "injiziert" (Inversion of Control!)
        setSensorState(processData(data));
      }
      fetchStatus();
    }, []);

    return sensorState;
  };
}

export { createSensorHook };
