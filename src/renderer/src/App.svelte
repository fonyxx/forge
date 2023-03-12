<script lang="ts">
  import TitleBar from "./components/TitleBar/TitleBar.svelte";
  import {onDestroy, onMount} from "svelte";
  import type { DropDown } from "./components/TextField/TextField.ts";
  import Menu from "./components/TitleBar/Menu.svelte";
  import type {TitleBarMenuItem} from "./components/TitleBar/TitleBar.ts";

  let contextMenuX = 0, contextMenuY = 0;
  let mouseX = 0, mouseY = 0, contextMenuSource: TitleBarMenuItem[] = [];
  let contextMenuMouseOver = false, menuOpen = false;

  function contextMenuShowHandler(data: TitleBarMenuItem[]) {
    contextMenuX = mouseX;
    contextMenuY = mouseY;

    contextMenuSource = data;
    menuOpen = true;
  }

  const dropDown: DropDown[] = [
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
      // icon: "[icon] fluent:info-16-regular",
      onClick: () => {
        console.log("About the program");
        alert("Fonyx Forge - [2023+] - build 0.0.1");
      },
      keywords: ["about", "info", "information", "version", "build", "program", "app", "application"]
    },
    {
      label: "Enable OLED mode",
      value: "Update the style setup to optimise for OLED screens",
      icon: "[icon] fluent:brightness-high-16-regular",
      onClick: () => {
        console.log("Enable OLED mode");
        localStorage.setItem("oledMode", "true");

        oledMode = true;
        handleOledProcess();
      },
      keywords: ["oled", "oled dark", "screen", "display"]
    },
    {
      label: "Enable LCD mode",
      value: "Update the style setup to optimise for LCD screens",
      icon: "[icon] fluent:brightness-low-16-regular",
      onClick: () => {
        console.log("Disable OLED mode");
        localStorage.setItem("oledMode", "false");

        oledMode = false;
        handleOledProcess();
      },
      keywords: ["lcd", "lcd dark", "screen", "display"]
    },
    {
      label: "Right to Left Layout",
      value: "Elements, characters, and the UX will be optimised for Arabic, Hebrew andPersian",
      icon: "[icon] fluent:align-right-16-regular",
      onClick: () => {
        localStorage.setItem("layoutMode", "rtl");
        layoutMode = "rtl";
      },
      keywords: ["rtl", "right to left", "arabic", "hebrew", "persian", "language", "layout"]
    },
    {
      label: "Left to Right Layout",
      value: "Elements, characters, and the UX will be optimised for English, German, and Russian",
      icon: "[icon] fluent:align-left-16-regular",
      onClick: () => {
        localStorage.setItem("layoutMode", "ltr");
        layoutMode = "ltr";
      },
      keywords: ["ltr", "left to right", "english", "german", "russian", "language", "layout"]
    },
  ];

  let oledMode = false;
  let layoutMode = "rtl";

  function handleOledProcess() {
    if (oledMode) {
      document.documentElement.style.setProperty("--l1", "#101010");
      document.documentElement.style.setProperty("--d0", "rgba(255, 255, 255, 8%)");
      document.documentElement.style.setProperty("--d1", "rgba(255, 255, 255, 13%)");
    } else {
      document.documentElement.style.setProperty("--l1", "#090909");
      document.documentElement.style.setProperty("--d0", "rgba(255, 255, 255, 5%)");
      document.documentElement.style.setProperty("--d1", "rgba(255, 255, 255, 10%)");
    }
  }

  onMount(() => {
    window.comu.on("show", contextMenuShowHandler);
    const oledModeRaw = localStorage.getItem("oledMode");
    const layoutModeRaw = localStorage.getItem("layoutMode");

    if (oledModeRaw)
      oledMode = oledModeRaw === "true";
    else {
      oledMode = false;
      localStorage.setItem("oledMode", "false");
    }

    if (layoutModeRaw == "ltr") {
      layoutMode = "ltr";
    } else {
      layoutMode = "rtl";
      localStorage.setItem("layoutMode", "rtl");
    }

    handleOledProcess();
  });

  onDestroy(() => {
    window.comu.off("show", contextMenuShowHandler);
  });
</script>

<div class="app" on:mousemove={e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}} on:mousedown={() => {
  if (!contextMenuMouseOver) menuOpen = false;
}}>
  <TitleBar queryNetwork={dropDown} mode={layoutMode} title="تشكيل" />
  <Menu
    items={contextMenuSource} mode="manual"
    mouseX={contextMenuX} mouseY={contextMenuY}
    position={layoutMode === "ltr" ? "right" : "left"} rtl={layoutMode === "rtl"}
    bind:open={menuOpen} bind:mouseOver={contextMenuMouseOver}
  />
</div>

<style lang="scss">
  @import "./components/c.scss";

  .app {
    background: $l1;
    height: 100vh;
    width: 100vw;
  }
</style>
