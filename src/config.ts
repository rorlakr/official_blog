import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://www.rorlab.kr",
  author: "Lucius Choi",
  desc: "RORLAB Official Blog",
  title: "RORLAB2",
  ogImage: "https://www.rorlab.kr/assets/rorlab_open_graphic_white.png",
  lightAndDarkMode: true,
  postPerPage: 10,
};

export const LOCALE = ["ko"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: true,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/rorlakr",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/groups/rubyonrailskorea",
    linkTitle: `${SITE.title} on Facebook`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:rorlab@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/rorlab",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
  {
    name: "YouTube",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on YouTube`,
    active: true,
  },
  {
    name: "CodePen",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on CodePen`,
    active: false,
  },
  {
    name: "Discord",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Discord`,
    active: false,
  },
];
