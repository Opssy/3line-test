import React, { useState } from "react"
import {
  Menu,
  Home,
  LayoutDashboard,
  FolderClosed,
  CheckSquare,
  PieChart,
  Users,
  HelpCircle,
  Settings as SettingsIcon,
  Download,
  Search,
  MoreHorizontal,
} from "lucide-react"

import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Card, CardContent } from "./components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar"

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  //user avatars data
  const userAvatars = [
    { src: "/api/placeholder/32/32", fallback: "U1" },
    { src: "/api/placeholder/32/32", fallback: "U2" },
    { src: "/api/placeholder/32/32", fallback: "U3" },
    { src: "/api/placeholder/32/32", fallback: "U4" },
    { src: "/api/placeholder/32/32", fallback: "U5" },
  ]

  const userRoles = [
    { name: "Superadmin", type: "DEFAULT", dateCreated: "Jan 1, 2023", status: "Active", users: 4 },
    {
      name: "Merchantadmin",
      type: "DEFAULT",
      dateCreated: "Feb 1, 2023",
      status: "Active",
      users: 5,
    },
    {
      name: "Supportadmin",
      type: "DEFAULT",
      dateCreated: "Feb 1, 2023",
      status: "Active",
      users: 5,
    },
    {
      name: "Sales personnel",
      type: "CUSTOM",
      dateCreated: "Mar 1, 2023",
      status: "Active",
      users: 3,
    },
    {
      name: "Deputy sales personnel",
      type: "CUSTOM",
      dateCreated: "Apr 1, 2023",
      status: "Active",
      users: 4,
    },
    {
      name: "Developeradmin",
      type: "SYSTEM-CUSTOM",
      dateCreated: "May 1, 2023",
      status: "Active",
      users: 4,
    },
    {
      name: "Developer-basic",
      type: "SYSTEM-CUSTOM",
      dateCreated: "Jun 1, 2023",
      status: "Active",
      users: 3,
    },
  ]

  const activeRoles = [
    { role: "Superadmin", lastActive: "06/23/23" },
    { role: "Developeradmin", lastActive: "05/23/23" },
    { role: "Supportadmin", lastActive: "10/22/22" },
  ]

  // Avatar stack component
  const AvatarStack = ({ count }) => (
    <div className="flex -space-x-2">
      {[...Array(Math.min(count, 4))].map((_, i) => (
        <Avatar key={i} className="h-6 w-6 border-2 border-white ring-0">
          <AvatarImage src={userAvatars[i].src} alt={`User ${i + 1}`} />
          <AvatarFallback className="bg-gray-300 text-xs">{userAvatars[i].fallback}</AvatarFallback>
        </Avatar>
      ))}
      {count > 4 && (
        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 border-2 border-white text-xs text-gray-600">
          +{count - 4}
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/api/placeholder/32/32" alt="Logo" className="h-8 w-8 rounded-md" />
              <span className="ml-2 text-xl font-semibold">Untitled UI</span>
            </div>
            <div className="flex items-center gap-4">
              <Input
                type="search"
                placeholder="Search"
                className="hidden md:block w-64"
                startIcon={<Search className="h-4 w-4 text-gray-400" />}
              />
              <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:flex lg:gap-8">
          {/* Sidebar - Hidden on mobile */}
          <nav className={`lg:block lg:w-64 space-y-1 ${isMobileMenuOpen ? "block" : "hidden"}`}>
            <Input
              type="search"
              placeholder="Quick Search"
              className="mb-4"
              startIcon={<Search className="h-4 w-4 text-gray-400" />}
            />
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FolderClosed className="mr-2 h-4 w-4" />
                Projects
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <CheckSquare className="mr-2 h-4 w-4" />
                Tasks
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <PieChart className="mr-2 h-4 w-4" />
                Reporting
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Users
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <HelpCircle className="mr-2 h-4 w-4" />
                Support
              </Button>
              <Button variant="ghost" className="w-full justify-start bg-gray-100">
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold">Settings</h1>
              <p className="text-gray-500">Manage your team and preferences here.</p>
            </div>

            <Tabs defaultValue="roles" className="w-full">
              <TabsList className="mb-8 flex flex-wrap gap-2">
                <TabsTrigger value="details">My details</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="plan">Plan</TabsTrigger>
                <TabsTrigger value="roles">Roles</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
              </TabsList>

              <TabsContent value="roles">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Connected Email Section */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Connected email</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-gray-500">My account email</label>
                            <p>olivia@untitledui.com</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-500">Alternative email</label>
                            <p>billing@untitledui.com</p>
                          </div>
                        </div>
                      </div>

                      {/* Active Role Section */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Active Role</h3>
                        <div className="space-y-4">
                          {activeRoles.map((role, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`/api/placeholder/32/32`} alt={role.role} />
                                  <AvatarFallback>{role.role[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{role.role}</p>
                                  <p className="text-sm text-gray-500">
                                    Last active {role.lastActive}
                                  </p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </div>
                          ))}
                          <Button variant="outline" className="w-full">
                            Add role to user
                          </Button>
                        </div>
                      </div>

                      {/* User Roles Table */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium">User Roles</h3>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download all
                          </Button>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="text-left text-sm text-gray-500">
                                <th className="pb-4">Name</th>
                                <th className="pb-4">Type</th>
                                <th className="pb-4">Date created</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4">Role users</th>
                                <th className="pb-4"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {userRoles.map((role, index) => (
                                <tr key={index} className="border-t">
                                  <td className="py-4">{role.name}</td>
                                  <td className="py-4 text-sm text-gray-500">{role.type}</td>
                                  <td className="py-4 text-sm text-gray-500">{role.dateCreated}</td>
                                  <td className="py-4">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                                      {role.status}
                                    </span>
                                  </td>
                                  <td className="py-4">
                                    <AvatarStack count={role.users} />
                                  </td>
                                  <td className="py-4">
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
