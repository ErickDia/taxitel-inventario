import { Button } from '@/components/ui/button';
import LayoutDash from './LayoutDash'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Fragment, useEffect, useRef, useState } from 'react';
import { Pencil, Plus, ShoppingCart } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
import { requestApi } from '@/hooks/useRequestApi';
import { useToast } from '@/hooks/use-toast';


type Cli_inventario = {
    mov_id: number
    prod_id: number
    prod_name: string
    cli_id: number
    subprod_id?: number
    subprod_name: string
    mov_tipo: number
    mov_comentario?: string
    mov_cantidad: number 
}

type Cliente = {
    cli_id: number
    cli_name: string
    cli_unidad: string
    cli_inventario: Cli_inventario[]
}

// const clientes: Cliente[] = [
//     {
//         cli_id: 1,
//         cli_name: "Erick",
//         cli_unidad: "T01",
//         cli_inventario: [
//             {
//                 cliinv_id: 1,
//                 prod_id: 1,
//                 prod_name: "Casquete",
//                 prod_foto: "casquete.jpg",
//                 prod_cantidad: 1,
//                 cliinv_comentario: "nuevo conductor"
//             }
//         ]
//     },
//     {
//         cli_id: 2,
//         cli_name: "Jorge",
//         cli_unidad: "T02",
//         cli_inventario: [
//             {
//                 cliinv_id: 1,
//                 prod_id: 1,
//                 prod_name: "Casquete",
//                 prod_foto: "casquete.jpg",
//                 prod_cantidad: 1,
//                 cliinv_comentario: ""
//             },
//             {
//                 cliinv_id: 1,
//                 prod_id: 1,
//                 prod_name: "Camisa verde clasica",
//                 prod_foto: "Camisa_verde_clasica.jpg",
//                 subprod_id: 2,
//                 subprod_name: "Camisa verde clasica M",
//                 prod_cantidad: 3,
//                 cliinv_comentario: "nuevo conductor"
//             }
//         ]
//     },
//     // ...
//   ]

