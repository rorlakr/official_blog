import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://rorlakr.github.io",
  author: "Lucius Choi",
  desc: "RORLAB Official Blog",
  title: "RORLAB2",
  ogImage: "/assets/rorlab_emblem_white.png",
  lightAndDarkMode: true,
  postPerPage: 10,
};

export const LOCALE = ["ko"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
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
    active: false,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/rorlab",
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
  {
    name: "YouTube",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on YouTube`,
    active: false,
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
