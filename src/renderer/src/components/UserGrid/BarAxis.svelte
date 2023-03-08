<script lang="ts">
  export let axis: "x" | "y" = "y";
  export let width: number = 100;
  export let height: number = 100;

  export let lineThickness: number = 1;
  export let offset: number = 0;
  export let spacing: number = 20;
  export let color: string = "#111";
</script>

<div class="bar-axis"
  style={`
    min-width: ${width}px;
    min-height: ${height}px;
    max-width: ${width}px;
    max-height: ${height}px;
    <!--padding-left: ${axis == "y" ? offset - lineThickness : 0}px;-->
    <!--padding-top: ${axis == "x" ? offset - lineThickness : 0}px;-->
  `}
>
  <div
    class="list"
    style={`
      min-width: ${axis == "y" ? width + lineThickness : lineThickness}px;
      min-height: ${axis == "x" ? height + lineThickness : lineThickness}px;
      max-width: ${axis == "y" ? width + lineThickness : lineThickness}px;
      max-height: ${axis == "x" ? height + lineThickness : lineThickness}px;
      flex-direction: ${axis == "x" ? "column" : "row"};
      margin-left: ${axis == "y" ? offset - lineThickness : 0}px;
      margin-top: ${axis == "x" ? offset - lineThickness : 0}px;
      gap: ${axis == "x" ? spacing : 0}px ${axis == "y" ? spacing : 0}px;
    `}
  >
    {#each Array.from({length: Math.floor(width / spacing) + 1}, (v, i) => i) as i}
      <div
        class="line" style={`
        background-color: ${color};
        min-width: ${axis == "x" ? width : lineThickness}px;
        min-height: ${axis == "y" ? height : lineThickness}px;
        max-width: ${axis == "x" ? width : lineThickness}px;
        max-height: ${axis == "y" ? height : lineThickness}px;
      `}
      ></div>
    {/each}
  </div>
</div>

<style lang="scss">
  .bar-axis {
    display: flex;
    overflow: hidden;

    .list {
      display: flex;

      .line {
        display: flex;
      }
    }
  }
</style>
