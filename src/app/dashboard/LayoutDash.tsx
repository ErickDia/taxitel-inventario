
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { Toaster } from '@/components/ui/toaster'

function LayoutDash({ children }: { children: React.ReactNode }) {

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full pt-5 px-2">
          <SidebarTrigger />
          <div className="pt-6 px-4">
            <div className="w-full min-h-[calc(100vh-230px)]">
              <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                {children}
              </div>
            </div>
          </div>
        <Toaster />
        </main>
      </SidebarProvider>
    </>
  )
}

export default LayoutDash
