<template>
  <div>
    <div class="lt-sm-block" id="listMenu">
      <q-no-ssr v-for="(item,key) in props.menu" :key="key" class="content-item">
        <!-- If the item doesn't have children and has a parent -->
        <q-list dense v-if="checkItemSingle(item) && props.parent">
          <q-item clickable class="q-pa-none">
            <q-item-section avatar v-if="item.icon"><q-icon color="tertiary" :name="item.icon" /></q-item-section>
            <q-item-section @click.native="redirectTo(item)" class="text-secondary text-capitalize">
                {{props.translatable ? $tr(item.title) : item.title}}
            </q-item-section>
          </q-item>
        </q-list>
        <!-- If the item doesn't have children and doesn't have a parent -->
        <div class="cursor-pointer non-selectable lt-sm-block" v-else-if="checkItemSingle(item)">
          <q-item clickable class="q-pa-none">
            <q-item-section avatar v-if="item.icon"><q-icon color="secondary" :name="item.icon" /></q-item-section>
            <q-item-section @click.native="redirectTo(item)" class="text-secondary text-capitalize">
                {{props.translatable ? $tr(item.title) : item.title}}
            </q-item-section>
          </q-item>
        </div>
        <!-- If the item has children and has a parent -->
        <q-list dense v-else-if="checkItemMultiple(item) && props.parent">
          <q-item clickable class="q-pa-none">
            <q-item-section avatar v-if="item.icon"><q-icon color="tertiary" :name="item.icon" /></q-item-section>
            <q-item-section class="text-capitalize">
              {{props.translatable ? $tr(item.title) : item.title}}
            </q-item-section>
            <q-item-section side>
              <q-icon name="keyboard_arrow_right" color="secondary" />
            </q-item-section>
            <q-menu anchor="top right" self="top left">
              <recursive-item-desktop class="menu-left" :translatable="props.translatable" :show-icons="props.showIcons"
                              :key="key" :menu="item.children" :parent="item"/>
            </q-menu>
          </q-item>
        </q-list>
        <!-- If the item has children and doesn't have a parent -->
        <div class="cursor-pointer non-selectable lt-sm-block text-secondary text-capitalize" v-else>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon v-if="item.icon" :name="item.icon" color="secondary" />
            </q-item-section>
            <q-item-section>
            {{props.translatable ? $tr(item.title) : item.title}}
            </q-item-section>
            <q-item-section avatar>
              <q-icon name="keyboard_arrow_down" color="secondary" />
            </q-item-section>
            <q-menu>
              <recursive-item-desktop class="menu-down" :translatable="props.translatable" :show-icons="props.showIcons"
                                      :key="key" :menu="item.children" :parent="item"/>
            </q-menu>
          </q-item>
        </div>
      </q-no-ssr>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'recursiveItemDesktop',
    components: {},
    props: {
      menu: {default: false},
      parent: {default: undefined},
      showIcons: {type: Boolean, default: true},
      translatable: {type: Boolean, default: true},
      inLine: {type: Boolean, default: false}
    },
    watch: {
      menu: {
        handler (value) {
          this.init()
        },
        deep: true
      }
    },

    mounted() {
      this.$nextTick(function () {
        this.init()
      })
    },
    data() {
      return {
        props: {}
      }
    },
    methods: {
      //init
      init() {
        this.props = this.$clone(this.$props)
        setTimeout(() => {
          this.checkCollapsibles()
        }, 300)
      },
      //Validate if should load single-item
      checkItemSingle(item) {
        let response = true
        if (!item.activated) response = false
        if (item.children) response = false
        //if (!item.name || item.uri) response = false
        if (item.permission && !this.$auth.hasAccess(item.permission)) response = false
        return response//Response
      },
      //Validate if should load multi-item
      checkItemMultiple(item) {
        let response = true
        if (!item.children) response = false
        if (item.children && !item.children.length) response = false
        if (item.permission && !this.$auth.hasAccess(item.permission)) response = false
        return response//Response
      },
      //Validate if should load all multi-item
      checkCollapsibles() {
        let collapsibles = this.$el.getElementsByClassName('q-expansion-item')
        for (let group of collapsibles) {
          let items = group.getElementsByClassName('single-item')
          if (!items.length) group.style.display = 'none'
        }
      },
      //Redirect to route of pages
      redirectTo(item) {
        if (item.linkType && (item.linkType == 'external')) {
          if(process.env.CLIENT)  window.open(`https://${item.url}`, item.target)
        } else {
          this.$router.push({name: item.name || item.uri, params: item.params || {}})
        }
      },
      //Validate if children of multi-item is selected
      selectedChildren(item) {
        let response = ''//Defualt response
        //If has children's
        if (item.children) {
          let routeName = this.$route.name
          let isSelectedChildren = item.children.find(item => item.name == routeName)
          if (isSelectedChildren) response = ' item-is-active'
        }
        return response //Response
      },
      //Validate if item is same of current page
      getClassItem(item) {
        let response = 'single-item'
        if (this.$route.name == item.name) {
          if (JSON.stringify(this.$route.params) == JSON.stringify(item.params || {})) {
            response += ' item-is-active'
          }
        }
        return response
      }
    }
  }
</script>
<style lang="stylus">
</style>
