<script lang="ts">
  import BarAxis from "./BarAxis.svelte";
  import Grid from "./Grid.svelte";
  import {onDestroy, onMount} from "svelte";

  let width = 500, height = 500, lineThickness, spacing;
  let mouseX = 0, mouseY = 0, mouseDown = false;
  let x = 0, y = 0, mouseXDrag = 0, mouseYDrag = 0, zoom = 1;

  let keyDown = false, keyName = "";

  let scrollListener: any;

  onMount(() => {
    window.addEventListener("wheel", scrollListener = (e) => {
      if (keyDown && keyName === "Control") {
        zoom += e.deltaY / 1000;

        if (zoom < 0.1) {
          zoom = 0.1;
        }
      }
    });
  });

  onDestroy(() => {
    window.removeEventListener("wheel", scrollListener);
  });
</script>

<div tabindex="0" class="user-grid" bind:clientWidth={width} bind:clientHeight={height} on:keydown={(e) => {
    keyDown = true;
    keyName = e.key;
  }} on:keyup={() => {
    keyDown = false;
    keyName = "";
  }}>
  <div class="grid" on:mousemove={(e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (mouseDown) {
      x += mouseX - mouseXDrag;
      y += mouseY - mouseYDrag;

      mouseXDrag = mouseX;
      mouseYDrag = mouseY;
    }
  }} on:mousedown={() => {
    mouseDown = true;

    mouseXDrag = mouseX;
    mouseYDrag = mouseY;
  }} on:mouseup={() => {
    mouseDown = false;

    mouseXDrag = 0;
    mouseYDrag = 0;
  }} on:mouseleave={() => {
    mouseDown = false;

    mouseXDrag = 0;
    mouseYDrag = 0;
  }}>
    <Grid spacing={50 * zoom} lineThickness={1 * zoom} width={width} height={height} cellRounding={0 * zoom} x={x % (50 * zoom)} y={y % (50 * zoom)} />
    <p>{x}, {y}, {mouseX}, {mouseY}, {mouseDown} K: {keyDown} KK: {keyName}</p>
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

    p {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
