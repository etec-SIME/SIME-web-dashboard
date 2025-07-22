export enum StatusChamadoEnum {
    EmAvaliacao = 'AGUARDANDO_AVALIACAO',
    Pendente = 'PENDENTE', 
    Concluido = 'CONCLUIDO'
}

export const StatusChamadoEnumDescricao: Record<StatusChamadoEnum, string> =
{
    [StatusChamadoEnum.EmAvaliacao]: 'Aguardando aprovação',
    [StatusChamadoEnum.Pendente]: 'Pendente',
    [StatusChamadoEnum.Concluido]: 'Concluído',
};
