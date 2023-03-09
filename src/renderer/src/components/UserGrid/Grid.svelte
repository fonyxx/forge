<script lang="ts">
  import {onMount} from "svelte";

  export let width: number = 100;
  export let height: number = 100;

  export let lineThickness: number = 1;
  export let x: number = 0;
  export let y: number = 0;
  export let spacing: number = 20;
  export let lineColor: string = "#111";
  export let gridColor: string = "#000";
  export let cellRounding: number = 4;

  let cellsInRow = 1;
  let cellsInColumn = 1;

  $: {
    cellsInRow = Math.ceil(width / spacing);
    cellsInColumn = Math.ceil(height / spacing);
  };
</script>

<div
  class="grid"
  style={`
    width: ${width}px;
    height: ${height}px;
    background: ${lineColor};
    border-radius: ${cellRounding}px;
  `}
>
  <div
    class="roller"
    style={`
      width: ${width + lineThickness}px;
      height: ${height + lineThickness}px;
      left: ${x >= 0 ? x - spacing : x}px;
      top: ${y >= 0 ? y - spacing : y}px;
    `}
  >
    {#each Array(cellsInColumn + 1) as _, i}
      <div
        class="row"
        style={`
          height: ${spacing}px;
          gap: ${lineThickness}px;
        `}
      >
        {#each Array(cellsInRow + 1) as _, j}
          <div
            class="cell"
            style={`
              width: ${spacing - lineThickness}px;
              height: ${spacing - lineThickness}px;
              border-radius: ${cellRounding}px;
              background: ${gridColor};
              min-width: ${spacing - lineThickness}px;
              min-height: ${spacing - lineThickness}px;
            `}
          />
        {/each}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  @import "../../app/config.scss";

  .grid {
    display: flex;
    overflow: hidden;
    position: relative;

    .roller {
      position: absolute;

      .row {
        display: flex;
        align-items: center;

        .cell {
          background: blue;
        }
      }
    }
  }
</style>
