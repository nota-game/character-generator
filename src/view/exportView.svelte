<script lang="ts">
  export let exportText: string | undefined;

  let copiedLable: HTMLElement;

  let animate = false;

  $: focusOn(undefined, exportText);

  async function focusOn(
    e:
      | (FocusEvent & {
          currentTarget: EventTarget & HTMLTextAreaElement;
        })
      | undefined,
    text: string | undefined
  ) {
    e?.currentTarget.select();

    if (exportText) {
      await navigator.clipboard.writeText(exportText);

      copiedLable.addEventListener('animationend', () => {
        animate = false;
      });
      animate = true;
    }
  }
</script>

<dialog open={exportText !== undefined}>
  <form>
    <div style="position: relative;">
      <textarea
        bind:value={exportText}
        on:click={(e) => focusOn(e, exportText)}
        style="height: calc(100vh - 10rem); width: calc(100vw -  2 * var(--block-spacing-horizontal))"
        readonly
      />
      <ins class="instrted" class:animate bind:this={copiedLable}>Text Copied ✔</ins>
    </div>
    <button on:click={() => (exportText = undefined)}>Close</button>
  </form>
</dialog>

<style lang="scss">
  ins {
    position: absolute;
    padding: 0px 0.6rem;
    margin: 1rem;
    border-radius: 1rem;
    color: white;
    background-color: var(--ins-color);
    bottom: 0px;

    max-width: 0rem;
    // width: 0%;
    display: block;
    overflow: hidden;
    // height: 3rem;
    white-space: nowrap;
    opacity: 0;
  }
  ins.animate {
    animation: show 2.5s ease-in-out;
  }
  @keyframes show {
    0% {
      max-width: 0%;
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    50% {
      max-width: 100%;
    }
    51% {
      max-width: 100%;
    }
    100% {
      max-width: 100%;
      opacity: 0;
    }
  }
</style>
