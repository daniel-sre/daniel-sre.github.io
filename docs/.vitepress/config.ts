export default {
  title: "Daniel Docs",
  description: "SRE / DevOps Notes",

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Go", link: "/go/" },
      { text: "Network", link: "/network/" },
      { text: "System", link: "/system/" },
      { text: "Tools", link: "/tools/" }
    ],

    sidebar: [
      {
        text: "Go",
        items: [
          { text: "Overview", link: "/go/" },

	  {
	    text: "Basic",
	    items: [
		{ text: "Overview", link: "/go/basic/" },
        	{ text: "Slice", link: "/go/basic/slice" },
        	{ text: "Map", link: "/go/basic/map" },
        	{ text: "Struct", link: "/go/basic/struct" },
        	{ text: "Interface", link: "/go/basic/interface" }
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
          { text: "TCP/IP", link: "/network/tcp-ip" },
          { text: "HTTP", link: "/network/http" }
        ]
      },
      {
        text: "System",
        items: [
          { text: "Overview", link: "/system/" },
          { text: "Linux", link: "/system/linux" },
          { text: "IO Model", link: "/system/io" }
        ]
      },
      {
        text: "Tools",
        items: [
          { text: "Overview", link: "/tools/" },
          { text: "Go Port Scanner", link: "/tools/go-port-scanner" }
        ]
      }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/daniel-sre" }
    ]
  }
}
