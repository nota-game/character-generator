<script lang="ts">
import type { Kosten } from "src/data/nota.g";
import { getText } from "../misc";
import { Data } from "../models/Data";

export let cost: Kosten;
</script>

<div>
    {#each cost.Kosten as c}
        <abbr title={getText(Data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter(x=> x.Id==c.Id)[0].Name)} > {getText(Data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter(x=> x.Id==c.Id)[0].Abkürzung)}</abbr>: {c.Wert}
    {/each}
</div>