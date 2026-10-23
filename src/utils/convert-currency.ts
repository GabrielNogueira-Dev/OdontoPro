
//JSDOCS

/**
 * Converte um valor monetário em reais (BRL) para centavos
 @param {string} amount O valor monetário em reais (BRL) a ser convertido
 @returns {number} O valor convertido em centavos

 @example
 *convertRealToCents("1.300,50"); //  Retorna: 123456 cents
 */

export function convertRealToCents(amount:string){

const normalizedAmount = amount
    .replace(/\s/g, "")
    .replace(/^R\$/i, "")
    .replace(/\./g, "")
    .replace(",", ".")

if (!/^\d+(?:\.\d{1,2})?$/.test(normalizedAmount)) {
    throw new Error("O preço informado não está em um formato válido.")
}

const numericPrice = Number(normalizedAmount)
const priceInCents = Math.round(numericPrice * 100)

    return priceInCents;
}