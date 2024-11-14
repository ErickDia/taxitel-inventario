import { Button } from "@/components/ui/button"
import LayoutDash from "./LayoutDash"


function Home() {

  
  return (
    <LayoutDash>
      <h1>Mi Página de Dashboard</h1>
      <p>Bienvenido al panel de control.</p>
      {/* Puedes incluir otros componentes o elementos aquí */}
      <div>
        <Button>Hacer algo</Button>
      </div>
    </LayoutDash>
  )
}

export default Home