export default {
  themeConfig: {
    sidebar: [
      {
        text: "Overview",
        link: "/"
      },

      {
        text: "Basic",
        items: [
          { text: "Overview", link: "/go/basic/" },

          {
            text: "Slice",
            items: [
              { text: "Overview", link: "/go/basic/slice/" },
              { text: "底层结构与扩容机制", link: "/go/basic/slice/core" }
            ]
          },

          {
            text: "Map",
            items: [
              { text: "Overview", link: "/go/basic/map/" }
            ]
          },

          {
            text: "Struct",
            items: [
              { text: "Overview", link: "/go/basic/struct/" }
            ]
          },

          {
            text: "Interface",
            items: [
              { text: "Overview", link: "/go/basic/interface/" }
            ]
          }
        ]
      },

      {
        text: "Concurrency",
        items: [
          { text: "Overview", link: "/go/concurrency/" }
        ]
      },

      {
        text: "Memory",
        items: [
          { text: "Overview", link: "/go/memory/" }
        ]
      },

      {
        text: "Network",
        items: [
          { text: "Overview", link: "/network/" },
          { text: "TCP/IP", link: "/network/tcp-ip" },
          { text: "HTTP", link: "/network/http" }
        ]
      },

      {
        text: "System",
        items: [
          { text: "Overview", link: "/system/" },
          { text: "Linux", link: "/system/linux" },
          { text: "IO Model", link: "/system/io-model" }
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
