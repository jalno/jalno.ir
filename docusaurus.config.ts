import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const defaultLocale = 'fa';
let currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? defaultLocale;
if (currentLocale === 'undefined') {
  currentLocale = defaultLocale;
}

const title = {
  fa: "جالنو",
  en: "Jalno"
};

const config: Config = {
  title: title[currentLocale],
  favicon: 'img/logo.png',

  url: 'https://jalno.ir',
  baseUrl: '/',


  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale,
    locales: ['fa', 'en'],
    localeConfigs: {
      fa: {
        direction: 'rtl',
      },
    }
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/jalno/jalno.ir/tree/master/',
          versions: {
            current: {
              label: "در حال توسعه",
              path: "master"
            },
            '2.x': {
              label: "2.0.0"
            },
            '1.x': {
              label: "1.0.0",
              banner: "unmaintained"
            }
          }
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'جالنو',
      logo: {
        alt: 'لوگوی جالنو',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'مستندات',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          className: "versions-dropdown"
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/jalno',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      copyright: `تمامی حقوق برای شرکت داده نگار جی محفوظ می‌باشد.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'PHp',
        'bash',
        'diff',
        'json',
        'scss',
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
