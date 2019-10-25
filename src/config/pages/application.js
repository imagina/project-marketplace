//Layout container
import master from 'src/layouts/master'
import config from 'src/layouts/config'
import notFound from 'src/layouts/404'
import admin from 'src/layouts/admin/admin'
//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {
	//Home Page
	home: {
		permission: null,
		activated: true,
		path: '/inicio',
		name: 'app.home',
		layout: require('src/layouts/index').default,
		containerLayout: master,
		title: 'sidebar.pageHome',
		icon: 'fas fa-home',

	},
	nosotros: {
		permission: null,
		activated: true,
		path: '/nosotros',
		name: 'app.nosotros',
		layout: require('src/layouts/pages/nosotros').default,
		containerLayout: master,
		title: 'Nosotros',
		icon: 'fas fa-users'
	},
	contacto: {
		permission: null,
		activated: true,
		path: '/contacto',
		name: 'app.contacto',
		layout: require('src/layouts/pages/contacto').default,
		containerLayout: master,
		title: 'Contacto',
		icon: 'far fa-envelope-open'
	},
	categoria: {
		permission: null,
		activated: true,
		path: '/categoria',
		name: 'app.categoria',
		layout: require('src/layouts/pages/categoria').default,
		containerLayout: master,
		title: 'Categoria',
		icon: 'far fa-envelope-open'
	},
	busqueda: {
		permission: null,
		activated: true,
		path: '/busqueda',
		name: 'app.busqueda',
		layout: require('src/layouts/pages/busqueda').default,
		containerLayout: master,
		title: 'Busqueda',
		icon: 'far fa-envelope-open'
	},
	trivia: {
		permission: null,
		activated: true,
		path: '/trivia',
		name: 'app.trivia',
		layout: require('src/layouts/pages/trivia').default,
		containerLayout: master,
		title: 'Trivia',
		icon: 'far fa-envelope-open'
	},
	editartienda: {
		permission: auth,
		activated: true,
		path: '/editartienda',
		name: 'app.editartienda',
		layout: require('src/layouts/pages/editar_tienda').default,
		containerLayout: master,
		title: 'Editar Tienda',
		icon: 'far fa-store'
	},
	layout1: {
		permission: null,
		activated: true,
		path: '/layout1',
		name: 'app.layout1',
		layout: require('src/layouts/themes/index1').default,
		containerLayout: master,
		title: 'layout1',
		icon: 'far fa-store'
	},
	layout2: {
		permission: null,
		activated: true,
		path: '/layout2',
		name: 'app.layout2',
		layout: require('src/layouts/themes/index2').default,
		containerLayout: master,
		title: 'layout2',
		icon: 'far fa-store'
	},
	blogIndex: {
		permission: null,
		activated: true,
		path: '/blog-index',
		name: 'app.blog-index',
		layout: require('src/layouts/qblog/index').default,
		containerLayout: master,
		title: 'blog index',
		icon: 'far fa-store'
	},
   blogShow: {
		permission: null,
		activated: true,
		path: '/blog-show',
		name: 'app.blog-show',
		layout: require('src/layouts/qblog/show').default,
		containerLayout: master,
		title: 'blog show',
		icon: 'far fa-store'
	},
    admin: {
        permission: null,
        activated: true,
        path: '/admin',
        name: 'app.admin',
        layout: require('src/layouts/admin/index').default,
        containerLayout: admin,
        title: 'Admintrador',
        icon: 'far fa-envelope-open',
        middleware: [auth]
    },
	//Config Page
	config: {
		permission: null,
		activated: true,
		path: '/config',
		name: 'app.config',
		layout: require('src/layouts/app/config').default,
		containerLayout: config,
		title: 'sidebar.pageConfig',
		icon: 'fas fa-home',
	},
	//Not found Page
	notFound: {
		permission: null,
		activated: true,
		path: '*',
		name: 'app.not.found',
		layout: null,
		containerLayout: notFound,
		title: 'sidebar.pageNotFound',
		icon: 'fas fa-chart-bar'
	},
}
