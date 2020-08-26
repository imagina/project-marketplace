<template>
   <div class="interest-stores q-my-lg full-width">
      <div class="bg-fondo text-center ">
         <h3 class="title-label-tertiary text-center">
            <div>Tiendas de tu interes</div>
         </h3>
         <div class="q-container">
            <div class="row">
               <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-4" v-for="store in stores">
                  <store :store="store"></store>
               </div>
            </div>
         </div>
      </div>
     <q-inner-loading :visible="loading" />
   </div>
</template>
<script>
   import store from 'src/components/themes/store'

   export default {
      name: 'InterestStoresComponent',
      components: {
         store
      },
      mounted() {
         this.$nextTick(function () {
            this.getStores()
         })
      },
      data() {
         return {
            stores: [],
           loading:false
         }
      },
      methods: {
         getStores() {
           this.loading=true
            let user= this.$helper.convertToFrontField(this.$store.state.quserAuth.userData.fields)
           let userCategories=[]
           if(user.promotions){
              userCategories= user.promotions.value.map((i => i.value));
           }else{
             userCategories=[1,2,3]
           }
           let params={
              filter: {
                 // categories: userCategories,
                 order: 'random'
              },
              take: 6
           };
           var searchStore = localStorage.getItem("searchStore");
           var searchCity = localStorage.getItem("searchCity");
           var searchNeighborhood = localStorage.getItem("searchNeighborhood");
           if(searchStore){
            if(searchStore.includes("[")){
              searchStore=JSON.parse(searchStore);
            }else{
              searchStore=[searchStore];
            }
            var searchText="";
            for(var i=0;i<searchStore.length;i++){
              searchText+=" "+searchStore[i];
            }
            params.filter.search=searchText;
           }
           // if(searchCity){
           //   params.filter.cities=searchCity;
           // }else{
           //   params.filter.cities=null;
           // }
           // if(searchNeighborhood!=undefined && searchNeighborhood!="0" && searchNeighborhood){
           //   params.filter.neighborhoods=searchNeighborhood;
           // }else{
           //   params.filter.neighborhoods=null;
           //
           // }

           if(!searchStore){
             params.filter.categories=userCategories;
           }else{
             params.filter.categories=null;

           }
           console.log(params);
            this.$crud.index("apiRoutes.qmarketplace.store", {
               params: params
            }).then(response => {
               this.stores = response.data;
              this.loading = false
            }).catch(error => {
              this.loading = false
            });
         }
      }
   }
</script>
<style lang="stylus">
</style>
