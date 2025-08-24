//TODO: Format UF from 10000 to 10.000,00
// TODO: FORMAT UF to CLP

export function formatToCLP(value: number): string {
    return `$ ${Math.round(value).toLocaleString("es-CL")}`;
}

export function formatUFtoCLP(value: number, ufRate: number): string {
    const clpValue = value * ufRate;
    return formatToCLP(clpValue);
}

export function formatUF(value: number): string {
    return new Intl.NumberFormat("es-CL", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}