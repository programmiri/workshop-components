import { EnergyManagementView } from "src/app/features/energy-management/components/EnergyManagementView.tsx";
import { EnergyManagementControl } from "src/app/features/energy-management/components/EnergyManagementControl.tsx";
import { useEnergyStrategy } from "src/app/context-provider/energy-management/EnergyManagementProvider.tsx";

// Komponente nutzt den Hook & bekommt so strategy und setStrategy geliefert.
// Der Hook ist damit die "offizielle" Schnittstelle (IoC!).
// Der State ist "Lifted" insofern, dass `EnergyManagementView` und `EnergyManagementControl`
// ihn nicht direkt holen, sondern als prop bekommen. Das macht die Tests super einfach!
function EnergyManagement() {
  const { strategy, setStrategy } = useEnergyStrategy();

  return (
    <>
      <EnergyManagementView activeEnergyStrategy={strategy} />
      <EnergyManagementControl setEnergyStrategy={setStrategy} />
    </>
  );
}

export { EnergyManagement };
