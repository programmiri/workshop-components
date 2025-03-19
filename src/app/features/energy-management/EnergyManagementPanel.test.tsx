import { EnergyManagementPanel } from "src/app/features/energy-management/EnergyManagementPanel.tsx";
import { render, waitFor, screen, within } from "@testing-library/react";

import {
  fetchEnergyDistribution,
  updateEnergyDistribution,
} from "src/api/energy.ts";
import { userEvent } from "@testing-library/user-event";

jest.mock("src/api/energy.ts");

const mockFetchEnergyDistribution =
  fetchEnergyDistribution as jest.MockedFunction<
    typeof fetchEnergyDistribution
  >;
const mockUpdateEnergyDistribution =
  updateEnergyDistribution as jest.MockedFunction<
    typeof updateEnergyDistribution
  >;

const mockEnergy = {
  warpCore: 30,
  shields: 25,
  lifeSupport: 25,
  weapons: 20,
};
describe("EnergyManagementPanel", () => {
  const user = userEvent.setup();

  describe("renders all necessary elements", () => {
    beforeEach(async () => {
      mockFetchEnergyDistribution.mockResolvedValue(mockEnergy);
      render(<EnergyManagementPanel />);
      // nicht gut..
      await waitFor(() => screen.getByText("30%"));
    });

    it("shows the current mode", () => {
      const label = screen.getByText("Aktueller Modus:");
      const modus = within(label.parentElement!).getByText("NORMAL");

      expect(modus).toBeVisible();
    });

    it("shows a list with the current energy distribution", () => {
      const list = screen.getByRole("list");
      expect(list).toBeVisible();
    });

    it("shows all energy distributions as list items", () => {
      const list = screen.getAllByRole("listitem");
      expect(list).toHaveLength(Object.keys(mockEnergy).length);
    });

    it("shows the correct value for shields", () => {
      const item = screen.getByText(/Schilde/);
      const value = within(item.parentElement!).getByText("25%");

      expect(value).toBeVisible();
    });

    it("shows the correct value for weapons", () => {
      const item = screen.getByText(/Waffen/);
      const value = within(item.parentElement!).getByText("20%");

      expect(value).toBeVisible();
    });

    it("shows the correct value for warp core", () => {
      const item = screen.getByText(/Warp Kern/);
      const value = within(item.parentElement!).getByText("30%");

      expect(value).toBeVisible();
    });

    it("shows the correct value for life support", () => {
      const item = screen.getByText(/Lebenserhaltung/);
      const value = within(item.parentElement!).getByText("25%");

      expect(value).toBeVisible();
    });

    it("shows a button to set mode to normal", () => {
      const button = screen.getByRole("button", { name: "Normal" });
      expect(button).toBeEnabled();
    });

    it("shows a button to set mode to attack", () => {
      const button = screen.getByRole("button", { name: "Angriff" });
      expect(button).toBeEnabled();
    });

    it("shows a button to set mode to escape", () => {
      const button = screen.getByRole("button", { name: "Flucht" });
      expect(button).toBeEnabled();
    });
  });

  describe("enables user to change energy distribution mode", () => {
    beforeEach(async () => {
      mockFetchEnergyDistribution.mockResolvedValue(mockEnergy);
      mockUpdateEnergyDistribution.mockResolvedValue(mockEnergy);

      render(<EnergyManagementPanel />);
      await waitFor(() => screen.getByText("30%"));
    });

    it("updates the energy distribution to attack", async () => {
      const label = screen.getByText("Aktueller Modus:");
      const modus = label.parentElement!;
      expect(modus).toHaveTextContent("NORMAL");

      const button = screen.getByRole("button", { name: "Angriff" });
      await user.click(button);

      expect(mockUpdateEnergyDistribution).toHaveBeenCalledWith({
        warpCore: 25,
        shields: 30,
        lifeSupport: 10,
        weapons: 35,
      });

      expect(modus).toHaveTextContent("ANGRIFF");
    });
  });
});
