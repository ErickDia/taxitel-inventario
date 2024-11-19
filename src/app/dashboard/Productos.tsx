
import LayoutDash from './LayoutDash'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronsUpDownIcon, Package, Pencil, Plus } from 'lucide-react'

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


import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Categoria from '@/interfaces/categoria'
import { requestApi } from '@/hooks/useRequestApi'
import { useToast } from '@/hooks/use-toast'



type SubProduct = {
  subprod_id: number
  subprod_name: string
  prod_id: number
  subprod_stock: number
}

type Product = {
  prod_id: number
  prod_name: string
  prod_foto: string
  prod_stock: number
  cate_id: number
  cate_name: string
  subProducts?: SubProduct[]
}

// const products: Product[] = [
//   {
//     prod_id: 1,
//     prod_name: "casquete",
//     prod_foto: "casquete.jpg",
//     prod_stock: 5,
//     cate_id: 2,
//     cate_nombre: "Accesorios para Vehiculo"
//   },
//   {
//     prod_id: 2,
//     prod_name: "Camisa verde clasica",
//     prod_foto: "Camisa.jpg",
//     prod_stock: 10,
//     cate_id: 1,
//     cate_nombre: "Ropa",
//     subProducts: [
//       {
//         subprod_id: 1,
//         subprod_name: 'Camisa verde clasica S',
//         prod_id: 2,
//         subprod_stock: 4
//       },
//       {
//         subprod_id: 2,
//         subprod_name: 'Camisa verde clasica M',
//         prod_id: 2,
//         subprod_stock: 4
//       },
//       {
//         subprod_id: 3,
//         subprod_name: 'Camisa verde clasica L',
//         prod_id: 2,
//         subprod_stock: 2
//       }
//     ]
//   },
//   // ...
// ]

// const categorias = [
//   {
//     cate_id: 1,
//     cate_name: "Ropa",
//   },
//   {
//     cate_id: 2,
//     cate_name: "Accesorios Para Vehiculo",
//   },
// ]

const clientes = [
  {
    cli_id: 1,
    cli_name: "Erick",
    cli_unidad: "T01",
    cli_label: "T01 - Erick",
  },
  {
    cli_id: 2,
    cli_name: "Jorge",
    cli_unidad: "T02",
    cli_label: "T02 - Jorge",
  },
]


