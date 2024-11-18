import { Button } from '@/components/ui/button';
import LayoutDash from './LayoutDash'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Fragment, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';

  type Movimiento = {
    mov_id: number
    mov_tipo: number
    mov_comentario: string
    mov_cantidad: number
    prod_id: number
    prod_name: string
    prod_foto: string
    subprod_id?: number
    subprod_name?: string
    cli_id?: number
    cli_name?: string
    cli_unidad?: string
  }


  const movimientos: Movimiento[] = [
    {
        mov_id: 1,
        mov_tipo: 2,
        mov_comentario: "Nuevos casquetes 2024",
        mov_cantidad: 1,
        prod_id: 1,
        prod_name: "Camisa verde clasica",
        prod_foto: "camisa.jpg",
        subprod_id: 1,
        subprod_name: "Camisa verde clasica S",
        cli_id: 1,
        cli_name: "Erick",
        cli_unidad: "T01",
    },
    {
        mov_id: 2,
        mov_tipo: 1,
        mov_comentario: "Nuevos casquetes 2024",
        mov_cantidad: 1,
        prod_id: 2,
        prod_name: "Casquete",
        prod_foto: "Casquete.jpg",
        // subprod_id: 1,
        // subprod_name: "Camisa verde clasica S",
        // cli_id: 1,
        // cli_name: "Erick",
        // cli_unidad: "T01",
    }
    // ...
  ]

export const Reporte = () => {

    // const [titleModalProduct, setTitleModalProduct] = useState({label: "Crear Categoria", id: 1})
    // const [inputCate_id, setInputCate_id] = useState(0)
    // const [inputCate_name, setInputCate_name] = useState("")

    // const buttonNuevaCategoria = useRef<HTMLButtonElement>(null);

    return (
        <LayoutDash>

            <div className="border rounded-lg shadow-sm">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-1/4">Tipo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Comentario</TableHead>
                {/* <TableHead>
                    Acciones
                </TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {movimientos.map((movimiento) => (
                <Fragment key={movimiento.mov_id}>
                    <TableRow>
                        <TableCell className="font-medium w-1/6"><Badge className={movimiento.mov_tipo == 1 ? 'bg-green-700' : 'bg-red-700'}>{movimiento.mov_tipo}</Badge></TableCell>
                        <TableCell className="font-medium">{movimiento.mov_tipo == 1 ? "-" : `${movimiento.cli_name} - ${movimiento.cli_unidad}`}</TableCell>
                        <TableCell className="font-medium">{movimiento.subprod_name ? movimiento.subprod_name : movimiento.prod_name}</TableCell>
                        <TableCell className="font-medium w-1/6">{movimiento.mov_cantidad}</TableCell>
                        <TableCell className="font-medium">{movimiento.mov_comentario}</TableCell>

                        {/* <TableCell className="w-1/6 ">
                            <Button size="icon" variant="ghost" onClick={() => {
                                setTitleModalProduct({label: "Editar categoria",id: 2})
                                buttonNuevaCategoria.current?.click()
                            }}>
                            <Pencil  className="h-4 w-4"/>
                            </Button>
                        </TableCell> */}
                    </TableRow>
                </Fragment>
                ))}
            </TableBody>
            </Table>
        </div>
        </LayoutDash>
    )
}
