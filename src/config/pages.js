import corePages from '@imagina/qsite/_config/master/pages' //Core pages [Do not remove]
import appConfig from 'src/config/app'

let responsePages = {
    ...corePages,
    page: {
        home: {
            permission: null,
            activated: true,
            path: '/home',
            name: 'app.home',
            layout: () => import('src/layouts/master'),
            page: () => import('pages/master/index.vue'),
            title: 'sidebar.pageHome',
            icon: 'fas fa-home',
            authenticated: false
        },
        nosotros: {
            permission: null,
            activated: true,
            path: '/nosotros',
            name: 'app.nosotros',
            layout: () => import('src/layouts/master'),
            page: () => import('pages/nosotros.vue'),
            title: 'Nosotros',
            icon: 'fas fa-user-friends',
            authenticated: false
        },
        busqueda: {
            permission: null,
            activated: true,
            path: '/busqueda/:text/:cityId?/:neighborhoodId?',
            name: 'app.busqueda',
            layout: () => import('src/layouts/master'),
            page: () => import('pages/busqueda.vue'),
            title: 'busqueda',
            icon: 'far fa-envelope-open',
            authenticated: false
        },
        categoria: {
            permission: null,
            activated: true,
            path: '/categoria',
            name: 'app.categoria',
            layout: () => import('src/layouts/master'),
            page: () => import('pages/categoria.vue'),
            title: 'categoria',
            icon: 'far fa-envelope-open',
            authenticated: false
        },
        ofertas: {
            permission: null,
            activated: true,
            path: '/tiendas-en-ofertas',
            name: 'app.ofertas',
            layout: () => import('src/layouts/master'),
            page: () => import('pages/ofertas.vue'),
            title: 'Tiendas en oferta',
            icon: 'fas fa-store',
            authenticated: false
        },
        domicilios: {
            permission: null,
            activated: true,
            path: '/domicilios',
            name: 'app.domicilios',
            layout: () => import('src/layouts/master'),
            page: () => import('pages/domicilios.vue'),
            title: 'Domicilios',
            icon: 'fas fa-truck',
            authenticated: false
        },
        contacto: {
            permission: null,
            activated: true,
            path: '/contacto',
            name: 'app.contacto',
            layout: () => import('src/layouts/master'),
            page: () => import('pages/contacto.vue'),
            title: 'Contacto',
            icon: 'far fa-envelope-open',
            authenticated: false
        },
        problems: {
            permission: null,
            activated: true,
            path: '/pqrs',
            name: 'app.problems',
            layout: () => import('src/layouts/master'),
            page: () => import('pages/problems.vue'),
            title: 'Problems',
            icon: 'far fa-envelope-open',
            authenticated: false
        },
        trivia: {
            permission: null,
            activated: true,
            path: '/trivia',
            name: 'app.trivia',
            layout: () => import('src/layouts/master'),
            page: () => import('pages/trivia.vue'),
            title: 'Trivia',
            icon: 'far fa-envelope-open',
            authenticated: false
        },
        empresa: {
            permission: null,
            activated: true,
            path: '/empresa',
            name: 'app.empresa',
            layout: () => import('src/layouts/master'),
            page: () => import('pages/empresa.vue'),
            title: 'Empresa',
            icon: 'far fa-envelope-open',
            authenticated: false
        },
        admin: {
            permission: null,
            activated: true,
            path: '/admin',
            name: 'app.admin',
            layout: () => import('src/layouts/admin'),
            page: () => import('pages/admin/index.vue'),
            title: 'Administrador',
            icon: 'far fa-envelope-open',
            authenticated: true
        },
        // User Orders Profile
        userOrders: {
            permission: 'icommerce.orders.index',
            activated: true,
            path: '/account/orders',
            name: 'qcommerce.account.orders',
            layout: () => import('src/layouts/account.vue'),
            page: () => import('src/layouts/qcommerce/account/orders'),
            title: 'Mis compras',
            icon: 'apps',
            authenticated: true
        },
        // User Favorite Marketplace Profile
        userFavoriteStores: {
            //permission: 'qmarketplace.stores.manage',
            activated: true,
            path: '/account/favorite-stores',
            name: 'qmarketplace.account.favorite.stores',
            layout: () => import('src/layouts/account.vue'),
            page: () => import('src/layouts/qmarketplace/account/favoriteStores'),
            title: 'Mis tiendas favoritas',
            icon: 'apps',
            authenticated: true
        },
        // User Messages Profile
        userMessages: {
            //permission: 'qform.manage',
            activated: true,
            path: '/account/messages',
            name: 'qform.account.messages',
            layout: () => import('src/layouts/account.vue'),
            page: () => import('src/layouts/qform/account/messages'),
            title: 'Mis Mensajes',
            icon: 'apps',
            authenticated: true
        }

    }
    //Add here more responsePages...#example
    /*groupName : {
      routeName: {//Page home
        permission: null,
        activated: true,
        path: '/home',
        name: 'route.name',
        layout: () => import('path'),
        page: () => import('path'),
        title: 'route.title',
        icon: 'icon name',
        authenticated: Boolean
      }
    }*/
}

