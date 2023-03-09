<script lang="ts">
  import UserGrid from "../components/UserGrid/UserGrid.svelte";

  let editorAvailable = true;
  let contentSceneAvailable = true;

  let mouseX = 0, mouseY = 0, mouseOn = false;

  function setSceneMode(mode: boolean = !contentSceneAvailable) {
    if (contentSceneAvailable) {
      editorAvailable = false;
      setTimeout(() => {
        contentSceneAvailable = mode;
      }, 400);
    } else {
      contentSceneAvailable = mode;
      setTimeout(() => {
        editorAvailable = true;
      }, 400);
    }
  }
</script>

<div class="true">
  <div class="top">

  </div>

  <div class={"body" + (!contentSceneAvailable ? " disable-scene" : "")}>
    <div class="side-bar">
      <div class="inner">
        <button on:click={() => setSceneMode(false)}>Toggle Scene</button>
      </div>
    </div>

    <div class="editor-area">
      <div class="tabs">

      </div>

      <div
        class={"view" + (!editorAvailable ? " disable-editor" : "")}
        on:mouseenter={() => mouseOn = true} on:mouseleave={() => mouseOn = false}
        on:mousemove={(e) => { mouseX = e.clientX; mouseY = e.clientY; }}
      >
        <UserGrid />
      </div>
    </div>
  </div>

  <div class={"document" + (contentSceneAvailable ? " disable-document" : "")}>
    Document
  </div>

  <div class="gutter">
    <div class="inner">
      <section class="left">
        <div class={"nugget" + (!mouseOn ? " hide-prop" : "")}>
          ({mouseX}, {mouseY})
        </div>
      </section>
    </div>
  </div>
</div>

<style lang="scss">
  @import "./config.scss";

  .true {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;

    .top {
      display: flex;
      height: calc(50px + 30px);
      background: $l0;
      min-height: calc(50px + 30px);
      width: 100vw;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
    }

    .document {
      position: fixed;
      top: calc(50px + 30px);
      left: 0;
      width: 100vw;
      height: calc(100vh - (50px + 30px) - 40px);
      background: $l0;
      transition: opacity 200ms, top 200ms, transform 200ms, filter 200ms;

      &.disable-document {
        pointer-events: none;
        opacity: 0;
        top: calc(50px + 30px + 100px);
        transform: scale(0.9);
        filter: blur(100px) brightness(5);
      }
    }

    .body {
      height: calc(100vh - (50px + 30px) - 40px);
      width: 100vw;
      display: flex;
      flex-direction: row;
      transition: opacity 200ms, top 200ms, transform 200ms, filter 200ms;
      position: fixed;
      top: calc(50px + 30px);
      left: 0;

      &.disable-scene {
        pointer-events: none;
        opacity: 0;
        top: -100px;
        transform: scale(0.9);
        filter: blur(100px) brightness(5);
      }

      .side-bar {
        width: 320px;
        height: 100%;
        background: $l0;
        min-width: 320px;
        transition: 100ms;
        display: flex;
        align-items: center;
        justify-content: center;

        .inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: calc(100% - 10px);
          height: calc(100% - 10px);
          background: $l1;
          border-radius: 4px;
        }
      }

      .editor-area {
        display: flex;
        flex-direction: column;
        width: calc(100vw - 320px - 10px);
        height: 100%;
        overflow: hidden;
        transition: 100ms;
        border-radius: 4px;

        .tabs {
          height: 30px;
          display: flex;
          flex-direction: row;
          background: $l0;
          min-height: 30px;
          width: 100%;
        }

        .view {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: calc(100vh - (50px + 30px) - 40px - 30px - (10px / 2));
          transition: opacity 200ms, transform 200ms, border-width 200ms, border-radius 200ms;
          border: 0px solid $ct0;
          border-radius: 4px;
          overflow: hidden;

          &.disable-editor {
            pointer-events: none;
            opacity: 0;
            transform: scale(0.9);
            border-width: 25vw;
            border-radius: 100%;
            transition: opacity 200ms, transform 200ms, border-width 200ms, border-radius 4000ms;
          }
        }
      }
    }

    .gutter {
      height: 40px;
      width: 100vw;
      background: $l0;
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      .inner {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        background: $l1;
        border-radius: 4px;

        .nugget {
          display: flex;
          align-items: center;
          justify-content: center;
          height: calc(40px - 10px - 10px);
          padding: 0 5px;
          text-align: center;
          border-radius: 2px;
          position: relative;

          &:nth-child(1) {
            margin-left: 5px;
          }

          &:after {
            display: flex;
            content: "";
            position: absolute;
            right: -5px;
            width: 1px;
            height: calc(40px - 10px - 10px - 5px);
            background: $d0;
          }
        }
      }
    }
  }
</style>
