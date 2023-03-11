<script lang="ts">
  import Icon from "@iconify/svelte";

  function handleWindowEvent() {
    window.close();
  }
</script>

<button on:click={handleWindowEvent}>
  <div class="spacer">
    <Icon icon="fluent:dismiss-16-regular" />
  </div>

  <div class="icon">
    <Icon icon="fluent:dismiss-16-regular" />
  </div>
</button>

<style lang="scss">
  @import "./button.scss";
</style>
