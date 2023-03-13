<script lang="ts">
  import type {ModalBodySlack} from "../TitleBar.ts";
  import {createEventDispatcher, onMount} from "svelte";
  import TextField from "../../TextField/TextField.svelte"

  export let pan: ModalBodySlack[] = [], closable = false, footer = false;
  let fbl = false;

  const dispatch = createEventDispatcher();

  $: {
    fbl = false;
    pan.forEach((slack) => {
      if (slack.type === "buttons") {
        fbl = true;
      }
    });
  }

  onMount(() => {
    pan.forEach((slack) => {
      if (slack.type === "buttons") {
        fbl = true;
      }
    });
  });
</script>

<div class="pan">
  {#if closable && !fbl}
    <div class="buttons" style={`justify-content: ${footer ? 'flex-end' : 'flex-start'}`}>
      <button class="button" on:click={() => {
            dispatch("close");
          }}>
        Close
      </button>
    </div>
  {/if}

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
      <div class="buttons" style={`justify-content: ${footer ? 'flex-end' : 'flex-start'}`}>
        {#if closable}
          <button class="button" on:click={() => {
            dispatch("close");
          }}>
            Close
          </button>
        {/if}

        {#each item.buttons as button}
          <button class={"button" + (" " + button.mode)} on:click={button.onClick}>
            {button.label}
          </button>
        {/each}
      </div>

    {:else if item.type === "form"}
      <form>
        {#each item.fields as input}
          <label>{input.label}</label>
          <div class="input">
            <TextField initialValue={input.initialValue ?? ""} name={input.name ?? ""} placeholder={input.placeholder ?? ""} />
          </div>
        {/each}
      </form>

    {:else if item.type === "hr"}
      <hr />
    {/if}
  {/each}
</div>

<style lang="scss">
  @import "../../c.scss";

  .pan {
    display: flex;
    flex-direction: column;
    gap: 10px;

    hr {
      width: calc(100% - 20px);
      margin: 0 10px;
      border: none;
      background: $bdr;
      height: 1px;
    }

    img {
      max-width: 100%;
      border-radius: 3px;
    }

    h1 {
      font-size: 23px;
      margin: 0;
      font-weight: normal;
      color: $f0;
      padding: 0 10px;
    }

    p {
      font-size: 13px;
      margin: 0;
      color: $f1;
      padding: 0 10px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-width: 400px;
      padding: 0 10px;

      .input {
        height: 30px;
      }
    }

    .buttons {
      gap: 10px;
      display: flex;
      flex-direction: row;
      padding: 0 10px;

      .button {
        background: transparent;
        border: 1px solid $bdr;
        color: $f0;
        transition: 200ms;
        padding: 0 10px;
        height: 30px;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;

        &.primary {
          background: $c1;
          color: $l0;
        }

        &:hover {
          background: $d0;
          cursor: pointer;
          color: $f1;

          &.primary {
            background: $c1;
            color: $l0;
            opacity: 0.6;
          }
        }
      }
    }
  }
</style>
