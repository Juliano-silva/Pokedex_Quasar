
const routes = [
  {
    path: '/',
    component: () => import('pages/IndexPage.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
]

export default routes
