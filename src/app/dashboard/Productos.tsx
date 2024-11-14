
import LayoutDash from './LayoutDash'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Fragment, useRef, useState } from 'react'
import { AlignJustify, ChevronsUpDownIcon, Pencil, Plus } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  cate_nombre: string
  subProducts?: SubProduct[]
}

const products: Product[] = [
  {
    prod_id: 1,
    prod_name: "casquete",
    prod_foto: "casquete.jpg",
    prod_stock: 5,
    cate_id: 2,
    cate_nombre: "Accesorios para Vehiculo"
  },
  {
    prod_id: 2,
    prod_name: "Camisa verde clasica",
    prod_foto: "Camisa.jpg",
    prod_stock: 10,
    cate_id: 1,
    cate_nombre: "Ropa",
    subProducts: [
      {
        subprod_id: 1,
        subprod_name: 'Camisa verde clasica S',
        prod_id: 2,
        subprod_stock: 4
      },
      {
        subprod_id: 2,
        subprod_name: 'Camisa verde clasica M',
        prod_id: 2,
        subprod_stock: 4
      },
      {
        subprod_id: 3,
        subprod_name: 'Camisa verde clasica L',
        prod_id: 2,
        subprod_stock: 2
      }
    ]
  },
  // ...
]

const categorias = [
  {
    cate_id: 1,
    cate_name: "Ropa",
  },
  {
    cate_id: 2,
    cate_name: "Accesorios Para Vehiculo",
  },
]


export const Productos = () => {

  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const toggleRowExpansion = (id: number) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id))
    } else {
      setExpandedRows([...expandedRows, id])
    }
  }

  // modal config

  const [titleModalProduct, setTitleModalProduct] = useState({label: "Crear Producto", id: 1})

  const [containSubprods, setContainSubprods] = useState(false)
  const [inputProd_id, setInputProd_id] = useState(0)
  const [inputProd_name, setInputProd_name] = useState("")
  const [inputProd_stock, setInputProd_stock] = useState("")


  const [open, setOpen] = useState(false)
  const [cate_id, setCate_id] = useState(0)

  const buttonNuevoProducto = useRef<HTMLButtonElement>(null);

  

  // fin modal config

  return (
    <LayoutDash>
      {/* MODAL */}

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline"  className='my-4 hidden' ref={buttonNuevoProducto}><Plus />Nuevo producto</Button>
        </DialogTrigger>
        <Button variant="outline"  className='my-4'  onClick={() => {
                        setTitleModalProduct({label: "Crear producto", id: 1})
                        setInputProd_id(0)
                        setCate_id(0)
                        setInputProd_name("")
                        setInputProd_stock("")
                        buttonNuevoProducto.current?.click()
                      }}><Plus />Nuevo producto</Button>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{titleModalProduct.label}</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prod_name" className="text-right">
                Nombre
              </Label>
              <Input id="prod_name" value={inputProd_name} onChange={(e) => setInputProd_name(e.target.value)} className="col-span-3" />
            </div>
            <div className={"grid grid-cols-4 items-center gap-4" + (titleModalProduct.id == 2 && containSubprods ? " hidden" : "")}>
              <Label htmlFor="prod_stock" className="text-right">
                Stock
              </Label>
              <Input id="prod_stock" value={inputProd_stock} onChange={(e) => setInputProd_stock(e.target.value)} className="col-span-3" type='number' />
            </div>
            <div className={"grid grid-cols-4 items-center gap-4" + (titleModalProduct.id != 3 ? "" : " hidden")}>
              <Label htmlFor="cate_id" className="text-right">
                Categoria
              </Label>
              {/* <Input id="cate_id" value="" className="col-span-3"/> */}

              {/* combobox */}

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
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
                            value={`${categoria.cate_id}`}
                            onSelect={(currentValue) => {
                              setCate_id(parseInt(currentValue) === cate_id ? 0 : parseInt(currentValue))
                              setOpen(false)
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
            <Button type="submit">Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* FIN MODAL */}


      <div className="border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Nombre</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>
                Acciones
                {/* <span className="sr-only">Acciones</span> */}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <Fragment key={product.prod_id}>
                <TableRow>
                  <TableCell className="font-medium w-1/4">{product.prod_name}</TableCell>
                  <TableCell>{product.prod_stock}</TableCell>
                  <TableCell>{product.cate_nombre}</TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost" onClick={() => {
                        setTitleModalProduct({label: "Editar producto",id: 2})
                        setInputProd_id(product.prod_id)
                        setCate_id(product.cate_id)
                        setInputProd_name(product.prod_name)
                        setInputProd_stock(`${product.prod_stock}`)

                        product.subProducts ? setContainSubprods(true): setContainSubprods(false)
                        buttonNuevoProducto.current?.click()
                      }}>
                      {/* <AlignJustify /> */}
                      <Pencil  className="h-4 w-4"/>
                    </Button>
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
                        <TableRow>
                          <TableCell className="bg-muted/20 p-4 w-1/4">
                            {subproduct.subprod_name}
                          </TableCell>
                          <TableCell colSpan={2} className="bg-muted/20 p-4">
                            {subproduct.subprod_stock}
                          </TableCell>
                          <TableCell className="bg-muted/20 p-4">
                            <Button size="icon" variant="ghost"  onClick={() => {
                              setTitleModalProduct({label: "Editar sub-producto", id: 3})
                              setInputProd_id(subproduct.prod_id)
                              setCate_id(product.cate_id)
                              setInputProd_name(subproduct.subprod_name)
                              setInputProd_stock(`${subproduct.subprod_stock}`)
                              buttonNuevoProducto.current?.click()
                            }}>
                              <Pencil  className="h-4 w-4"/>
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
