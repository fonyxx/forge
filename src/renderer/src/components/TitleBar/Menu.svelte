<script lang="ts">
  import {onMount} from "svelte";
  // import type {TitleBarMenuItem} from "./TitleBar.ts";

  interface TitleBarMenuItemItem {
    label: string;
    onClick?: () => void;
    type: "item";
    icon?: string;
  }

  interface TitleBarMenuItemGroup {
    label: string;
    children?: TitleBarMenuItem[];
    type: "group";
    icon?: string;
  }

  interface TitleBarMenuItemSeparator {
    type: "separator";
  }

  type TitleBarMenuItem = TitleBarMenuItemItem | TitleBarMenuItemGroup | TitleBarMenuItemSeparator;

  export let
    x = 0, y = 0, items: TitleBarMenuItem[] = [];

  let windowHeight = 0, windowWidth = 0;
  let currentWidth = 220, currentHeight = 0;

  let tempClientY = 0;

  onMount(() => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  });
</script>

<div
  class="menu"
  bind:clientHeight={currentHeight} bind:clientWidth={currentWidth}
  style="left: {Math.min(x, windowWidth - currentWidth)}px;
         top: {Math.min(y, windowHeight - currentHeight)}px;"
>
  {#each items as item}
    {#if item.type == "separator"}
      <hr />
    {:else}
      <div class="div">
        <div class="icon">
          A
        </div>

        <span>{item.label}</span>

        {#if item.type == "group"}
          <svelte:self x={x + currentWidth + 7} y={y + tempClientY}
                       items={item.children}
          />
        {/if}
      </div>
    {/if}
  {/each}
</div>

<style lang="scss">
  @import "../c.scss";

  .menu {
    position: fixed;
    background: $l1;
    border: 1px solid $bdr;
    box-shadow: $bxshd;
    min-width: 160px;
    padding: 10px;
    border-radius: 4px;
  }
</style>
