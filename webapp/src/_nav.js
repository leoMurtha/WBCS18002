export default {
  items: [
    {
      title: true,
      name: 'Resources',
    },
    {
      name: 'Airports',
      url: '/find-airports',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'API',
      },
    },
    {
      name: 'Carriers',
      url: '/carriers',
      icon: 'icon-star',
      badge: {
        variant: 'info',
        text: 'API',
      },
    },
    {
      name: 'Routes',
      url: '/routes',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'API',
      },
    },
    {
      name: 'Download CoreUI',
      url: 'https://coreui.io/react/',
      icon: 'icon-cloud-download',
      class: 'mt-auto',
      variant: 'success',
      attributes: { target: '_blank', rel: "noopener" },
    },
    {
      name: 'Try CoreUI PRO',
      url: 'https://coreui.io/pro/react/',
      icon: 'icon-layers',
      variant: 'danger',
      attributes: { target: '_blank', rel: "noopener" },
    },
  ],
};
