declare module "svelte-tabs" {
    import { SvelteComponentTyped } from "svelte"
    export class Tab extends SvelteComponentTyped { }
    export class Tabs extends SvelteComponentTyped<{ initialSelectedIndex?: number }> { }
    export class TabList extends SvelteComponentTyped { }
    export class TabPanel extends SvelteComponentTyped { }
}