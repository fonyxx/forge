<script lang="ts">
  import TitleBar from "./components/TitleBar/TitleBar.svelte";
  import {onDestroy, onMount} from "svelte";
  import type { DropDown } from "./components/TextField/TextField.ts";
  import Menu from "./components/TitleBar/Menu.svelte";
  import type {ModalBodySlack, TitleBarMenuItem} from "./components/TitleBar/TitleBar.ts";
  import Modal from "./components/TitleBar/Modal/Modal.svelte";
  import { callModal } from "./components/TitleBar/SafeMx.ts"

  let contextMenuX = 0, contextMenuY = 0;
  let mouseX = 0, mouseY = 0, contextMenuSource: TitleBarMenuItem[] = [];
  let contextMenuMouseOver = false, menuOpen = false;
  let modalClosable = false;

  function contextMenuShowHandler(data: TitleBarMenuItem[], y: number, x: number) {
    contextMenuX = x ? x : mouseX;
    contextMenuY = y ? y : mouseY;

    contextMenuSource = data;
    menuOpen = true;
  }

  let
    showModal = false, mouseOnModal = false, modalTitle = "Err",
    modalBody: ModalBodySlack[] = [], modalFooter: ModalBodySlack[] = [];

  function modalHandler(title: string, modalClosableX = true, data: ModalBodySlack[], footer: ModalBodySlack[] = []) {
    modalBody = data;
    modalFooter = footer;
    modalTitle = title;
    modalClosable = modalClosableX;

    showModal = true;
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
      icon: "[icon] fluent:info-16-regular",
      onClick: () => {
        callModal("About Fonyx Forge", true, [
          {
            type: "text",
            value: "About Forge",
            mode: "header"
          },
          {
            type: "text",
            value: "Forge is an integrated development environment for developing hardware, software, and firmware.",
            mode: "paragraph"
          },
          {
            type: "text",
            value: "Build",
            mode: "header"
          },
          {
            type: "text",
            value: "Version 0.0.1, Build: infinity",
            mode: "paragraph"
          }
        ])
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

        callModal("OLED Optimisation Enabled", true, [
          {
            type: "text",
            mode: "paragraph",
            value: "The app is now optimised for OLED screens."
          }
        ]);
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

        callModal("LCD Optimisation Enabled", true, [
          {
            type: "text",
            mode: "paragraph",
            value: "The app is now optimised for LCD screens."
          }
        ]);
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

        callModal("Right to Left Layout Enabled", true, [
          {
            type: "text",
            mode: "paragraph",
            value: "The app is now optimised for Arabic, Hebrew and Persian."
          }
        ]);
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

        callModal("Left to Right Layout Enabled", true, [
          {
            type: "text",
            mode: "paragraph",
            value: "The app is now optimised for English, German, and Russian."
          }
        ]);
      },
      keywords: ["ltr", "left to right", "english", "german", "russian", "language", "layout"]
    },
  ];

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
        },
        {
          label: "Open Project",
          icon: "fluent:folder-open-16-regular",
          type: "item",
          onClick: () => {
            callModal("Select Folder to Open", true, [
              {
                type: "form",
                fields: [
                  {
                    label: "Folder Path",
                    placeholder: "C:/ForgeProjects/Default",
                    mode: "text",
                    name: "path"
                  },
                  {
                    label: "Startup Commands",
                    placeholder: "suppress autorun;",
                    mode: "text",
                    name: "command"
                  }
                ]
              },
              {
                type: "buttons",
                buttons: [
                  {
                    label: "Select Folder",
                    type: "secondary"
                  }
                ]
              }
            ]);
          }
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

  let oledMode = false;
  let layoutMode = "rtl";

  function handleOledProcess() {
    if (oledMode) {
      document.documentElement.style.setProperty("--l1", "#191919");
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
    window.windowEvents.on("modal", modalHandler);

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
    window.windowEvents.off("modal", modalHandler);
  });

  const modalTestBody: ModalBodySlack[] = [
    {
      type: "text",
      mode: "header",
      value: "That Fire Channel"
    },
    {
      type: "text",
      value: "Hey guys welcome to my epic channel or something i dont even know",
      mode: "paragraph"
    },
    {
      type: "text",
      value: "https://cdn.discordapp.com/attachments/1075252791032950784/1084670657037598781/Frame_1_9.png",
      mode: "image"
    }
  ];

  const footerTest: ModalBodySlack[] = [
    {
      type: "buttons",
      buttons: [
        {
          label: "Subscribe",
          onClick: () => {
            window.windowEvents.emit("modal", "Thanks for Subscribing", true, [
              {
                type: "text",
                value: "Thanks for subscribing to my channel, i really appreciate it",
                mode: "paragraph"
              },
              {
                type: "hr"
              }
            ]);
          },
          mode: "primary"
        },
      ]
    }
  ]
</script>

<div class="app" on:mousemove={e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}} on:mousedown={() => {
  if (!contextMenuMouseOver) {
    menuOpen = false;
    window.windowEvents.emit("context-close");
  }

  if (!mouseOnModal && modalClosable && showModal) {
    showModal = false;
    window.windowEvents.emit("modal-close");
  }
}}>
  <TitleBar queryNetwork={dropDown} mode={layoutMode} title="تشكيل" titleBarMenu={titleBarMenu} />

  <div class="body">
    <button on:click={() => {
      window.windowEvents.emit("modal", "Textual Modal", true, modalTestBody, footerTest);
    }}>Show Modal</button>

    <button on:click={() => {
      window.windowEvents.emit("modal", "Thanks for Subscribing", true, [
        {
          type: "text",
          value: "Thanks for subscribing to my channel, i really appreciate it... FUCK",
          mode: "paragraph"
        }
      ]);
    }}>
      Show Thankfull
    </button>
  </div>

  <Modal
    bind:show={showModal} bind:body={modalBody} bind:footer={modalFooter} closable={modalClosable}
    bind:mouseOnModal={mouseOnModal} title={modalTitle} on:miscCloseFire={() => {
      window.windowEvents.emit("modal-close");
    }}
  />

  <Menu
    items={contextMenuSource} mode="manual" rightLighter={layoutMode === "rtl"}
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

    button {
      background: transparent;
      border: none;
      color: $f0;
      transition: 200ms;
      padding: 0 10px;
      height: 30px;
      border-radius: 3px;

      &:hover {
        background: $d0;
        cursor: pointer;
        color: $f1;
      }
    }

    .body {
      padding: 10px;
      display: flex;
      flex-direction: row;
    }
  }
</style>
