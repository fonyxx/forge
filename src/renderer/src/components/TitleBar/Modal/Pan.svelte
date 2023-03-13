<script lang="ts">
  import type {ModalBodySlack} from "../TitleBar.ts";

  export let pan: ModalBodySlack[] = [];
</script>

<div class="pan">
  {#each pan as item}
    {#if item.type === "text"}
      {#if item.mode === "header"}
        <h1>{item.value}</h1>
      {:else if item.mode === "paragraph"}
        <p>{item.value}</p>
      {:else if item.mode === "image"}
        <img src={item.value} alt={item.value} />
      {/if}

    {:else if item.type === "buttons"}
      <div class="buttons">
        {#each item.buttons as button}
          <button class="button" on:click={button.onClick}>
            {button.label}
          </button>
        {/each}
      </div>
    {/if}
  {/each}
</div>

<style lang="scss">
  @import "../../c.scss";

  .pan {
    display: flex;
    flex-direction: column;
    gap: 10px;

    img {
      max-width: 100%;
      border-radius: 3px;
    }

    h1 {
      font-size: 23px;
      margin: 0;
      font-weight: normal;
      color: $f0;
    }

    p {
      font-size: 13px;
      margin: 0;
      color: $f1;
    }
  }
</style>
