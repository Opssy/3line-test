import { render, screen, fireEvent, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "../App"
// Mock the lucide-react icons
jest.mock("lucide-react", () => ({
  Menu: () => <div data-testid="menu-icon" />,
  Home: () => <div data-testid="home-icon" />,
  Search: () => <div data-testid="search-icon" />,
  Download: () => <div data-testid="download-icon" />,
}))

describe("App Component", () => {
  describe("Header", () => {
    test("renders logo and company name", () => {
      render(<App />)
      const logo = screen.getByAltText("Logo")
      const companyName = screen.getByText("Untitled UI")

      expect(logo).toBeInTheDocument()
      expect(companyName).toBeInTheDocument()
    })

    test("toggles mobile menu when menu button is clicked", async () => {
      render(<App />)
      const menuButton = screen.getByRole("button", { name: /menu/i })
      const navigation = screen.getByRole("navigation")

      // Menu should be hidden initially on mobile
      expect(navigation).toHaveClass("hidden")

      // Click menu button
      await userEvent.click(menuButton)
      expect(navigation).toHaveClass("block")

      // Click again to hide
      await userEvent.click(menuButton)
      expect(navigation).toHaveClass("hidden")
    })
  })

  describe("Navigation", () => {
    test("renders all navigation items", () => {
      render(<App />)

      const expectedNavItems = [
        "Home",
        "Dashboard",
        "Projects",
        "Tasks",
        "Reporting",
        "Users",
        "Support",
        "Settings",
      ]

      expectedNavItems.forEach(item => {
        const navItem = screen.getByRole("button", { name: new RegExp(item, "i") })
        expect(navItem).toBeInTheDocument()
      })
    })

    test("settings button has active state", () => {
      render(<App />)
      const settingsButton = screen.getByRole("button", { name: /settings/i })
      expect(settingsButton).toHaveClass("bg-gray-100")
    })
  })

  describe("Settings Content", () => {
    test("renders settings header and description", () => {
      render(<App />)

      expect(screen.getByText("Settings")).toBeInTheDocument()
      expect(screen.getByText("Manage your team and preferences here.")).toBeInTheDocument()
    })

    test("renders all settings tabs", () => {
      render(<App />)

      const expectedTabs = [
        "My details",
        "Profile",
        "Password",
        "Team",
        "Plan",
        "Roles",
        "Notifications",
        "Integrations",
        "API",
      ]

      expectedTabs.forEach(tab => {
        expect(screen.getByRole("tab", { name: tab })).toBeInTheDocument()
      })
    })
  })

  describe("Roles Tab Content", () => {
    beforeEach(() => {
      render(<App />)
      const rolesTab = screen.getByRole("tab", { name: /roles/i })
      fireEvent.click(rolesTab)
    })

    test("renders connected email section", () => {
      expect(screen.getByText("Connected email")).toBeInTheDocument()
      expect(screen.getByText("olivia@untitledui.com")).toBeInTheDocument()
      expect(screen.getByText("billing@untitledui.com")).toBeInTheDocument()
    })

    test("renders active roles section", () => {
      expect(screen.getByText("Active Role")).toBeInTheDocument()

      const activeRoles = ["Superadmin", "Developeradmin", "Supportadmin"]
      activeRoles.forEach(role => {
        expect(screen.getByText(role)).toBeInTheDocument()
      })
    })

    test("renders user roles table", () => {
      const table = screen.getByRole("table")

      // Check table headers
      const expectedHeaders = ["Name", "Type", "Date created", "Status", "Role users"]
      expectedHeaders.forEach(header => {
        expect(within(table).getByText(header)).toBeInTheDocument()
      })

      // Check some sample roles
      const expectedRoles = ["Superadmin", "Merchantadmin", "Supportadmin"]
      expectedRoles.forEach(role => {
        expect(within(table).getByText(role)).toBeInTheDocument()
      })
    })

    test("renders download button for user roles", () => {
      const downloadButton = screen.getByRole("button", { name: /download all/i })
      expect(downloadButton).toBeInTheDocument()
      expect(screen.getByTestId("download-icon")).toBeInTheDocument()
    })
  })

  describe("Avatar Stack Component", () => {
    test("renders correct number of avatars", () => {
      render(<App />)

      // Find a role with 4 users
      const roleRow = screen.getAllByRole("row").find(row => within(row).getByText("Superadmin"))

      const avatars = within(roleRow).getAllByRole("img")
      expect(avatars).toHaveLength(4) // Should show max 4 avatars
    })

    test("shows overflow count for more than 4 users", () => {
      render(<App />)

      // Find a role with 5 users
      const roleRow = screen.getAllByRole("row").find(row => within(row).getByText("Merchantadmin"))

      const overflow = within(roleRow).getByText("+1")
      expect(overflow).toBeInTheDocument()
    })
  })

  describe("Search Functionality", () => {
    test("renders search inputs", () => {
      render(<App />)

      // Header search
      const headerSearch = screen.getByPlaceholderText("Search")
      expect(headerSearch).toBeInTheDocument()

      // Sidebar quick search
      const sidebarSearch = screen.getByPlaceholderText("Quick Search")
      expect(sidebarSearch).toBeInTheDocument()
    })
  })
})
