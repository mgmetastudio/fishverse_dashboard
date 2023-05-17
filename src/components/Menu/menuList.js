import {menuIcons} from './menuIcons'


let account = localStorage.getItem('username')

export const items = [
    {
      title: "Overview",
      link: "/overview",
      logo: menuIcons[0],
    },
    {
      title: "NFT",
      link: "/",
      logo: menuIcons[1],
      submenu: [
        {
          title: "My NFT",
          link: "/wallet",
        },
        {
          title: "Marketplace",
          link: "/marketplace",
        },
      ],
    },
    {
      title: "Staking",
      link: "/",
      logo: menuIcons[2],
      submenu: [
        {
          title: "Stake $FVS",
          link: "/stake-fvs",
        },
        {
          title: "My stakes",
          link: "/my-stakes",
        },
      ],
    },
    {
      title: "Wallet",
      link: "/wallet",
      logo: menuIcons[3],
      submenu: [
        {
          title: "IDO claim",
          link: "/ido-claim",
        },
        {
          title: "$FISHERS swap",
          link: "/swap",
        },
        {
          title: "Buy tokens/NFT",
          link: "buy-tokens-nft",
        },
      ],
    },
    {
      title: "Game",
      link: "/game",
      logo: menuIcons[4],
      submenu: [
        {
          title: "Download",
          link: "/download",
        },
        {
          title: "Leaderboard",
          link: "/leaderboard",
        },
      ],
    },
    {
      title: "Rewards",
      link: "/rewards",
      logo: menuIcons[5],
      submenu: [
        {
          title: "Referral program",
          link: "/referral-program",
        },
        {
          title: "Daily quests",
          link: "/daily-quests",
        },
      ],
    },
    {
      title: "Profile",
      link: "/profile",
      logo: menuIcons[6],
      submenu: [
        {
          title: "Settings",
          link: "/settings",
        },
      ],
    },
  ];
  