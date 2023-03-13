<script lang="ts">
  import type {ModalBodySlack} from "../TitleBar.ts";
  import Icon from "@iconify/svelte";
  import Pan from "./Pan.svelte";
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let
    title = "Modal Untitled", body: ModalBodySlack[] = [], footer: ModalBodySlack[] = [],
    show = false, mouseOnModal = false, closable = true;

  let footerUser: ModalBodySlack[] = [], bodyUser: ModalBodySlack[] = [];
  let forceInnerHide = true;

  let showU = false;

  $: {
    if (JSON.stringify(body) !== JSON.stringify(bodyUser)) {
      forceInnerHide = true;
      setTimeout(() => {
        bodyUser = body;
        forceInnerHide = false;
      }, 200);
    }

    if (JSON.stringify(footer) !== JSON.stringify(footerUser)) {
      forceInnerHide = true;
      setTimeout(() => {
        footerUser = footer;
        forceInnerHide = false;
      }, 200);
    }

    if (show == true && showU == false) {
      forceInnerHide = true;
      footerUser = footer;
      bodyUser = body;
      forceInnerHide = false;
      showU = show;
    } else {
      showU = show;
    }
  }
</script>

<div
  class={"modal" + (showU ? "" : " hide")}
>
  <div
    class={"modal-frame" + (forceInnerHide ? " hide" : "")}
    on:mouseenter={() => { mouseOnModal = true; }}
    on:mouseleave={() => { mouseOnModal = false; }}
  >
    <div class="header">
      <span>{title}</span>

      {#if closable}
        <button
          on:click={() => {
            showU = false;
            dispatch("miscCloseFire");

            setTimeout(() => {
              footerUser = [];
              bodyUser = [];
            }, 200);
          }}
        >
          <Icon icon="fluent:dismiss-16-regular" />
        </button>
      {/if}
    </div>

    <div class="body">
      <Pan pan={bodyUser} />
    </div>

    {#if footerUser.length > 0}
      <div class="footer">
        <Pan pan={footerUser} />
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../../c";

  .modal {
    width: 100vw;
    height: calc(100vh - 50px - 40px);
    display: flex;
    position: fixed;
    top: calc(50px + 40px);
    left: 0;
    transition: opacity 200ms;
    align-items: center;
    justify-content: center;

    .modal-frame {
      min-width: 400px;
      min-height: 200px;
      background: $l1;
      border-radius: 6px;
      border: 1px solid $bdr;
      box-shadow: $bxshd;
      overflow: hidden;
      transition: transform 200ms, opacity 200ms;
      max-width: 800px;

      &.hide {
        opacity: 0;
        pointer-events: none;
        transform: scale(0.9);
      }

      .header {
        background: $l0;
        padding: 0 10px;
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        & > span {
          padding: 0 10px;
          color: $f1;
          user-select: none;
        }

        button {
          background: transparent;
          border: none;
          transition: 200ms;
          outline: none;
          padding: 0 10px;
          margin: 0;
          color: $f0;
          font-size: 16px;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: calc(100% - 10px);

          &:hover {
            background: $d0;
            color: $f1;
            cursor: pointer;
          }
        }
      }

      .body {
        padding: 10px;
      }
    }

    &.hide {
      opacity: 0;
      pointer-events: none;

      .modal-frame {
        transform: scale(0.9);
      }
    }
  }
</style>
