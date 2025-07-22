export enum PrioridadeChamadoEnum {
    AltaPrioridade = 'ALTA_PRIORIDADE',
    MediaPrioridade = 'MEDIA_PRIORIDADE',
    BaixaPrioridade = 'BAIXA_PRIORIDADE'
}

export const PrioridadeChamadoEnumDescricao: Record<PrioridadeChamadoEnum, string> =
{
    [PrioridadeChamadoEnum.AltaPrioridade]: 'Alta Prioridade',
    [PrioridadeChamadoEnum.MediaPrioridade]: 'Média Prioridade',
    [PrioridadeChamadoEnum.BaixaPrioridade]: 'Baixa Prioridade'
};