export const Clientes = () => {

    const [clientes, setClientes] = useState<Cliente[]>([])
    const [researchData, setResearchData] = useState(true)
    
    // Dialog CLIENTES

    const [titleModalCliente, setTitleModalCliente] = useState({label: "Crear Cliente", id: 1})
    const [inputCli_id, setInputCli_id] = useState(0)
    const [inputCli_unidad, setInputCli_unidad] = useState("")
    const [inputCli_name, setInputCli_name] = useState("")

    const buttonNuevoCliente = useRef<HTMLButtonElement>(null);
    const [blockButtonCliente, setblockButtonCliente] = useState(false)


    // FIN Dialog CLIENTES

    // Dialog CLIENTES INVENTARIOS
    const buttonOpenInventario = useRef<HTMLButtonElement>(null);


    const [dataInventario, setDataInventario] = useState<Cli_inventario[]>([])

    // FIN Dialog CLIENTES INVENTARIOS

    const { toast } = useToast()

    const sendFormProducto = () => {



        console.log({
          cli_unidad: inputCli_unidad,
          cli_name: inputCli_name,
        });
        if (inputCli_unidad && inputCli_name) {
            setblockButtonCliente(true)
            if (titleModalCliente.id == 1) {
                requestApi({ url: `/api/v1/taxitel_inv/clientes`, type: "POST" , data: {cli_unidad: inputCli_unidad, cli_name: inputCli_name}})
                .then((data) => {
                console.log(data);
                toast({
                    description: data.message,
                })
                setResearchData(!researchData);
                buttonNuevoCliente.current?.click()
            
                });
            } else if (titleModalCliente.id == 2) {
                requestApi({ url: `/api/v1/taxitel_inv/clientes/${inputCli_id}`, type: "PUT" , data: {cli_unidad: inputCli_unidad, cli_name: inputCli_name}})
                .then((data) => {
                console.log(data);
                toast({
                    description: data.message,
                })
                setResearchData(!researchData);
                buttonNuevoCliente.current?.click()
            
                });
            }
        } else {
            toast({
              variant: "destructive",
              description: "Complete todos los campos obligatorios.",
            })
        }
        
    
    }



    useEffect(() => {
        requestApi({ url: `/api/v1/taxitel_inv/clientes`, type: 'GET'})
        .then(({ data }) => {
            console.log(data);
            
            setClientes(data);
        });
    }, [researchData])


    return (
        <LayoutDash>
            {/* MODAL CLIENTE */}

            <Dialog>
                <DialogTrigger asChild>
                <Button variant="outline"  className='my-4 hidden' ref={buttonNuevoCliente}><Plus />Nueva cliente</Button>
                </DialogTrigger>
                <Button variant="outline"  className='my-4'  onClick={() => {
                                setTitleModalCliente({label: "Crear cliente", id: 1})
                                setInputCli_unidad("")
                                setInputCli_name("")
                                setInputCli_id(0)
                                setblockButtonCliente(false)
                                buttonNuevoCliente.current?.click()
                            }}><Plus />Nueva cliente</Button>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{titleModalCliente.label}</DialogTitle>
                        {/* <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription> */}
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="cli_unidad" className="text-right">
                            Unidad*
                        </Label>
                        <Input id="cli_unidad" value={inputCli_unidad} onChange={(e) => setInputCli_unidad(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="cli_name" className="text-right">
                            Nombre*
                        </Label>
                        <Input id="cli_name" value={inputCli_name} onChange={(e) => setInputCli_name(e.target.value)} className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={() => {sendFormProducto()}} disabled = {blockButtonCliente}>Guardar cambios</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* FIN MODAL CLIENTE*/}

            {/* MODAL CLIENTE INVENTARIO */}

            <Dialog>
                <DialogTrigger asChild>
                <Button variant="outline"  className='my-4 hidden' ref={buttonOpenInventario}><Plus />Abrir Inventario</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Inventario de {inputCli_unidad} - {inputCli_name}</DialogTitle>
                        {/* <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription> */}
                    </DialogHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Cantidad</TableHead>
                            {/* <TableHead>Comentario</TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dataInventario.map((inv) => (
                            <Fragment key={inv.mov_id}>
                                <TableRow>
                                    <TableCell>{inv.subprod_name ? `${inv.prod_name} - ${inv.subprod_name}` : inv.prod_name}</TableCell>
                                    <TableCell>{inv.mov_cantidad}</TableCell>
                                    
                                </TableRow>
                            </Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>
            {/* FIN MODAL CLIENTE INVENTARIO*/}


            <div className="border rounded-lg shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-1/6">unidad</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>
                        Acciones
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {clientes.map((cliente) => (
                    <Fragment key={cliente.cli_id}>
                        <TableRow>
                        <TableCell className="font-medium w-1/6">{cliente.cli_unidad}</TableCell>
                        <TableCell>{cliente.cli_name}</TableCell>
                        <TableCell className="w-1/6 ">
                            <Button size="icon" variant="ghost" onClick={() => {
                                setTitleModalCliente({label: "Editar cliente",id: 2})
                                setInputCli_unidad(cliente.cli_unidad)
                                setInputCli_name(cliente.cli_name)
                                setInputCli_id(cliente.cli_id)
                                setblockButtonCliente(false)
                                buttonNuevoCliente.current?.click()
                                
                            }}>
                                {/* <AlignJustify /> */}
                                <Pencil  className="h-4 w-4"/>
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => {
                                setDataInventario(cliente.cli_inventario)
                                setInputCli_unidad(cliente.cli_unidad)
                                setInputCli_name(cliente.cli_name)
                                buttonOpenInventario.current?.click()
                            }}>
                                {/* <AlignJustify /> */}
                                <ShoppingCart  className="h-4 w-4"/>
                            </Button>
                        </TableCell>
                        </TableRow>
                    </Fragment>
                    ))}
                </TableBody>
            </Table>
        </div>
        </LayoutDash>
    )
}
