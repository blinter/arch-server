import NumeroUnicoProcesso from './NumeroUnicoProcesso'
import PersistenciaLink from '../persistencia/PersistenciaLink'
import Link from '../model/Link'
import https from 'https'
import { IncomingMessage } from 'node:http'

const persistencia = new PersistenciaLink()

export default class LinkBusiness {

    constructor() { }

    gerarLinks() {

        let links = []
        for (let i = 200001; i <= 300000; i++) {
            links.push(new Link(new NumeroUnicoProcesso(i, '2017', '0000', '405').url))
        }

        persistencia.inserir(links)
    }

    async processasrLinks() {
        let links = await persistencia.listarNaoProcessados()

        for (let link of links) {
            try {
                https.get(link.url, (res: IncomingMessage) => {
                    res.setEncoding("utf-8");
                    link.statusProcessamento = res.statusCode;
                    let rawData = '';
                    res.on('data', (chunk) => { rawData += chunk; });
                    res.on('end', () => {
                        try {
                            link.documento = rawData;
                            link.dataProcessamento = new Date();
                            persistencia.atualizar(link)
                        } catch (e) {
                            console.error(e.message);
                        }
                    });
                })
            } catch (error) {
                console.log("Erro na request ->", error)
            }

        }
    }

}