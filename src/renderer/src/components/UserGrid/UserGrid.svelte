<script lang="ts">
  import BarAxis from "./BarAxis.svelte";

  let width, height, offset, lineThickness, spacing;
</script>

<div class="user-grid" bind:clientWidth={width} bind:clientHeight={height}>
  <div class="y-layer">
    <BarAxis width={width} height={height} offset={0} lineThickness={1} axis="y" spacing={40} />
  </div>

  <div class="x-layer">
    <BarAxis width={width} height={height} offset={0} lineThickness={1} axis="x" spacing={40} />
  </div>
</div>

<style lang="scss">
  @import "../../app/config.scss";

  .user-grid {
    width: 100%;
    height: 100%;
    position: relative;

    .x-layer, .y-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
