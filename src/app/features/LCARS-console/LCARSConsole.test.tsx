import { render, screen, within } from "@testing-library/react";
import { LCARSConsole } from "src/app/features/LCARS-console/LCARSConsole";
import { userEvent } from "@testing-library/user-event";

const tabs = ["Start", "Engineering", "Energie Management"];
describe("LCARSConsole", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    render(<LCARSConsole />);
  });

  describe("shows an accessible tab navigation", () => {
    it("shows the tablist", () => {
      const tabList = screen.getByRole("tablist", { name: "Console" });
      expect(tabList).toBeVisible();
    });

    it("shows all tabs like defined", () => {
      const tabList = screen.getByRole("tablist", { name: "Console" });

      const tabs = within(tabList).getAllByRole("tab");

      expect(tabs).toHaveLength(tabs.length);
    });

    tabs.forEach((tab) => {
      it(`shows a tab for ${tab}`, () => {
        const tabList = screen.getByRole("tablist", { name: "Console" });

        const currentTab = within(tabList).getByRole("tab", { name: tab });

        expect(currentTab).toBeVisible();
        expect(currentTab).toHaveAttribute(
          "aria-selected",
          String(tab === "Start")
        );
      });
    });
  });

  describe("enables user to show different tab panels", () => {
    it("shows the tab content for Start by default", () => {
      const tabContent = screen.getAllByRole("tabpanel");
      const headline = within(tabContent[0]!).getByRole("heading", {
        name: "Hallo, nugneH, shacha, peldor joi",
      });

      expect(tabContent).toHaveLength(1);
      expect(headline).toBeVisible();
    });

    it("shows content for Engineering when user clicks button", async () => {
      const tab = screen.getByRole("tab", { name: "Engineering" });

      await user.click(tab);
      const tabContent = screen.getAllByRole("tabpanel");
      const contentSection = within(tabContent[0]!).getByRole("region", {
        name: "Engineering",
      });

      expect(tabContent).toHaveLength(1);
      expect(contentSection).toBeVisible();
    });

    it("shows content for Energy Management when user clicks button", async () => {
      const tab = screen.getByRole("tab", { name: "Energie Management" });

      await user.click(tab);
      const tabContent = screen.getAllByRole("tabpanel");
      const contentSection = within(tabContent[0]!).getByRole("region", {
        name: "Energie Management",
      });

      expect(tabContent).toHaveLength(1);
      expect(contentSection).toBeVisible();
    });
  });
});