export const Productos = () => {

  const [products, setProducts] = useState<Product[]>([])

  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [researchData, setResearchData] = useState(true)


  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const toggleRowExpansion = (id: number) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id))
    } else {
      setExpandedRows([...expandedRows, id])
    }
  }

  // modal config=================================

  const [titleModalProduct, setTitleModalProduct] = useState({label: "Crear Producto", id: 1})



  const [inputProd_id, setInputProd_id] = useState(0)
  const [inputSubprod_id, setInputSubprod_id] = useState(0)
  const [inputProd_name, setInputProd_name] = useState("")
  const [inputProd_stock, setInputProd_stock] = useState("")

  //config combobox
  const [openComboCategorias, setOpenComboCategorias] = useState(false)
  const [cate_id, setCate_id] = useState(0)
  //fin config combobox

  const buttonNuevoProducto = useRef<HTMLButtonElement>(null);
  const [blockButtonProducto, setblockButtonProducto] = useState(false)

  // fin modal config=============================

  //modal config movimiento=======================
  // const [inputProd_id, setInputProd_id] = useState(0)

  const [typeModalMov, setTypeModalMov] = useState(1)
  const [inputTipoMov, setInputTipoMovk] = useState("Entrada")
  const [inputMovCantidad, setInputMovCantidad] = useState("")
  const [inputMovComentario, setInputMovComentario] = useState("")

  //config combobox
  const [cli_id, setCli_id] = useState(0)
  const [openComboClientes, setOpenComboClientes] = useState(false)
  //fin config combobox

  const buttonMovimiento = useRef<HTMLButtonElement>(null);
  const [blockButtonMovimiento, setblockButtonMovimiento] = useState(false)
  //fin modal config movimiento=======================



  const { toast } = useToast()



  const sendFormProducto = () => {


    console.log({
      cate_id: cate_id,
      prod_id: inputProd_id,
      prod_name: inputProd_name,
      prod_stock: inputProd_stock
    });
    if (inputProd_name && inputProd_stock != "" && cate_id) {
      setblockButtonProducto(true)
      if (titleModalProduct.id == 1) {
        requestApi({ url: `/api/v1/taxitel_inv/productos`, type: "POST" , data: {prod_name: inputProd_name, prod_stock: inputProd_stock, cate_id: cate_id}})
        .then((data) => {
          console.log(data);
          toast({
            description: data.message,
          })
          setResearchData(!researchData);
          buttonNuevoProducto.current?.click()
    
        });
      } else if (titleModalProduct.id == 2) {
        requestApi({ url: `/api/v1/taxitel_inv/productos/${inputProd_id}`, type: "PUT" , data: {prod_name: inputProd_name, cate_id: cate_id}})
        .then((data) => {
          console.log(data);
          toast({
            description: data.message,
          })
          setResearchData(!researchData);
          buttonNuevoProducto.current?.click()
    
        });
      } else if (titleModalProduct.id == 3) {
        requestApi({ url: `/api/v1/taxitel_inv/productos/sub`, type: "POST" , data: {subprod_name: inputProd_name, subprod_stock: inputProd_stock, prod_id: inputProd_id}})
        .then((data) => {
          console.log(data);
          toast({
            description: data.message,
          })
          setResearchData(!researchData);
          buttonNuevoProducto.current?.click()
    
        });
      } else if (titleModalProduct.id == 4) {
        requestApi({ url: `/api/v1/taxitel_inv/productos/sub/${inputSubprod_id}`, type: "PUT" , data: {subprod_name: inputProd_name}})
        .then((data) => {
          console.log(data);
          toast({
            description: data.message,
          })
          setResearchData(!researchData);
          buttonNuevoProducto.current?.click()
    
        });
      }
    } else {
      toast({
        variant: "destructive",
        description: "Complete todos los campos obligatorios.",
      })
    }
    

  }

  const sendFormMovimiento = () => {


    if (inputTipoMov == "Entrada") {
      if (inputMovCantidad) {
        setblockButtonMovimiento(true)

        if (typeModalMov == 1) {
          requestApi({ url: `/api/v1/taxitel_inv/movimientos/entrada/`, type: 'POST', data: {
            prod_id: inputProd_id,
            mov_cantidad: inputMovCantidad,
            new_prod_stock: parseInt(inputMovCantidad) + parseInt(inputProd_stock),
            mov_comentario: inputMovComentario,
            subprod_id: 0,
            cli_id: 0
          }})
          .then((data) => {
            toast({
              description: data.message,
            })
            setResearchData(!researchData);
            buttonMovimiento.current?.click()
          });
        } else {
          requestApi({ url: `/api/v1/taxitel_inv/movimientos/entrada/`, type: 'POST', data: {
            prod_id: inputProd_id,
            mov_cantidad: inputMovCantidad,
            new_prod_stock: parseInt(inputMovCantidad) + parseInt(inputProd_stock),
            mov_comentario: inputMovComentario,
            subprod_id: inputSubprod_id,
            cli_id: 0
  
          }})
          .then((data) => {
            // setCategorias(data);
            toast({
              description: data.message,
            })
            setResearchData(!researchData);
            buttonMovimiento.current?.click()
  
  
          });
        }
      } else {
        toast({
          variant: "destructive",
          description: "Complete todos los campos obligatorios.",
        })
      }
      
    } else {
      if (inputMovCantidad) {
        setblockButtonMovimiento(true)
        if (typeModalMov == 1) {
          console.log(cli_id);
          
          requestApi({ url: `/api/v1/taxitel_inv/movimientos/salida/`, type: 'POST', data: {
            prod_id: inputProd_id,
            mov_cantidad: inputMovCantidad,
            new_prod_stock: parseInt(inputProd_stock) - parseInt(inputMovCantidad),
            mov_comentario: inputMovComentario,
            subprod_id: 0,
            cli_id: cli_id
          }})
          .then((data) => {
            toast({
              description: data.message,
            })
            setResearchData(!researchData);
            buttonMovimiento.current?.click()
          });
        } else {
          requestApi({ url: `/api/v1/taxitel_inv/movimientos/salida/`, type: 'POST', data: {
            prod_id: inputProd_id,
            mov_cantidad: inputMovCantidad,
            new_prod_stock: parseInt(inputProd_stock) - parseInt(inputMovCantidad),
            mov_comentario: inputMovComentario,
            subprod_id: inputSubprod_id,
            cli_id: cli_id
  
          }})
          .then((data) => {
            // setCategorias(data);
            toast({
              description: data.message,
            })
            setResearchData(!researchData);
            buttonMovimiento.current?.click()
  
  
          });
        }
      } else {
        toast({
          variant: "destructive",
          description: "Complete todos los campos obligatorios.",
        })
      }
      
    }
    
    
  }


  useEffect(() => {
    requestApi({ url: `/api/v1/taxitel_inv/categorias`, type: 'GET'})
    .then(({ data }) => {
      setCategorias(data);
    });
  }, [])

  useEffect(() => {
    requestApi({ url: `/api/v1/taxitel_inv/productos`, type: 'GET'})
    .then(({ data }) => {
      console.log(data);
      
      setProducts(data);
    });
  }, [researchData])

  return (
    <LayoutDash>
      <div className='flex gap-2'>
        {/* MODAL PRODUCTO */}

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline"  className='my-4 hidden' ref={buttonNuevoProducto}><Plus />Nuevo producto</Button>
          </DialogTrigger>
          <Button variant="outline"  className='my-4'  onClick={() => {
                          setTitleModalProduct({label: "Crear producto", id: 1})
                          setInputProd_id(0)
                          setInputSubprod_id(0)
                          setCate_id(0)
                          setInputProd_name("")
                          setInputProd_stock("")

                          setblockButtonProducto(false)
                          buttonNuevoProducto.current?.click()
                        }}><Plus />Nuevo producto</Button>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{titleModalProduct.label}</DialogTitle>
              {/* <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription> */}
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="prod_name" className="text-right">
                  Nombre*
                </Label>
                <Input id="prod_name" value={inputProd_name} onChange={(e) => setInputProd_name(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="prod_stock" className="text-right">
                  Stock*
                </Label>
                <Input id="prod_stock" value={inputProd_stock} onChange={(e) => setInputProd_stock(e.target.value)} className="col-span-3" type='number' disabled={titleModalProduct.id == 2 || titleModalProduct.id == 4}/>
              </div>
              <div className={"grid grid-cols-4 items-center gap-4" + ((titleModalProduct.id == 3 || titleModalProduct.id == 4) ? " hidden" : "")}>
                <Label htmlFor="cate_id" className="text-right">
                  Categoria*
                </Label>

                {/* combobox */}

                <Popover open={openComboCategorias} onOpenChange={setOpenComboCategorias}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openComboCategorias}
                      className="col-span-3 justify-between"
                    >
                      {cate_id
                        ? categorias.find((categoria) => categoria.cate_id === cate_id)?.cate_name
                        : "Seleccionar categoria..."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar categoria..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>No se econtro la categoria.</CommandEmpty>
                        <CommandGroup>
                          {categorias.map((categoria) => (
                            <CommandItem
                              key={categoria.cate_id}
                              value={`${categoria.cate_name}`}
                              onSelect={() => {
                                if (categoria.cate_id == cate_id) {
                                  setCate_id(0)
                                } else {
                                  setCate_id(categoria.cate_id === cate_id ? 0 : categoria.cate_id)
                                }
                                setOpenComboCategorias(false)
                              }}
                            >
                              {categoria.cate_name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  cate_id === categoria.cate_id ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* fin combobox */}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => {sendFormProducto()}} disabled={blockButtonProducto}>Guardar cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* FIN MODAL PRODUCTO */}


        {/* MODAL MOVIMIENTO */}

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline"  className='my-4 hidden' ref={buttonMovimiento}><Plus />Crear Movimiento</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Nuevo Movimiento</DialogTitle>
              {/* <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription> */}
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-5 items-center gap-5">
                <Label htmlFor="mov_tipo" className="text-right">
                    Tipo
                </Label>
                <div className="col-span-2 gap-2 flex">
                  <input type='radio' id="mov_tipo_entrada" name='mov_tipo' value="Entrada" onChange={() => setInputTipoMovk("Entrada")} checked={inputTipoMov == "Entrada"}/>
                  <Label htmlFor="mov_tipo_entrada">Entrada</Label>
                </div>
                <div className="col-span-2 gap-2 flex">
                  <input type='radio' id="mov_tipo_salida" name='mov_tipo' value="Salida" onChange={() => setInputTipoMovk("Salida")} checked={inputTipoMov == "Salida"}/>
                  <Label htmlFor="mov_tipo_salida">Salida</Label>
                </div>
              </div>
              {
                inputTipoMov == "Salida" ? (
                  <div className={"grid grid-cols-5 items-center gap-5" + ((titleModalProduct.id == 3 || titleModalProduct.id == 4) ? " hidden" : "")}>
                <Label htmlFor="cate_id" className="text-right">
                  Cliente*
                </Label>

                {/* combobox */}

                <Popover open={openComboClientes} onOpenChange={setOpenComboClientes}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openComboClientes}
                      className="col-span-4 justify-between"
                    >
                      {cli_id
                        ? clientes.find((cliente) => cliente.cli_id === cli_id)?.cli_label
                        : "Seleccionar cliente..."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar cliente..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>No se econtro el cliente.</CommandEmpty>
                        <CommandGroup>
                          {clientes.map((cliente) => (
                            <CommandItem
                              key={cliente.cli_id}
                              value={`${cliente.cli_label}`}
                              onSelect={() => {
                                // console.log(currentValue);
                                
                                setCli_id(cliente.cli_id == cli_id ? 0 : cliente.cli_id)
                                setOpenComboClientes(false)
                              }}
                            >
                              {cliente.cli_label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  cli_id === cliente.cli_id ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* fin combobox */}
              </div>
                ) : ''
              }
              <div className="grid grid-cols-5 items-center gap-5">
                <Label htmlFor="mov_cantidad" className="text-right">
                  Cantidad*
                </Label>
                <Input id="mov_cantidad" value={inputMovCantidad} onChange={(e) => setInputMovCantidad(e.target.value)} className="col-span-4" type="number"/>
              </div>
              <div className="grid grid-cols-5 items-center gap-5">
                <Label htmlFor="mov_comentario" className="text-right">
                  Comentario
                </Label>
                <Input id="mov_comentario" value={inputMovComentario} onChange={(e) => setInputMovComentario(e.target.value)} className="col-span-4"/>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => {sendFormMovimiento()}} disabled={blockButtonMovimiento}>Guardar cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* FIN MODAL MOVIMIENTO */}
      </div>                   

      <div className="border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Nombre</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <Fragment key={product.prod_id}>
                <TableRow>
                  <TableCell className="font-medium w-1/4">{product.prod_name}</TableCell>
                  <TableCell>{product.prod_stock}</TableCell>
                  <TableCell>{product.cate_name}</TableCell>
                  <TableCell className="w-1/6 ">
                    <Button size="icon" variant="ghost" onClick={() => {
                        setTitleModalProduct({label: "Editar producto",id: 2})
                        setInputProd_id(product.prod_id)
                        setInputSubprod_id(0)
                        setCate_id(product.cate_id)
                        setInputProd_name(product.prod_name)
                        setInputProd_stock(`${product.prod_stock}`)

                        setblockButtonProducto(false)
                        buttonNuevoProducto.current?.click()
                      }}>
                      {/* <AlignJustify /> */}
                      <Pencil  className="h-4 w-4"/>
                    </Button>
                    
                    <Button size="icon" variant="ghost" onClick={() => {
                        setTitleModalProduct({label: "Crear sub-producto",id: 3})
                        setInputProd_id(product.prod_id)
                        setInputSubprod_id(0)
                        setCate_id(product.cate_id)
                        setInputProd_name("")
                        setInputProd_stock("")

                        setblockButtonProducto(false)

                        buttonNuevoProducto.current?.click()
                      }}>
                      <Plus />
                    </Button>
                    {
                      product.subProducts ? "" : (
                        <Button size="icon" variant="ghost" onClick={() => {
                          setTypeModalMov(1)
                          setInputMovCantidad("")
                          setInputMovComentario("")
                          setInputProd_id(product.prod_id)
                          setInputProd_stock(`${product.prod_stock}`)

                          setblockButtonMovimiento(false)
                          buttonMovimiento.current?.click()
                        }}>
                          <Package />
                        </Button>
                      )
                    }
                    
                    {
                      product.subProducts ? (
                        <Button size="icon" variant="ghost" onClick={() => toggleRowExpansion(product.prod_id)}>
                          <ChevronsUpDownIcon className="h-4 w-4" />
                        </Button>
                      ) : ''
                    }
                    
                  </TableCell>
                </TableRow>
                {
                  product.subProducts ? (
                    expandedRows.includes(product.prod_id) && (
                      product.subProducts.map((subproduct) => (
                        <TableRow key={subproduct.subprod_id}>
                          <TableCell className="bg-muted/20 p-4 w-1/4">
                            {subproduct.subprod_name}
                          </TableCell>
                          <TableCell colSpan={2} className="bg-muted/20 p-4">
                            {subproduct.subprod_stock}
                          </TableCell>
                          <TableCell className="bg-muted/20 p-4">
                            <Button size="icon" variant="ghost"  onClick={() => {
                              setTitleModalProduct({label: "Editar sub-producto", id: 4})
                              setInputProd_id(subproduct.prod_id)
                              setInputSubprod_id(subproduct.subprod_id)
                              setCate_id(product.cate_id)
                              setInputProd_name(subproduct.subprod_name)
                              setInputProd_stock(`${subproduct.subprod_stock}`)
                              buttonNuevoProducto.current?.click()
                            }}>
                              <Pencil  className="h-4 w-4"/>
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => {
                              setTypeModalMov(2)
                              setInputMovCantidad("")
                              setInputMovComentario("")
                              setInputProd_id(subproduct.prod_id)
                              setInputSubprod_id(subproduct.subprod_id)
                              setInputProd_stock(`${subproduct.subprod_stock}`)
                              buttonMovimiento.current?.click()
                            }}>
                              <Package />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                      
                    )
                  ) : ''
                }
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </LayoutDash>
  )
}
