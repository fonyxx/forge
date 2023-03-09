<script lang="ts">
  import Grid from "./Grid.svelte";
  import {onDestroy, onMount} from "svelte";

  export let cornerRounding = 2;
  export let lineThickness = 1;
  export let spacing = 20;
  export let lineColor = "#111111";
  export let backgroundColor = "#ffffff";

  let width = 500, height = 500;
  let mouseX = 0, mouseY = 0, mouseDown = false, mouseDownButtonID = 0;
  let x = 0, y = 0, mouseXDrag = 0, mouseYDrag = 0, zoom = 4;

  let keyDown = false, keyName = "";

  let scrollListener: any;

  onMount(() => {
    window.addEventListener("wheel", scrollListener = (e) => {
      if (keyDown && keyName === "Control" || keyDown && keyName === "Alt") {
        zoom += -e.deltaY / (keyName == "Alt" ? 500 : 2000);

        if (zoom < 0.1) {
          zoom = 0.1;
        }

        zoom = Math.round(zoom * 100) / 100;
        zoom = Math.max(0.7, zoom);

        x = mouseX - (mouseX - x) / zoom;
        y = mouseY - (mouseY - y) / zoom;
      }
    });
  });

  onDestroy(() => {
    window.removeEventListener("wheel", scrollListener);
  });
</script>

<div autofocus tabindex="0" class="user-grid" bind:clientWidth={width} bind:clientHeight={height} on:keydown={(e) => {
    keyDown = true;
    keyName = e.key;
  }} on:keyup={() => {
    keyDown = false;
    keyName = "";
  }}>
  <div class="grid" on:mousemove={(e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (mouseDown && mouseDownButtonID === 1) {
        x += mouseX - mouseXDrag;
        y += mouseY - mouseYDrag;

        mouseXDrag = mouseX;
        mouseYDrag = mouseY;
    }
  }} on:mousedown={(e) => {
    mouseDown = true;

    mouseXDrag = mouseX;
    mouseYDrag = mouseY;

    // button ID
    // 0: left
    // 1: middle
    // 2: right
    mouseDownButtonID = e.button;
  }} on:mouseup={() => {
    mouseDown = false;

    mouseXDrag = 0;
    mouseYDrag = 0;
  }} on:mouseleave={() => {
    mouseDown = false;

    mouseXDrag = 0;
    mouseYDrag = 0;
  }}>
    <Grid
      spacing={spacing * zoom} lineThickness={lineThickness}
      width={width} height={height}
      cellRounding={cornerRounding * zoom}
      x={x % (spacing * zoom)} y={y % (spacing * zoom)}
      lineColor={lineColor} backgroundColor={backgroundColor}
    />
  </div>
</div>

<style lang="scss">
  @import "../../app/config.scss";

  .user-grid {
    width: 100%;
    height: 100%;
    position: relative;

    &:focus {
      outline: none;
    }

    .grid {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
