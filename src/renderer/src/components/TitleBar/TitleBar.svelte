<script lang="ts">
  import { searchEngineProcess } from "../TextField/TextField.js";
  import Info from "./Info.svelte";
  import TextField from "../TextField/TextField.svelte";
  import Controls from "./Controls/Controls.svelte";
  import type { DropDown } from "../TextField/TextField.ts";
  import type { TitleBarMenuItem } from "./TitleBar.ts";

  export let title = "Windows", mode: "ltr" | "rtl" = "ltr";
  let dropDown: DropDown[] = [];

  export let queryNetwork: DropDown[] = [];

  const titleBarMenu: TitleBarMenuItem[] = [
    {
      label: "ملف",
      children: []
    },
    {
      label: "يحرر",
      children: []
    },
    {
      label: "عرض",
      children: []
    },
    {
      label: "مساعدة",
      children: []
    }
  ];

  let query = "";
  const maxResults = 20;

  let writeToSearchDelay = { x: null as any };
  let writeTime = 500;

  $: {
    searchEngineProcess(query, queryNetwork, maxResults, (dd) => {
      dropDown = dd;
    }, writeToSearchDelay, writeTime)
  }

  let
    commandWidth = 0,
    commandHeight = 0;
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
        <div class="item">
          <span>{item.label}</span>
        </div>
      {/each}
    </div>

    <div class="right">
      <button on:click={() => {
        // run the command 'open https://discord.gg/Yyfng8ybFY'

      }}>
        Enter Discord
      </button>
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

      .left {
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
