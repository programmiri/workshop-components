import { EngineeringPanel } from "src/app/features/engineering/EngineeringPanel.tsx";
import { render, screen, waitFor, within } from "@testing-library/react";
import {
  getWarpCoreStatusSecond,
  getShieldStatusSecond,
  getLifeSupportStatusSecond,
  getWeaponsStatusSecond,
} from "src/api/sensors.ts";

jest.mock("src/api/sensors.ts");

const mockGetWarpCoreStatusSecond =
  getWarpCoreStatusSecond as jest.MockedFunction<
    typeof getWarpCoreStatusSecond
  >;
const mockGetShieldStatusSecond = getShieldStatusSecond as jest.MockedFunction<
  typeof getShieldStatusSecond
>;
const mockGetLifeSupportStatusSecond =
  getLifeSupportStatusSecond as jest.MockedFunction<
    typeof getLifeSupportStatusSecond
  >;
const mockGetWeaponsStatusSecond =
  getWeaponsStatusSecond as jest.MockedFunction<typeof getWeaponsStatusSecond>;

// NOTIZ VON MIRJAM:
// Diese Mocks verwenden wenn ihr die "Api" updated!

// const mockGetWarpCoreStatusSecond =
//   getWarpCoreStatusSecond as jest.MockedFunction<
//     typeof getWarpCoreStatusSecond
//   >;
// const mockGetShieldStatusSecond = getShieldStatusSecond as jest.MockedFunction<
//   typeof getShieldStatusSecond
// >;
// const mockGetLifeSupportStatusSecond =
//   getLifeSupportStatusSecond as jest.MockedFunction<
//     typeof getLifeSupportStatusSecond
//   >;
// const mockGetWeaponsStatusSecond =
//   getWeaponsStatusSecond as jest.MockedFunction<typeof getWeaponsStatusSecond>;
//

const sensors = ["Warp-Kern", "Schilde", "Lebenserhaltung", "Waffen"];

describe("EngineeringPanel", () => {
  beforeEach(async () => {
    mockGetWarpCoreStatusSecond.mockResolvedValue({ health: "Critical" });
    mockGetShieldStatusSecond.mockResolvedValue({ active: true });
    mockGetLifeSupportStatusSecond.mockResolvedValue({ oxygenLevel: 100000 });
    mockGetWeaponsStatusSecond.mockResolvedValue({ status: "Offline" });

    // NOTIZ VON MIRJAM:
    // Diese Mocks verwenden wenn ihr die "Api" updated!

    // mockGetWarpCoreStatusSecond.mockResolvedValue({ health: "Critical" });
    // mockGetShieldStatusSecond.mockResolvedValue({ active: true });
    // mockGetLifeSupportStatusSecond.mockResolvedValue({ oxygenLevel: 100000 });
    // mockGetWeaponsStatusSecond.mockResolvedValue({ status: "Offline" });

    render(<EngineeringPanel />);

    // Auf das letze Element das von der "api" gerendert wird warten müssen
    // damit dieser Error nicht geworfen gelogged wird:
    // An update to EngineeringPanel inside a test was not wrapped in act(...).
    // -> eindeutig schlechtes Zeichen
    await waitFor(() => screen.getByText(/Offline/));
  });

  it("shows the headline", () => {
    const headline = screen.getByRole("heading", {
      name: "Status der Systeme",
    });
    expect(headline).toBeVisible();
  });

  it("shows a list with status for system sensors", () => {
    const list = screen.getByRole("list");
    expect(list).toBeVisible();
  });

  it("shows all sensors", () => {
    const list = screen.getByRole("list");
    const listItems = within(list).getAllByRole("listitem");

    expect(listItems).toHaveLength(sensors.length);
  });

  it("shows the status for warp core", () => {
    const sensorIndex = 0;
    const listItems = screen.getAllByRole("listitem");
    const warpCore = listItems[sensorIndex]!;

    expect(warpCore).toBeVisible();
    expect(warpCore).toHaveTextContent(sensors[sensorIndex]);
    expect(warpCore).toHaveTextContent(/Critical/);
  });

  it("shows the status for shields", () => {
    const sensorIndex = 1;
    const listItems = screen.getAllByRole("listitem");
    const shields = listItems[sensorIndex]!;

    expect(shields).toBeVisible();
    expect(shields).toHaveTextContent(sensors[sensorIndex]);
    expect(shields).toHaveTextContent(/Active/);
  });

  it("shows the status for life support", () => {
    const sensorIndex = 2;
    const listItems = screen.getAllByRole("listitem");
    const lifeSupport = listItems[sensorIndex]!;

    expect(lifeSupport).toBeVisible();
    expect(lifeSupport).toHaveTextContent(sensors[sensorIndex]);
    expect(lifeSupport).toHaveTextContent(/100000/);
  });

  it("shows the status for weapons", () => {
    const sensorIndex = 3;
    const listItems = screen.getAllByRole("listitem");
    const weapons = listItems[sensorIndex]!;

    expect(weapons).toBeVisible();
    expect(weapons).toHaveTextContent(sensors[sensorIndex]);
    expect(weapons).toHaveTextContent(/Offline/);
  });
});
