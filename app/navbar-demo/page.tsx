"use client"

import { Navbar } from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, CreditCard, DollarSign, TrendingUp } from "lucide-react"

export default function NavbarDemo() {
  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
  }

  const handleLogout = () => {
    console.log("Logout clicked")
    // Handle logout logic here
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Navbar */}
      <Navbar user={mockUser} onLogout={handleLogout} />
      
      {/* Demo Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Professional Navbar Demo</h1>
          <p className="text-xl text-muted-foreground mt-2">
            A modern, responsive navigation bar for ExpenseFlow
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expenses</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$8,945</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Navbar Features</CardTitle>
            <CardDescription>
              This professional navbar includes all the essential features for a modern financial application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-2">🎨 Design Features</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Modern glassmorphism effect with backdrop blur</li>
                  <li>• Responsive design that works on all devices</li>
                  <li>• Clean typography and proper spacing</li>
                  <li>• Consistent with shadcn/ui design system</li>
                  <li>• Professional color scheme and hover states</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">⚡ Functionality</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Dropdown navigation menu with descriptions</li>
                  <li>• User profile dropdown with avatar</li>
                  <li>• Mobile-responsive hamburger menu</li>
                  <li>• Search and notification buttons</li>
                  <li>• Quick "Add Transaction" CTA button</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">🔧 Technical</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Built with Radix UI primitives</li>
                  <li>• TypeScript support with proper types</li>
                  <li>• Accessible keyboard navigation</li>
                  <li>• Active route highlighting</li>
                  <li>• Customizable user props and callbacks</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">📱 Mobile Experience</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Collapsible side drawer for mobile</li>
                  <li>• Touch-friendly button sizes</li>
                  <li>• Optimized for small screens</li>
                  <li>• Smooth animations and transitions</li>
                  <li>• Proper focus management</li>
                </ul>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2">🚀 Usage</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Simply import and use the Navbar component in your layout:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <code className="text-sm">
                  {`<Navbar 
  user={{ name: "John Doe", email: "john@example.com" }} 
  onLogout={() => handleLogout()} 
/>`}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}