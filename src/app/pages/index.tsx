import { Page } from "src/app/layout/page/Page.tsx";
import { LCARSConsole } from "src/app/features/LCARS-console/LCARSConsole.tsx";

function HomePage() {
  return (
    <Page>
      <LCARSConsole />
    </Page>
  );
}

export { HomePage };
