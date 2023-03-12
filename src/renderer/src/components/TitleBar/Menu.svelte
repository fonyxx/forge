<script lang="ts">
  import {onMount, onDestroy} from "svelte";
  import Icon from "@iconify/svelte";
  import type {TitleBarMenuItem} from "./TitleBar.ts";

  export let items: TitleBarMenuItem[] = [];
  let itemsActual: TitleBarMenuItem[] = [];
  export let
    mode: "auto" | "manual" = "auto", mouseX = 0, mouseY = 0,
    rtl = false, rightLighter = false, parentMenuSizeCount = 0,
    mouseOver = false, open = false;

  let forceHide = true;
  let mouseXRender = 0, mouseYRender = 0;

  let windowWidth = 0, windowHeight = 0;
  let selfWidth = 0, selfHeight = 0;

  function updateWindowDimensions() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  }

  onMount(() => {
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
  });

  onDestroy(() => {
    window.removeEventListener("resize", updateWindowDimensions);
  });

  let localVarsHeight: number[] = [];
  let localVarsWidth: number[] = [];
  let localItems: HTMLDivElement[] = [];

  $: {
    if (JSON.stringify(items) !== JSON.stringify(itemsActual) || (mouseX != mouseXRender) || (mouseY != mouseYRender)) {
      forceHide = true;
      setTimeout(() => {
        itemsActual = items;
        mouseXRender = mouseX;
        mouseYRender = mouseY;

        forceHide = false;
      }, 200);
    }
  }
</script>

<div
  class="menu"
  style={`
    ${rightLighter ? ("right: " + mouseXRender + "px;") : ("left: " + mouseXRender + "px;")}
    top: ${mouseYRender}px;
    direction: ${rtl ? "rtl" : "ltr"};
    position: ${mode === "auto" ? "absolute" : "fixed"};
    opacity: ${open && !forceHide ? "1" : "0"};
    ${!open || forceHide ? "pointer-events: none;" : ""}
    ${open && !forceHide ? "transform: scale(1);" : ""}
    max-height: ${windowHeight - mouseYRender}px;
  `}
  bind:clientWidth={selfWidth} bind:clientHeight={selfHeight}
  on:mouseenter={() => mouseOver = true} on:mouseleave={() => mouseOver = false}
>
  <div class="inner">
    {#each (Array.isArray(itemsActual) ? itemsActual : []) as item, index}
      {#if item.type === "separator"}
        <hr />
      {:else}
        <div
          class="item"
          bind:clientHeight={localVarsHeight[index]} bind:clientWidth={localVarsWidth[index]} bind:this={localItems[index]}
          on:click={() => {
          if (item.type != "item" && item.type != "group") {
            open = false;
            console.log("ELX Dispatcher Support");
            setTimeout(() => {
              if (item.onClick) item.onClick();
            }, 200);
          }
        }}
        >
          <div class="left">
            <div class="icon">
              {#if item.icon}
                <Icon icon={item.icon} />
              {/if}
            </div>

            <span class="label">
            {item.label}
          </span>
          </div>

          <div class="right">
            {#if item.shortcut}
              {#if item.shortcut}
              <span class="shortcut">
                {item.shortcut}
              </span>
              {/if}
            {:else if item.type == "group"}
              <div class="arrow">
                {#if !rtl}
                  <Icon icon="fluent:chevron-right-16-regular" />
                {:else}
                  <Icon icon="fluent:chevron-left-16-regular" />
                {/if}

                <div class="inner-self">
                  <svelte:self
                    items={item.children}
                    mode="auto"
                    rtl={rtl}
                    rightLighter={rtl}
                    parentMenuSizeCount={parentMenuSizeCount + 1}
                    mouseY={-localVarsHeight[index]}
                    mouseX={17}
                    bind:open={open}
                  />
                </div>
              </div>
            {/if}
          </div>
        </div>
      {/if}
    {/each}
  </div>
</div>

<style lang="scss">
  @import "../c.scss";

  .menu {
    background: $l1;
    border: 1px solid $bdr;
    box-shadow: $bxshd;
    min-width: 220px;
    padding: 5px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    transition: opacity 200ms, transform 200ms;
    transform: scale(0.9);
    -webkit-app-region: no-drag;

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-track {
      background: $d0;
    }

    .inner {
      hr {
        width: 100%;
        height: 1px;
        background: $bdr;
        border: none;
      }

      .item {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 5px;
        border-radius: 3px;
        cursor: pointer;
        transition: 200ms;
        gap: 40px;
        position: relative;
        min-height: 30px;

        .left .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 15px;
          border-radius: 3px;
          width: 15px;
          font-size: 16px;
          overflow: hidden;
        }

        .right {
          .shortcut {
            color: $f0;
          }

          .arrow {
            .inner-self {
              pointer-events: none;
              opacity: 0;
              transition: 200ms;
              transition-delay: 0ms;
              position: relative;
              z-index: 1;
              transform: scale(0.9);
            }
          }
        }

        &:hover {
          background: $d0;

          .right {
            .arrow {
              & > .inner-self {
                opacity: 1;
                pointer-events: all;
                transition-delay: 400ms;
                transform: scale(1);
              }
            }
          }
        }

        .left, .right {
          display: flex;
          align-items: center;
          gap: 10px;

          .label {
            font-size: 11px;
            color: $f1;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
