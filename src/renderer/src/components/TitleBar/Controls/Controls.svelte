<script lang="ts">
  import Icon from "@iconify/svelte";
  import Close from "./Close.svelte";
  import Minimize from "./Minimize.svelte";
  import {onDestroy, onMount} from "svelte";

  export let rtl = false;
  let isMaximized = false;

  function handleWindowEvent() {
    if (!isMaximized)
      window.electron.ipcRenderer.send("set window.maximized");
    else
      window.electron.ipcRenderer.send("set window.un-maximized");

    isMaximized = !isMaximized;
  }

  function applyState() {
    window.electron.ipcRenderer.invoke("get window.is-maximized").then((value) => {
      isMaximized = value;
    });
  }

  onMount(() => {
    applyState();
    window.electron.ipcRenderer.on("listen window.state-change", applyState);
  });

  onDestroy(() => {
    window.electron.ipcRenderer.removeListener("listen window.state-change", applyState);
  });
</script>

<div class="controls">
  {#if rtl}
    <Minimize />
  {:else}
    <Close />
  {/if}

  <button on:click={handleWindowEvent}>
    {#if !isMaximized}
      <div class="spacer">
        <Icon icon="fluent:maximize-16-regular" />
      </div>

      <div class="icon">
        <Icon icon="fluent:maximize-16-regular" />
      </div>
    {:else}
      <div class="spacer">
        <Icon icon="fluent:restore-16-regular" />
      </div>

      <div class="icon">
        <Icon icon="fluent:restore-16-regular" />
      </div>
    {/if}
  </button>

  {#if rtl}
    <Close />
  {:else}
    <Minimize />
  {/if}
</div>

<style lang="scss">
  @import "../../c";
  @import "./button.scss";

  .controls {
    display: flex;
    align-items: center;
    height: 100%;
  }
</style>
