<script lang="ts">
  import UserGrid from "../components/UserGrid/UserGrid.svelte";
</script>

<div class="true">
  <UserGrid
  />
</div>

<style lang="scss">
  @import "./config.scss";

  .true {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
  }
</style>
