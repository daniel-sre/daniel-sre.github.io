export default {
  themeConfig: {
    sidebar: [
      {
        text: "Overview",
        link: "/"
      },

      {
        text: "Go",
        items: [
          {
            text: "Basic",
            items: [
              { text: "Slice", link: "/go/basic/slice" },
              { text: "Map", link: "/go/basic/map/map" },
              { text: "Interface", link: "/go/basic/interface/interface" },
              { text: "Struct", link: "/go/basic/struct/struct" }
            ]
          },

          { text: "Concurrency", link: "/go/concurrency" },
          { text: "Memory", link: "/go/memory" }
        ]
      },

      {
        text: "Network",
        items: [
          { text: "Overview", link: "/network/" },
          { text: "HTTP", link: "/network/http" },
          { text: "TCP/IP", link: "/network/tcp-ip" }
        ]
      },

      {
        text: "System",
        items: [
          { text: "Overview", link: "/system/" },
          { text: "IO", link: "/system/io" },
          { text: "Linux", link: "/system/linux" }
        ]
      },

      {
        text: "Tools",
        items: [
          { text: "Overview", link: "/tools/" },
          { text: "Go Port Scanner", link: "/tools/go-port-scanner" }
        ]
      }
    ]
  }
}
