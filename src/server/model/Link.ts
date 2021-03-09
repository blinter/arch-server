import StatusProcessamento from '../enums/StatusProcessamento';

export default class Link {

    public id?: number;
    public url: string;
    public detalhesProcessamento?: string;
    public statusProcessamento?: number = 0;
    public dataProcessamento?: Date;
    public documento?: string;

    constructor(url: string) {
        this.url = url;
    }

    static toRow(link: Link) {
        return {
            id: link.id,
            url: link.url,
            status_processamento: link.statusProcessamento || 0,
            data_processamento: link.dataProcessamento || null,
            detalhes_processamento: link.detalhesProcessamento || null,
            documento: link.documento || null
        }
    }

    static fromRow(row: any) {
        let link: Link = new Link(row.url)
        link.id = row.id;
        link.statusProcessamento = row.status_processamento;
        link.dataProcessamento = row.data_processamento;
        link.detalhesProcessamento = row.detalhes_processamento;
        link.documento = row.documento;
        return link
    }

    static fromRows(rows: any[]) {
        let resultado = []
        for (const row of rows) {
            resultado.push(Link.fromRow(row))
        }
        return resultado
    }
}