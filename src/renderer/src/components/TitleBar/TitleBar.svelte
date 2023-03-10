<script lang="ts">
  import Icon from "@iconify/svelte";
  export let title = "Windows";

  function handleWindowEvent(event: "close" | "trigger" | "minimize") {

  }
</script>

<div class="title-bar">
  <div class="header">
    <div class="info">
      <div class="icon">

      </div>

      <span class="title">{title}</span>
    </div>

    <div class="command">

    </div>

    <div class="control">
      <button on:click={handleWindowEvent("minimize")}>
        <Icon icon="fluent:subtract-16-regular" />
      </button>

      <button on:click={handleWindowEvent("trigger")}>
        <Icon icon="fluent:restore-16-regular" />
      </button>

      <button on:click={handleWindowEvent("close")}>
        <Icon icon="fluent:dismiss-16-regular" />
      </button>
    </div>
  </div>

  <div class="menu">

  </div>
</div>