if (appConfig && appConfig.modules) {
    const modules = appConfig.modules

    // Get each config page from package
    modules.forEach(name => {
        let pageBackend = false

      //Find pageBackend
      try {
        pageBackend = require(`@imagina/${name}/_config/backendPages`).default
      } catch (e) {
      }

      responsePages[name] = pageBackend

    })
}
//======= Add or update pages
//#example: responsePages.<title-page> = <'title'>
//qblog
responsePages.qblog.posts.layout= () => import('src/layouts/admin')
responsePages.qblog.posts.path=  '/admin/blog/articulos/index'
responsePages.qblog.categories.layout= () => import('src/layouts/admin')
responsePages.qblog.categories.path='/admin/blog/categorias/index'
responsePages.frontqblog.index.page= () => import('src/pages/master/qblog/index')
responsePages.frontqblog.index.layout= () =>import('src/layouts/master')
responsePages.frontqblog.show.page= () => import('src/pages/master/qblog/show'),
responsePages.frontqblog.show.layout= () =>import('src/layouts/master')
//qcommerce
responsePages.qcommerce.products.layout= () => import('src/layouts/admin')
responsePages.qcommerce.products.path= '/admin/ecommerce/productos'
responsePages.qcommerce.productCreate.layout= () => import('src/layouts/admin')
responsePages.qcommerce.productCreate.path= '/admin/ecommerce/productos/create'
responsePages.qcommerce.productEdit.layout= () => import('src/layouts/admin')
responsePages.qcommerce.productEdit.path= '/ecommerce/productos/:id'
responsePages.qcommerce.categories.layout= () => import('src/layouts/admin')
responsePages.qcommerce.categories.path= '/admin/ecommerce/categorias'
responsePages.qcommerce.options.layout= () => import('src/layouts/admin')
responsePages.qcommerce.options.path= '/admin/ecommerce/optiones'
responsePages.qcommerce.optionValues.layout= () => import('src/layouts/admin')
responsePages.qcommerce.optionValues.path= '/admin/ecommerce/options-values'
responsePages.qcommerce.paymentMethods.layout= () => import('src/layouts/admin')
responsePages.qcommerce.paymentMethods.path= '/admin/ecommerce/metodo-de-pago'
responsePages.qcommerce.shippingMethods.layout= () => import('src/layouts/admin')
responsePages.qcommerce.shippingMethods.path= '/admin/ecommerce/metodos-de-envio'
responsePages.qcommerce.orders.layout= () => import('src/layouts/admin')
responsePages.qcommerce.orders.path= '/admin/ecommerce/ordenes'
responsePages.qmedia.index.layout= () => import('src/layouts/admin')
responsePages.qmedia.index.path= '/admin/media'
responsePages.qmenu.menus.layout= () => import('src/layouts/admin')
responsePages.qmenu.menus.path= '/admin/menu'
responsePages.qmenu.menusShow.layout= () => import('src/layouts/admin')
responsePages.qmenu.menusShow.path= '/admin/menus/menu/:id'
responsePages.qmenu.menuItemsCreate.layout= () => import('src/layouts/admin')
responsePages.qmenu.menuItemsCreate.path= '/admin/menus/item/:menuId'
responsePages.qmenu.menuItemsUpdate.layout= () => import('src/layouts/admin')
responsePages.qmenu.menuItemsUpdate.path= '/admin/menus/menu/:menuId/item/:id'
//responsePages.qmenu.menuitems.layout= () => import('src/layouts/admin')
//responsePages.qmenu.menuitems.path= '/admin/menu/menu-items'
responsePages.qsite.index.layout= () => import('src/layouts/admin')
responsePages.qsite.index.path= '/admin/site/index'
responsePages.qslider.index.layout= () => import('src/layouts/admin')
responsePages.qslider.index.path= '/admin/slider/index'

// QUSER
responsePages.quser.userIndex.layout= () => import('src/layouts/admin')
responsePages.quser.userIndex.path= '/admin/usuarios/index'
responsePages.quser.userDepartments.layout= () => import('src/layouts/admin')
responsePages.quser.userDepartments.path= '/admin/usuarios/departamentos'
responsePages.quser.userRoles.layout= () => import('src/layouts/admin')
responsePages.quser.userRoles.path= '/admin/usuarios/roles'
responsePages.quser.userProfile.layout= () => import('src/layouts/admin')
responsePages.quser.userProfile.path='admin/me/profile'

