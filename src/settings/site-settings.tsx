import { INFlag } from '@components/icons/language/INFlag';
import { USFlag } from '@components/icons/language/USFlag';

export const siteSettings = {
  name: 'FreshFare',
  description: 'Buy Groceries with the best price available.',
  author: {
    name: 'Fresh Fare',
    websiteUrl: 'https://fresh-fare.vercel.app',
    address: '',
  },
  logo: {
    url: '/assets/images/logo.svg',
    alt: 'FreshFare',
    href: '/',
    width: 128,
    height: 30,
  },
  defaultLanguage: 'en',
  currencyCode: 'INR',
  site_header: {
    menu: [
      {
        id: 1,
        path: '/',
        label: 'menu-demos',
        subMenu: [
          {
            id: 1,
            path: '/',
            label: 'menu-modern',
          },
          {
            id: 2,
            path: '/classic',
            label: 'menu-classic',
          },
          {
            id: 3,
            path: '/vintage',
            label: 'menu-vintage',
          },
          {
            id: 4,
            path: '/standard',
            label: 'menu-standard',
          },
          {
            id: 5,
            path: '/minimal',
            label: 'menu-minimal',
          },
          {
            id: 6,
            path: '/trendy',
            label: 'menu-trendy',
          },
          {
            id: 7,
            path: '/elegant',
            label: 'menu-elegant',
          },
        ],
      },
      {
        id: 2,
        path: '/search',
        label: 'menu-categories',
        subMenu: [
          {
            id: 1,
            path: '/search',
            label: 'menu-fresh-vegetables',
          },
          {
            id: 2,
            path: '/search',
            label: 'menu-diet-nutrition',
          },
          {
            id: 3,
            path: '/search',
            label: 'menu-healthy-foods',
          },
          {
            id: 4,
            path: '/search',
            label: 'menu-grocery-items',
          },
          {
            id: 5,
            path: '/search',
            label: 'menu-beaf-steak',
          },
        ],
      },
      {
        id: 3,
        path: '/search',
        label: 'menu-dietary',
        subMenu: [
          {
            id: 1,
            path: '/search',
            label: 'menu-vegetarian',
          },
          {
            id: 2,
            path: '/search',
            label: 'menu-kakogenic',
          },
          {
            id: 3,
            path: '/search',
            label: 'menu-mediterranean',
          },
          {
            id: 4,
            path: '/search',
            label: 'menu-organic',
          },
        ],
      },
      {
        id: 4,
        path: '/search/',
        label: 'menu-search',
      },
      {
        id: 5,
        path: '/shops/',
        label: 'menu-shops',
      },
      {
        id: 6,
        path: '/',
        label: 'menu-pages',
        subMenu: [
          {
            id: 1,
            path: '/',
            label: 'menu-users',
            subMenu: [
              {
                id: 1,
                path: '/my-account/account-settings',
                label: 'menu-my-account',
              },
              {
                id: 2,
                path: '/signin',
                label: 'menu-sign-in',
              },
              {
                id: 3,
                path: '/signup',
                label: 'menu-sign-up',
              },
            ],
          },
          {
            id: 2,
            path: '/faq',
            label: 'menu-faq',
          },
          {
            id: 3,
            path: '/about-us',
            label: 'menu-about-us',
          },
          {
            id: 4,
            path: '/privacy',
            label: 'menu-privacy-policy',
          },
          {
            id: 5,
            path: '/terms',
            label: 'menu-terms-condition',
          },
          {
            id: 6,
            path: '/contact-us',
            label: 'menu-contact-us',
          },
          {
            id: 7,
            path: '/checkout',
            label: 'menu-checkout',
          },
          {
            id: 8,
            path: '/404',
            label: 'menu-404',
          },
        ],
      },
    ],
    languageMenu: [
      {
        id: 'ta',
        name: 'Tamil - TA',
        value: 'ta',
        icon: <INFlag />,
      },
      {
        id: 'te',
        name: 'Telugu - TE',
        value: 'te',
        icon: <INFlag />,
      },
      {
        id: 'hi',
        name: 'Hindi - HI',
        value: 'hi',
        icon: <INFlag />,
      },
      {
        id: 'en',
        name: 'English - EN',
        value: 'en',
        icon: <USFlag />,
      },
    ],
  },
};
