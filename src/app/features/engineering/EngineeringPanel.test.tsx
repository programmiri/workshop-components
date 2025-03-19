import { EngineeringPanel } from "src/app/features/engineering/EngineeringPanel.tsx";
import { render, screen, waitFor, within } from "@testing-library/react";
import {
  getWarpCoreStatusFirst,
  getShieldStatusFirst,
  getLifeSupportStatusFirst,
  getWeaponsStatusFirst,
} from "src/api/sensors.ts";

jest.mock("src/api/sensors.ts");

const mockGetWarpCoreStatusFirst =
  getWarpCoreStatusFirst as jest.MockedFunction<typeof getWarpCoreStatusFirst>;
const mockGetShieldStatusFirst = getShieldStatusFirst as jest.MockedFunction<
  typeof getShieldStatusFirst
>;
const mockGetLifeSupportStatusFirst =
  getLifeSupportStatusFirst as jest.MockedFunction<
    typeof getLifeSupportStatusFirst
  >;
const mockGetWeaponsStatusFirst = getWeaponsStatusFirst as jest.MockedFunction<
  typeof getWeaponsStatusFirst
>;

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
    mockGetWarpCoreStatusFirst.mockResolvedValue({ data: "SUPER STABLE" });
    mockGetShieldStatusFirst.mockResolvedValue({ data: "SUPER ACTIVE" });
    mockGetLifeSupportStatusFirst.mockResolvedValue({ data: "100000" });
    mockGetWeaponsStatusFirst.mockResolvedValue({ data: "SUPER OFFLINE" });

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
    await waitFor(() => screen.getByText(/SUPER STABLE/));
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
    expect(warpCore).toHaveTextContent(/SUPER STABLE/);
  });

  it("shows the status for shields", () => {
    const sensorIndex = 1;
    const listItems = screen.getAllByRole("listitem");
    const shields = listItems[sensorIndex]!;

    expect(shields).toBeVisible();
    expect(shields).toHaveTextContent(sensors[sensorIndex]);
    expect(shields).toHaveTextContent(/SUPER ACTIVE/);
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
    expect(weapons).toHaveTextContent(/SUPER OFFLINE/);
  });
});
