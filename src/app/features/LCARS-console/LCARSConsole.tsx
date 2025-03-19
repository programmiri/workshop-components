import EnterpriseImg from "src/assets/images/enterprise.png";
import { Image } from "src/app/components/Image.tsx";
import {
  LCARSTabs,
  TabDefinition,
} from "src/app/features/LCARS-console/components/LCARSTabs.tsx";
import { EngineeringPanel } from "src/app/features/engineering/EngineeringPanel.tsx";
import { EnergyManagementPanel } from "src/app/features/energy-management/EnergyManagementPanel.tsx";

const ConsoleTabs = {
  START: "start",
  ENGINEERING: "engineering",
  ENERGY_MANAGEMENT: "energy_management",
} as const;

type ConsoleTabKey = keyof typeof ConsoleTabs;

const starshipTabs: Record<ConsoleTabKey, TabDefinition> = {
  START: { key: ConsoleTabs.START, label: "Start" },
  ENGINEERING: { key: ConsoleTabs.ENGINEERING, label: "Engineering" },
  ENERGY_MANAGEMENT: {
    key: ConsoleTabs.ENERGY_MANAGEMENT,
    label: "Energie Management",
  },
};

function LCARSConsole() {
  return (
    <LCARSTabs defaultTabKey={"start"}>
      <LCARSTabs.List label="Console">
        {Object.values(starshipTabs).map((tab) => (
          <LCARSTabs.Tab key={tab.key} tab={tab} />
        ))}
      </LCARSTabs.List>

      <LCARSTabs.Panels>
        <LCARSTabs.Panel
          tabKey={ConsoleTabs.START}
          headline={
            <>
              <Image
                src={EnterpriseImg}
                alt={""}
                aria-hidden={true}
                type={"fluid"}
                width={70}
                height={70}
                className={"pe-2"}
              />
              Hallo, nugneH, shacha, peldor joi
            </>
          }
        >
          <p className={"fst-italic py-5"}>
            Sternenflotten-Hauptsystem online. Zugriff auf Schiffsfunktionen
            gewährt.
          </p>
        </LCARSTabs.Panel>

        <LCARSTabs.Panel
          tabKey={ConsoleTabs.ENGINEERING}
          headline={"Engineering"}
        >
          <EngineeringPanel />
        </LCARSTabs.Panel>

        <LCARSTabs.Panel
          tabKey={ConsoleTabs.ENERGY_MANAGEMENT}
          headline={"Energie Management"}
        >
          <EnergyManagementPanel />
        </LCARSTabs.Panel>
      </LCARSTabs.Panels>
    </LCARSTabs>
  );
}

export { LCARSConsole };
