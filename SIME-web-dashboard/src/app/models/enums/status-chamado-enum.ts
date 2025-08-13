export enum StatusChamadoEnum {
    AguardandoAvaliacao = 'AGUARDANDO_AVALIACAO',
    Pendente = 'PENDENTE', 
    Concluido = 'CONCLUIDO'
}

export const StatusChamadoEnumDescricao: Record<StatusChamadoEnum, string> =
{
    [StatusChamadoEnum.AguardandoAvaliacao]: 'Aguardando aprovação',
    [StatusChamadoEnum.Pendente]: 'Pendente',
    [StatusChamadoEnum.Concluido]: 'Concluído',
};
