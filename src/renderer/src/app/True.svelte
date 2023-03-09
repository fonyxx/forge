<script lang="ts">
  import UserGrid from "../components/UserGrid/UserGrid.svelte";

  let editorAvailable = true;
  let contentSceneAvailable = true;

  let mouseX = 0, mouseY = 0, mouseOn = false;

  const menuItems: {
    label: string;
    fn: () => void;
  }[] = [
    {
      label: "New",
      fn: () => {
        console.log("New");
      }
    },
    {
      label: "Open",
      fn: () => {
        console.log("Open");
      }
    },
    {
      label: "Save",
      fn: () => {
        console.log("Save");
      }
    },
    {
      label: "Save As",
      fn: () => {
        console.log("Save As");
      }
    },
    {
      label: "Exit",
      fn: () => {
        window.close();
      }
    }
  ]

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
    <div class="inner">
      <div class="left">
        <div class="icon">
          A
        </div>

        <span>Forge Studio</span>
      </div>
    </div>

    <div class="menu">
      <div class="left">
        {#each menuItems as item}
          <button on:click={item.fn}>{item.label}</button>
        {/each}
      </div>

      <div class="right">
        <button on:click={() => location.reload()}>R</button>
      </div>
    </div>
  </div>

  <div class={"body" + (!contentSceneAvailable ? " disable-scene" : "")}>
    <div class="side-bar">
      <div class="inner">
        <button on:click={() => setSceneMode(false)}>Toggle Scene</button>
      </div>
    </div>

    <div class="editor-area">
      <div class="tabs">
        <div class="inner">
          Hello
        </div>
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

        <div class={"nugget"}>
          {contentSceneAvailable ? "Editor" : "Settings"}
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
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 5px;
      -webkit-app-region: drag;

      .inner {
        width: calc(100vw - 10px);
        min-height: calc(50px - 10px);
        background: $l1;
        border-radius: 4px 4px 0 0;
        padding: 0 5px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 2.5px;

        .left {
          display: flex;
          align-items: center;
          gap: 10px;

          .icon {
            width: 30px;
            height: 30px;
            border-radius: 4px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            color: $ct1;
            font-size: 30px;
          }
        }
      }

      .menu {
        width: calc(100vw - 10px);
        height: calc(35px);
        background: $l1;
        border-radius: 0 0 4px 4px;
        margin-top: -5px;
        display: flex;
        align-items: center;
        padding: 0 5px;
        justify-content: space-between;

        button {
          -webkit-app-region: no-drag;
          background: transparent;
          padding: 0 5px;
          border: none;
          color: $f0;
          font-size: 11px;
          cursor: pointer;
          transition: 100ms;
          border-radius: 2px;
          height: calc(35px - 10px);

          &:hover {
            color: $f1;
            background: $d0;
          }
        }

        .right button {
          min-width: calc(35px - 10px);
          margin-left: 5px;
        }

        .left button {
          margin-right: 5px;
        }
      }
    }

    .document {
      position: fixed;
      top: calc(50px + 30px);
      left: 0;
      width: 100vw;
      height: calc(100vh - (50px + 30px) - 40px);
      background: $l0;
      transition: opacity 200ms, top 200ms, transform 200ms, filter 200ms;
      padding: 5px;

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
        width: calc(100vw - 320px);
        height: 100%;
        overflow: hidden;
        transition: 100ms;
        border-radius: 4px;

        .tabs {
          height: 45px;
          min-height: 45px;
          display: flex;
          flex-direction: row;
          background: $l0;
          width: calc(100vw - 320px + 5px);
          margin-left: -5px;
          align-items: center;
          justify-content: center;

          .inner {
            width: calc(100% - 10px);
            height: calc(100% - 10px);
            min-height: calc(100% - 10px);
            border-radius: 4px;
            background: $l1;
            display: flex;
            align-items: center;
            padding: 0 5px;
          }
        }

        .view {
          display: flex;
          align-items: center;
          justify-content: center;
          width: calc(100vw - 320px - 5px);
          height: calc(100vh - (50px + 30px) - 40px - 30px - 10px - 10px);
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
        height: calc(100% - 5px);
        margin-bottom: 5px;
        background: $l1;
        border-radius: 4px;
        padding: 0 5px;
        overflow: hidden;

        .left {
          width: calc(50vw - 10px);
          display: flex;
          align-items: center;
        }

        .nugget {
          display: flex;
          align-items: center;
          justify-content: center;
          height: calc(40px - 10px - 10px);
          padding: 0 5px;
          text-align: center;
          border-radius: 2px;
          position: relative;
          transition: transform 100ms;
          white-space: nowrap;
          margin-right: 10px;

          &.hide-prop {
            opacity: 0;
            width: 0px;
            padding: 0;
            margin-right: 0;
            transform: scale(0.8);

            &:after {
              right: 0;
              opacity: 0;
            }
          }

          &:after {
            display: flex;
            content: "";
            position: absolute;
            right: -5px;
            width: 1px;
            height: calc(40px - 10px - 10px - 5px);
            background: $d0;
            transition: 100ms;
          }

          &:nth-last-child(1) {
            &:after {
              opacity: 0;
            }
          }
        }
      }
    }
  }
</style>
