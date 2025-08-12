import { tipoChamado } from "./tipoChamado";
import { usuario } from "./usuario";

export interface departamento{
  idDepartamento: number
  nomeDepartamento: string;
  descricaoDepartamento: string

  tipoChamadoList: tipoChamado[]
  usuarioList: usuario[]
}
