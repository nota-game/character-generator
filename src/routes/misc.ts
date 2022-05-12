import type { Lokalisirung } from "src/data/nota.g";

export function getText(params: Lokalisirung): string {
    const languege = 'de';
    return (params.Lokalisirung.filter(x => x.meta.Sprache == languege)[0]
        ?? params.Lokalisirung[0]).value;
}