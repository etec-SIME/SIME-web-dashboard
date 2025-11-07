export interface TipoEquipamentoSelectDTO { 
    idTipoEquipamento: number;
    nomeTipoEquipamento: string;
    idTipoChamado: number;
    nomeTipoChamado: string;
    equipamentoList: CodEquipamentoList[];
}

export interface CodEquipamentoList {
    codigoEquipamento: string;
}