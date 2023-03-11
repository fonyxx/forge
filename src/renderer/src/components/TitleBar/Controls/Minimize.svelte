<script lang="ts">
  import Icon from "@iconify/svelte";

  function handleWindowEvent() {
    window.electron.ipcRenderer.send("set window.minimized");
  }
</script>

<button on:click={handleWindowEvent}>
  <div class="spacer">
    <Icon icon="fluent:subtract-16-regular" />
  </div>

  <div class="icon">
    <Icon icon="fluent:subtract-16-regular" />
  </div>
</button>

<style lang="scss">
  @import "./button.scss";
</style>
