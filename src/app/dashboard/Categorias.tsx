import { Button } from '@/components/ui/button';
import LayoutDash from './LayoutDash'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Fragment, useEffect, useRef, useState } from 'react';
import { Pencil, Plus } from 'lucide-react';

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
import Categoria from '@/interfaces/categoria';
import { useToast } from '@/hooks/use-toast';

  
// const categorias: Categoria[] = [
//     {
//         cate_id: 1,
//         cate_name: "Ropa",
//     },
//     {
//         cate_id: 2,
//       cate_name: "Accesorios para Vehiculo",
//     },
//     // ...
//   ]

export const Categorias = () => {

  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [researchData, setResearchData] = useState(true)

  const [titleModalCategoria, setTitleModalCategoria] = useState({label: "Crear Categoria", id: 1})
  const [inputCate_id, setInputCate_id] = useState(0)
  const [inputCate_name, setInputCate_name] = useState("")

  const buttonNuevaCategoria = useRef<HTMLButtonElement>(null);
  const [blockButtonCategoria, setblockButtonCategoria] = useState(false)


  const { toast } = useToast()

  const SendForm = () => {
    
    // console.log({
    //   id: inputCate_id,
    //   cate_name: inputCate_name
    // });

    if (inputCate_name) {
      setblockButtonCategoria(true)
      const typeRequest = titleModalCategoria.id == 1 ? "POST" : "PUT"
    
      requestApi({ url: `/api/v1/taxitel_inv/categorias${typeRequest == "POST" ? "" : `/${inputCate_id}`}`, type: typeRequest , data: {cate_name: inputCate_name}})
      .then((data) => {
        console.log(data);
        toast({
          description: data.message,
        })
        setResearchData(!researchData);
        buttonNuevaCategoria.current?.click()
  
      });
    } else {
      toast({
        variant: "destructive",
        description: "Complete todos los campos obligatorios.",
      })
    }

    
  }

  useEffect(() => {
      requestApi({ url: `/api/v1/taxitel_inv/categorias`, type: 'GET'})
      .then(({ data }) => {
        setCategorias(data);
      });
  }, [researchData])
  


  return (
    <LayoutDash>
        {/* MODAL */}
    
        <Dialog>
            <DialogTrigger asChild>
            <Button variant="outline"  className='my-4 hidden' ref={buttonNuevaCategoria}><Plus />Nueva categoria</Button>
            </DialogTrigger>
            <Button variant="outline"  className='my-4'  onClick={() => {
                            setblockButtonCategoria(false)
                            setTitleModalCategoria({label: "Crear categoria", id: 1})
                            setInputCate_name("")
                            setInputCate_id(0)
                            buttonNuevaCategoria.current?.click()
                        }}><Plus />Nueva categoria</Button>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{titleModalCategoria.label}</DialogTitle>
                    {/* <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> */}
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="cate_name" className="text-right">
                        Nombre*
                    </Label>
                    <Input id="cate_name" value={inputCate_name} onChange={(e) => setInputCate_name(e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={() => {SendForm()}} disabled = {blockButtonCategoria}>Guardar cambios</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

      {/* FIN MODAL */}
        <div className="border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Nombre</TableHead>
              <TableHead>
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categorias.map((categoria) => (
              <Fragment key={categoria.cate_id}>
                <TableRow>
                  <TableCell className="font-medium w-1/4">{categoria.cate_name}</TableCell>
                  <TableCell className="w-1/6 ">
                    <Button size="icon" variant="ghost" onClick={() => {
                        setblockButtonCategoria(false)
                        setTitleModalCategoria({label: "Editar categoria",id: 2})
                        setInputCate_name(categoria.cate_name)
                        setInputCate_id(categoria.cate_id)
                        buttonNuevaCategoria.current?.click()
                      }}>
                      {/* <AlignJustify /> */}
                      <Pencil  className="h-4 w-4"/>
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
