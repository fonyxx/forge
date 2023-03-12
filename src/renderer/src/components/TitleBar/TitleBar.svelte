<script lang="ts">
  import { searchEngineProcess } from "../TextField/TextField.js";
  import Info from "./Info.svelte";
  import TextField from "../TextField/TextField.svelte";
  import Controls from "./Controls/Controls.svelte";
  import {openMenu} from "./SafePi.ts";
  import type { DropDown } from "../TextField/TextField.ts";
  import type { TitleBarMenuItem } from "./TitleBar.ts";
  import {onDestroy, onMount} from "svelte";

  export let title = "Windows", mode: "ltr" | "rtl" = "ltr";
  let dropDown: DropDown[] = [];

  export let queryNetwork: DropDown[] = [];

  const titleBarMenu: TitleBarMenuItem[] = [
    {
      label: "File",
      type: "group",
      children: [
        {
          label: "New Project",
          type: "group",
          icon: "fluent:document-16-regular",
          children: [
            {
              label: "Open Existing Project from Version Control",
              icon: "fluent:server-20-regular",
              type: "item"
            },
            {
              label: "Create New Project",
              icon: "fluent:pen-16-regular",
              type: "item"
            },
          ]
        }
      ]
    },
    {
      label: "Edit",
      type: "group",
      children: [
        {
          label: "Undo",
          icon: "fluent:arrow-undo-16-regular",
          shortcut: "Ctrl+Z"
        },
        {
          label: "Redo",
          icon: "fluent:arrow-redo-16-regular",
          shortcut: "Ctrl+Y"
        },
        {
          type: "separator"
        },
        {
          label: "Cut",
          icon: "fluent:cut-20-regular",
          shortcut: "Ctrl+X"
        },
        {
          label: "Copy",
          icon: "fluent:copy-16-regular",
          shortcut: "Ctrl+C"
        },
        {
          label: "Paste",
          icon: "fluent:clipboard-paste-16-regular",
          shortcut: "Ctrl+V"
        },
        {
          type: "separator"
        },
        {
          label: "Select All",
          icon: "fluent:code-text-16-regular",
          shortcut: "Ctrl+A"
        },
        {
          label: "Find",
          icon: "fluent:search-16-regular",
          shortcut: "Ctrl+F"
        },
        {
          label: "Replace",
          icon: "fluent:arrow-swap-20-regular",
          shortcut: "Ctrl+H"
        },
      ]
    },
    {
      label: "View",
      type: "group",
      children: []
    },
    {
      label: "Help",
      type: "group",
      children: []
    }
  ];

  let query = "";
  const maxResults = 20;

  let writeToSearchDelay = { x: null as any };
  let writeTime = 500;
  let currentActiveMenu = "";

  $: {
    searchEngineProcess(query, queryNetwork, maxResults, (dd) => {
      dropDown = dd;
    }, writeToSearchDelay, writeTime)
  }

  let
    commandWidth = 0,
    commandHeight = 0;

  let menuActive = false;
  let openTimeout: any;

  function contextDisable() {
    currentActiveMenu = "";
    console.log("IPC Supporter: Context menu halted process");
    clearTimeout(openTimeout);
    menuActive = false;
  }

  onMount(() => {
    window.windowEvents.on("context-close", contextDisable);
  });

  onDestroy(() => {
    window.windowEvents.off("context-close", contextDisable);
    clearTimeout(openTimeout);
  });
</script>

<div class={"title-bar" + (mode == "rtl" ? " rtl" : "")}>
  <div class="header">
    {#if mode == "ltr"}
      <Info query={query} title={title} dropDown={dropDown} />
    {:else}
      <Controls />
    {/if}

    <div class="command">
      <div class="input" bind:clientHeight={commandHeight} bind:clientWidth={commandWidth}>
        <TextField rtl={mode === "rtl"} loadable={true} placeholder="أدخل أمرًا أو ملفًا أو ماكرو أو تكوينًا" dropDown={dropDown} bind:data={query} />
      </div>
    </div>

    {#if mode == "ltr"}
      <Controls rtl={true} />
    {:else}
      <Info rtl={true} query={query} title={title} dropDown={dropDown} />
    {/if}
  </div>

  <hr />

  <div class="menu" style={`direction: ${mode}`}>
    <div class="left">
      {#each titleBarMenu as item}
        <div class={"item" + (item.label == currentActiveMenu ? " specific" : "")} on:click={(e) => {
          if (!menuActive) {
            currentActiveMenu = item.label;
            menuActive = true;
            const rect = e.target.getBoundingClientRect();
            openMenu(item.children, 50 + 40, mode === "rtl" ? rect.right : rect.left);
          }
        }} on:mouseenter={(e) => {
          if (menuActive) {
            currentActiveMenu = item.label;
            clearTimeout(openTimeout);
            openTimeout = setTimeout(() => {
              const rect = e.target.getBoundingClientRect();
              if (menuActive) openMenu(item.children, 50 + 40, mode === "rtl" ? rect.right : rect.left);
            }, 10);
          }
        }}>
          <span>{item.label}</span>
        </div>
      {/each}
    </div>

    <div class="right">
      <div class="item" on:click={() => {
        console.log("IPX Supporter: Retransporting end user");
        window.electron.ipcRenderer.send("run blind-shell", "start https://discord.gg/Yyfng8ybFY");

        setTimeout(() => {
          console.log("IPX Supporter: Within the moment, the browser should have opened")
        }, 500);
      }}>
        <span>[⚡] Community</span>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "../c.scss";

  .title-bar {
    width: 100vw;
    background: $l0;
    -webkit-app-region: drag;

    hr {
      width: 100vw;
      height: 1px;
      background: $bdr;
      border: none;
      margin: 0;
    }

    .menu {
      height: 40px;
      width: 100vw;
      display: flex;
      flex-direction: row;
      padding: 0 10px;
      align-items: center;
      justify-content: space-between;

      .left, .right {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 100%;

        .item {
          padding: 0 10px;
          display: flex;
          align-items: center;
          transition: 200ms;
          cursor: pointer;
          -webkit-app-region: no-drag;
          height: calc(100% - 10px);
          border-radius: 3px;

          &.specific {
            background: $d1 !important;
            color: $f1;
          }

          &:hover {
            background: $d0;
          }
        }
      }
    }

    .header {
      height: 50px;
      width: 100vw;
      display: flex;
      flex-direction: row;
      padding: 0 10px;
      align-items: center;
      justify-content: space-between;

      .command {
        height: 100%;
        display: flex;
        align-items: center;
      }

      .command {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 500px;
        margin: 0 50px;
        height: calc(100% - 10px);

        .input {
          -webkit-app-region: no-drag;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
</style>
