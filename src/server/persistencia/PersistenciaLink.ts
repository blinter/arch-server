import InstanciaKNEX from '../db/InstanciaKNEX'
import Link from '../model/Link'

export default class PersistenciaLink {
    async atualizar(link: Link) {
        let row = Link.toRow(link)
        let r = await InstanciaKNEX.from('url')
            .update(row)
            .where('id', link.id)
        return r
    }

    async listarNaoProcessados(): Promise<Link[]> {

        let rows = await InstanciaKNEX.from('url')
            .where('status_processamento', '0')
            .andWhere('id', '<', 999999999).andWhere('id', '>', 180000)
            .orderBy('id', 'asc')
            .limit(100)

        return Link.fromRows(rows)
    }

    async inserir(links: Link[]) {
        InstanciaKNEX.batchInsert("url", links.map(link => Link.toRow(link))).then((r) => {
            console.log(r)
        }).catch((erro) => {
            console.log(erro)
        })
    }

}