// QUSER FRONTEND
responsePages.frontquser.userProfile.path ='/account/me/profile'
responsePages.frontquser.userProfile.layout = () => import('src/layouts/account.vue')
responsePages.frontquser.userProfile.page = () => import('src/layouts/quser/profile')
responsePages.frontquser.login.layout = () => import('src/layouts/init.vue')
responsePages.frontquser.login.page = () => import('src/layouts/quser/login')
responsePages.frontquser.register.layout = () => import('src/layouts/init.vue')
responsePages.frontquser.register.page = () => import('src/layouts/quser/register')
responsePages.frontquser.logout.layout = () => import('src/layouts/init.vue')
responsePages.frontquser.logout.page =  () => import('src/layouts/quser/logout')
responsePages.frontquser.resetPassword.layout = () => import('src/layouts/init.vue')
responsePages.frontquser.resetPassword.page = () => import('src/layouts/quser/resetPassword')
responsePages.frontquser.resetPasswordComplete.layout = () => import('src/layouts/init.vue')
responsePages.frontquser.resetPasswordComplete.page = () => import('src/layouts/quser/resetPasswordComplete')


// QQUIZ
responsePages.qquiz.polls.layout= () => import('src/layouts/admin')
responsePages.qquiz.polls.path= '/admin/iquiz/polls/index'
responsePages.qquiz.questions.layout= () => import('src/layouts/admin')
responsePages.qquiz.questions.path= '/admin/iquiz/questions/index/poll/:id'

// QTRIVIA
responsePages.qtrivia.trivias.layout= () => import('src/layouts/admin')
responsePages.qtrivia.trivias.path= '/admin/itrivia/trivias/index'
responsePages.qtrivia.questions.layout= () => import('src/layouts/admin')
responsePages.qtrivia.questions.path= '/admin/itrivia/questions/index/trivia/:id'
responsePages.qtrivia.rangepoints.layout= () => import('src/layouts/admin')
responsePages.qtrivia.rangepoints.path= '/admin/itrivia/rangepoints/index/trivia/:id'

// QREDEEMS
responsePages.qredeems.items.layout= () => import('src/layouts/admin')
responsePages.qredeems.items.path=  '/admin/iredeems/items/index'
responsePages.qredeems.redeems.layout= () => import('src/layouts/admin')
responsePages.qredeems.redeems.path=  '/admin/iredeems/redeems/index'

// QREDEEMS FRONTEND
responsePages.frontqredeems.userAccount.path='account/redeems/points'
responsePages.frontqredeems.userAccount.layout = () => import('src/layouts/account.vue')
responsePages.frontqredeems.userAccount.page= () => import('src/layouts/qredeems/account/index')

responsePages.frontqredeems.userPrizes.path='account/prizes'
responsePages.frontqredeems.userPrizes.layout = () => import('src/layouts/account.vue')

//QFORM
responsePages.qform.forms.layout= () => import('src/layouts/admin')
responsePages.qform.forms.path=  '/admin/iform/form'
responsePages.qform.leads.layout= () => import('src/layouts/admin')
responsePages.qform.leads.path=  '/admin/iform/leads/index'
responsePages.qform.leadsShow.layout= () => import('src/layouts/admin')
responsePages.qform.leadsShow.path=  '/admin//iform/lead/:id'
responsePages.qform.fields.layout= () => import('src/layouts/admin')
responsePages.qform.fields.path=  '/admin/iform/fields/:id'

//QSUBSCRIPTION
responsePages.qsubscription.products.layout= () => import('src/layouts/admin')
responsePages.qsubscription.productsCreate.layout= () => import('src/layouts/admin')
responsePages.qsubscription.productsUpdate.layout= () => import('src/layouts/admin')
responsePages.qsubscription.plans.layout= () => import('src/layouts/admin')
responsePages.qsubscription.plansCreate.layout= () => import('src/layouts/admin')
responsePages.qsubscription.plansUpdate.layout= () => import('src/layouts/admin')
responsePages.qsubscription.features.layout= () => import('src/layouts/admin')
responsePages.qsubscription.featuresCreate.layout= () => import('src/layouts/admin')
responsePages.qsubscription.featuresUpdate.layout= () => import('src/layouts/admin')

//QMARKETPLACE
responsePages.qmarketplace.themes.layout= () => import('src/layouts/admin')
responsePages.qmarketplace.categories.layout= () => import('src/layouts/admin')
responsePages.qmarketplace.stores.layout= () => import('src/layouts/admin')
responsePages.qmarketplace.storesCreate.layout= () => import('src/layouts/admin')
responsePages.qmarketplace.storesEdit.layout= () => import('src/layouts/admin')
responsePages.qmarketplace.storesTheme.layout= () => import('src/layouts/admin')
responsePages.qmarketplace.storeProducts.layout= () => import('src/layouts/admin')
responsePages.qmarketplace.storeProductsCreate.layout= () => import('src/layouts/admin')
responsePages.qmarketplace.myStore.layout= () => import('src/layouts/admin')
responsePages.qmarketplace.myStoreTheme.layout= () => import('src/layouts/admin')
responsePages.qmarketplace.myStoreProducts.layout= () => import('src/layouts/admin')

export default responsePages
