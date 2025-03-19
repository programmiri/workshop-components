import { EnergyProvider } from "src/app/context-provider/energy-management/EnergyManagementProvider.tsx";
import { EnergyManagement } from "src/app/features/energy-management/components/EnergyManagement.tsx";

// Hier wird der Context eingebunden
// Niemand ausser `EnergyManagement` braucht den Provier, deshalb kann der hier sein
// Die Komponente "EnergyManagementPanel" muss selbst keine Logik mehr halten.
function EnergyManagementPanel() {
  return (
    <EnergyProvider>
      <EnergyManagement />
    </EnergyProvider>
  );
}

export { EnergyManagementPanel };
