<script lang="ts">
  import IconLogo from "../../assets/icons.svg";
  import Icon from "@iconify/svelte";
  import TextField from "../TextField/TextField.svelte";
  import { searchEngineProcess } from "../TextField/TextField";
  import type { DropDown } from "../TextField/TextField";

  export let title = "Windows";
  let dropDown: DropDown[] = [];

  let queryNetwork: DropDown[] = [
    {
      label: "Reload window",
      value: "Soft restart the tool",
      icon: "[icon] fluent:arrow-clockwise-16-regular",
      iconColor: "warning",
      onClick: () => {
        window.location.reload();
      },
      keywords: ["soft reload", "reload", "restart", "refresh", "reset", "rerun"]
    },
    {
      label: "Halt the app forcefully",
      value: "Hard restart the tool",
      icon: "[icon] fluent:record-stop-16-regular",
      iconColor: "error",
      onClick: () => {
        window.close();
      },
      keywords: ["hard reload", "close", "halt", "kill", "terminate", "stop", "exit", "reset"]
    },
    {
      label: "About the program",
      value: "Information about the program",
      icon: "[icon] fluent:info-16-regular",
      onClick: () => {
        console.log("About the program");
        alert("Fonyx Forge - [2023+] - build 0.0.1");
      },
      keywords: ["about", "info", "information", "version", "build", "program", "app", "application"]
    }
  ];

  let query = "";
  const maxResults = 20;

  function handleWindowEvent(event: "close" | "trigger" | "minimize") {

  }

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

<div class="title-bar">
  <div class="header">
    <div class="info">
      <div class="icon">
        <img alt="" src={IconLogo} />
      </div>

      <span class="title">{title}</span>
    </div>

    <div class="command">
      <div class="input" bind:clientHeight={commandHeight} bind:clientWidth={commandWidth}>
        <TextField placeholder="Enter a command, file, setting, or macro" dropDown={dropDown} bind:data={query} />
      </div>
    </div>

    <div class="control">
      <button on:click={handleWindowEvent("minimize")}>
        <div class="spacer">
          <Icon icon="fluent:subtract-16-regular" />
        </div>

        <div class="icon">
          <Icon icon="fluent:subtract-16-regular" />
        </div>
      </button>

      <button on:click={handleWindowEvent("trigger")}>
        <div class="spacer">
          <Icon icon="fluent:maximize-16-regular" />
        </div>

        <div class="icon">
          <Icon icon="fluent:maximize-16-regular" />
        </div>
      </button>

      <button on:click={handleWindowEvent("close")}>
        <div class="spacer">
          <Icon icon="fluent:dismiss-16-regular" />
        </div>

        <div class="icon">
          <Icon icon="fluent:dismiss-16-regular" />
        </div>
      </button>
    </div>
  </div>

  <div class="menu">

  </div>
</div>

<style lang="scss">
  @import "../c.scss";

  .title-bar {
    width: 100vw;
    background: $l0;
    -webkit-app-region: drag;

    .menu {
      height: 30px;
      width: 100vw;
      display: flex;
    }

    .header {
      height: 50px;
      width: 100vw;
      display: flex;
      flex-direction: row;
      padding: 0 10px;
      align-items: center;
      justify-content: space-between;

      .info, .command, .control {
        height: 100%;
        display: flex;
        align-items: center;
      }

      .info {
        .icon {
          width: 30px;
          height: 30px;
          min-width: 30px;
          max-width: 30px;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-left: 10px;
          margin-right: 10px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .command {
        width: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 500px;
        margin: 0 50px;

        .input {
          -webkit-app-region: no-drag;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .control {
        display: flex;
        align-items: center;

        button {
          height: 100%;
          outline: none;
          -webkit-app-region: no-drag;
          border: none;
          margin: 0;
          color: $f0;
          background: transparent;
          font-size: 16px;
          cursor: pointer;
          transition: 200ms;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 1px;

          &:nth-child(1) {
            font-size: 17px;
          }

          &:after {
            content: "";
            display: flex;
            width: 100%;
            height: calc(100% - 15px);
            position: absolute;
            border-radius: 3px;
            transition: 200ms;
          }

          .spacer {
            transition: 100ms;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .icon {
            position: absolute;
            transition: 200ms;
            opacity: 0;
            color: $f1;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          &:hover {
            .icon {
              opacity: 1;
            }

            .spacer {
              opacity: 0;
            }

            &:after {
              background: $d0;
            }
          }
        }
      }
    }
  }
</style>