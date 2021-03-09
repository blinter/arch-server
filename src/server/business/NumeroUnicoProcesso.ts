/** Classe que representa a Numeração Única do Processo.
 *
 * Fonte: http://www.cnj.jus.br/atos-normativos?documento=119
 *
 * Resolução: Nº 65 de 16/12/2008
 *
 * Norma: ISO 7064
 *
 * Estrutura: NNNNNNN-DD.AAAA.J.TR.OOOO
 */
export default class NumeroUnicoProcesso {

    private numero: string
    private ano: string
    private origem: string
    private identificacaoOrgao: string

    constructor(numero: number, ano: string, origem: string, identificadorOrgao: string) {
        this.numero = this.formatarNumero(numero);
        this.ano = this.formatarAno(ano);
        this.origem = this.formatarOrigem(origem);
        this.identificacaoOrgao = this.formatarJTR(identificadorOrgao);
    }

    public get url() {
        let digito = this.calcularDigitoVerificador(this.numero, this.ano, this.origem, this.identificacaoOrgao)
        let link = `https://cp.trf5.jus.br/processo/${this.numero}-${this.formatarDigitoVerificador(digito)}.${this.ano}.4.05.0000`;

        return link
    }


    /**
     * Calcula o digito verificador da numeração única do processo
     * @param {(number|string)} numero - Número da numeração única do processo (NNNNNNN)
     * @param {(number|string)} ano - Ano da numeração única do processo (AAAA)
     * @param {(number|string)} origem - Origem da numeração única do processo (OOOO)
     * @param {(number|string)} jtr - Identificação do órgão da justiça (JTR)
     * @return {number} Retorna o digito verificador da numeração única do processo (Algoritmo Módulo 97 Base 10 (Norma ISO 7064))
     */
    private calcularDigitoVerificador(
        numero: number | string,
        ano: number | string,
        origem: number | string,
        jtr: number | string
    ): number {
        const valor = this.calcular(numero, ano, origem, jtr);
        return 98 - (+valor % 97);
    }

    /**
     * Valida o digito verificador da numeração única do processo
     * @param {(number|string)} numero - Número da numeração única do processo (NNNNNNN)
     * @param {(number|string)} ano - Ano da numeração única do processo (AAAA)
     * @param {(number|string)} origem - Origem da numeração única do processo (OOOO)
     * @param {(number|string)} jtr - Identificação do órgão da justiça (JTR)
     * @param {(number|string)} digitoVerificador - Digito Verificador da numeração única do processo (DD)
     * @return {boolean} Retorna um boleano indicando se o digito verificador está correto ou não.
     */
    private validarDigitoVerificador(
        numero: number | string,
        ano: number | string,
        origem: number | string,
        jtr: number | string,
        digitoVerificador: number | string
    ): boolean {
        const valor = this.calcular(numero, ano, origem, jtr, digitoVerificador);
        return +valor % 97 === 1;
    }

    /**
     * Calcula o Módulo 97 Base 10 (Norma ISO 7064)
     * @param {(number|string)} numero - Número da numeração única do processo (NNNNNNN)
     * @param {(number|string)} ano - Ano da numeração única do processo (AAAA)
     * @param {(number|string)} origem - Origem da numeração única do processo (OOOO)
     * @param {(number|string)} jtr - Identificação do órgão da justiça (JTR)
     * @param {(number|string)} digitoVerificador - Digito Verificador da numeração única do processo (DD)
     * @return {string} Retorna a concatenação do valor calculado + origem + digitoVerificador
     */
    private calcular(
        numero: number | string,
        ano: number | string,
        origem: number | string,
        jtr: number | string,
        digitoVerificador: number | string = 0
    ): string {
        numero = this.formatarNumero(numero);
        ano = this.formatarAno(ano);
        origem = this.formatarOrigem(origem);
        jtr = this.formatarJTR(jtr);
        digitoVerificador = this.formatarDigitoVerificador(digitoVerificador);

        const resto = +numero % 97;
        const valor = `${resto}${ano}${jtr}`;

        const resto2 = +valor % 97;
        const valor2 = `${resto2}${origem}${digitoVerificador}`;

        return valor2;
    }

    /**
     * Formata o Número
     * @param {(number|string)} numero - Número da numeração única do processo (NNNNNNN)
     * @return {string} Número do processo formatado
     */
    private formatarNumero = (numero: number | string): string =>
        `${numero}`.padStart(7, '0');

    /**
     * Formata o Ano
     * @param {(number|string)} ano - Ano da numeração única do processo (AAAA)
     * @return {string} Retorna o ano do processo formatado
     */
    private formatarAno = (ano: number | string): string =>
        `${ano}`.padStart(4, '0');

    /**
     * Formata a Origem
     * @param {(number|string)} origem - Origem da numeração única do processo (OOOO)
     * @return {string} Retorna a origem do processo formatado
     */
    private formatarOrigem = (origem: number | string): string =>
        `${origem}`.padStart(4, '0');

    /**
     * Formata o JTR (Identificação do órgão da justiça)
     * @param {(number|string)} jtr - Identificação do órgão da justiça (JTR)
     * @return {string} Retorna o jtr do processo formatado
     */
    private formatarJTR = (jtr: number | string): string =>
        `${jtr}`.padStart(3, '0');

    /**
     * Formata o Dígito Verificador
     * @param {(number|string)} digitoVerificador - Digito Verificador da numeração única do processo (DD)
     * @return {string} Retorna o jtr do processo formatado
     */
    private formatarDigitoVerificador = (
        digitoVerificador: number | string
    ): string => `${digitoVerificador}`.padStart(2, '0');
}