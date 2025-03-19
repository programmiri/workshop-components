import { useState } from "react";
import clsx from "clsx";
import { EngineeringPanel } from "src/app/features/engineering/EngineeringPanel.tsx";
import { EnergyManagementPanel } from "src/app/features/energy-management/EnergyManagementPanel.tsx";
import EnterpriseImg from "src/assets/images/enterprise.png";
import { Image } from "src/app/components/Image.tsx";

const TabNames = {
  START: "START",
  ENGINEERING: "ENGINEERING",
  ENERGY_MANAGEMENT: "ENERGY_MANAGEMENT",
};

function LCARSTabs() {
  const [active, setActive] = useState(TabNames.START);

  return (
    <div className="container mt-4">
      <div
        className="nav nav-custom nav-pills"
        role="tablist"
        aria-label={"Console"}
      >
        <button
          className={clsx("nav-link", active === TabNames.START && "active")}
          id="tab1"
          role="tab"
          aria-controls="panel1"
          aria-selected={active === TabNames.START ? "true" : "false"}
          onClick={() => setActive(TabNames.START)}
        >
          Start
        </button>
        <button
          className={clsx(
            "nav-link",
            active === TabNames.ENGINEERING && "active"
          )}
          id="tab2"
          role="tab"
          aria-controls="panel2"
          aria-selected={active === TabNames.ENGINEERING ? "true" : "false"}
          onClick={() => setActive(TabNames.ENGINEERING)}
        >
          Engineering
        </button>
        <button
          className={clsx(
            "nav-link",
            active === TabNames.ENERGY_MANAGEMENT && "active"
          )}
          id="tab3"
          role="tab"
          aria-controls="panel3"
          aria-selected={
            active === TabNames.ENERGY_MANAGEMENT ? "true" : "false"
          }
          onClick={() => setActive(TabNames.ENERGY_MANAGEMENT)}
        >
          Energie Management
        </button>
      </div>

      <div className="mt-5">
        {active === TabNames.START && (
          <div id="panel1" role="tabpanel" aria-labelledby="tab1">
            <h1 className={"mb-5"}>
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
            </h1>
            <hr />
            <p className={"fst-italic py-5"}>
              Sternenflotten-Hauptsystem online. Zugriff auf Schiffsfunktionen
              gewährt.
            </p>
            <hr />
          </div>
        )}
        {active === TabNames.ENGINEERING && (
          <div id="panel2" role="tabpanel" aria-labelledby="tab2">
            <section aria-labelledby="engineering-title">
              <h1 className={"mb-5"} id={"engineering-title"}>
                Engineering
              </h1>
              <hr />
              <EngineeringPanel />
              <hr />
            </section>
          </div>
        )}
        {active === TabNames.ENERGY_MANAGEMENT && (
          <div id="panel3" role="tabpanel" aria-labelledby="tab3">
            <section aria-labelledby="energy-management-title">
              <h1 className={"mb-5"} id={"energy-management-title"}>
                Energie Management
              </h1>
              <hr />
              <EnergyManagementPanel />
              <hr />
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export { LCARSTabs };
