const user_Home = Vue.component("home", {
  template: `
                <div>
                  {{products}}
                <header class="masthead" style="background-image: url('/static/assets/img/r3_537_5614_3707_w1200_h678_fmax.jpg')">
                
          
                     
        </header>  

                     
                 <div class="col-12 text-center">
              
           
                
               <button type="button" class="btn btn-primary" >           <a @click="go_to_search()"class="pt-3">SEARCH</a></h4>  </button>                  
               <button type="button" class="btn btn-primary" >            <a @click="go_to_cart()" class="pt-3">CART</a>  </button>
             
         
                 
               </div>
                                                                                       <div class="container">
                                                                       <h1 class="text-center p-2">Our Products</h1>
                                                                       <div class="row">
                                                                           
                                                                           <div v-for="item in products":key="item.id" class="col-md-3">
                                                                           <div v-if="item.quantity>0" >
                                                                               <div v-if="item.allow"  style="text-align: center;" class="card product-item">
                                                                                   <img :src=item.image_url class="card-img-top" width="150px" height="250px" alt="...">
                                                                                       <div class="card-body">
                                                                                           <h5 class="card-title">{{item.product_name}}</h5>
                                                                                           <h5 class="card-title">Quantity {{item.quantity}}</h5>
                                                                                           <h5 class="card-title">Price ₹{{item.rate}}</h5>
                                                                                           <p class="card-text">
                                                                                           {{item.description}}
                                                                                           </p>
                                                                                           <a @click="add_to_Cart(item.product_name,item.category_id,item.description,item.image_url,item.rate,item.id)" class="btn btn-primary">Add to Cart</a>
                                                                                       </div>

                                                                                   </div>
                                                                                   </div>
                                                                                   
                                                                                <div  v-else>
                                                                               <div v-if="item.allow"  style="text-align: center;" class="card product-item">
                                                                                   <img :src=item.image_url class="card-img-top" width="150px" height="250px" alt="...">
                                                                                       <div class="card-body">
                                                                                           <h5 class="card-title">{{item.product_name}}</h5>
                                                                                           <h5 class="card-title">Quantity OUT OF STOCK</h5>
                                                                                           <h5 class="card-title">Price ₹{{item.rate}}</h5>
                                                                                           <p class="card-text">
                                                                                           {{item.description}}
                                                                                           </p>
                                                                                          
                                                                                       </div>

                                                                                   </div>
                                                                           </div>
                                                                           </br>
                                                                          </div> 

                </div>                                                      
                 </div>
     </div>
     
                        </div>
    `,
  data(){
    return{
      user:[],
      products:[],
      Categorys:[],
      cat_name:[],
      cat_id:[],
      data:[],
      store_id:null
    }
  },
  mounted: function () {
    if(localStorage.getItem("access_token")){
                                            
                                              console.log( " hai bhai")
                                              console.log(localStorage.getItem("access_token"))
                                              document.title = "shop - Home";
                                              
                                              fetch(`http://127.0.0.1:5000/api/user/info`,
                                              {
                                                method:"GET",
                                                headers:{
                                                  "content-type":"application/json",
                                                  "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
                                          
                                                },
                                                //body: JSON.stringify(data)
                                              })
                                              .then(res=>res.json()).then(info=>
                                                {
                                                 
                                                  if(info.msg=="Token has expired"){
                                                                                      console.log("token get expired")
                                                    // methods.refresh_get()
                                                                                      console.log("appling for new token")
                                                                                      fetch("http://127.0.0.1:5000/api/user/refresh",
                                                                                        {
                                                                                          method:"GET",
                                                                                          headers:{
                                                                                                    "content-type":"application/json",
                                                                                                    Authorization:`Bearer  ${localStorage.getItem("refresh_token")}`
                                                                                                }
                                                                                        }).then(res=>res.json())
                                                                                        .then(respo=>{
                                                                                          localStorage.setItem("access_token",respo.refresed_access_token)
                                                                                          this.$router.go(0)
                                                                                        })
                                                   }else{
                                                      this.user=info
                                                      console.log("we got data",this.user.role=="manager")
                                                      //if(data==null){console.log("token/wrong")}
                                                             // refresh_get() 
                                                              //  console.log("ref_key",localStorage.getItem("refresh_token"))
                                                               


                                                              fetch(`http://127.0.0.1:5000/all/api/pro/`,
                                                              {
                                                                method:"GET",
                                                                headers:{
                                                                  "content-type":"application/json",
                                                                  "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
                                                          
                                                                },
                                                                //body: JSON.stringify(data)
                                                              })
                                                              .then(res=>res.json()).then(info=>
                                                                {this.products=info})

                                                                fetch(`http://127.0.0.1:5000/api/cato`,
                                                                {
                                                                  method:"PATCH",
                                                                  headers:{
                                                                    "content-type":"application/json",
                                                                    "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
                                                            
                                                                  },
                                                                  //body: JSON.stringify(data)
                                                                })
                                                                .then(res=>res.json()).then(info=>
                                                                  {this.Categorys=info
                                                                   
                                                                  
                                                                  
                                                                  
                                                                  })  


                                                                 




                                                              ////////////////////////////////
                                                              
                                                      }
                                          
                                                })
                                              .catch(error=>{
                                                console.log(error)
                                              })
    }else{
      console.log("nahi hai bhai")
      alert(" please log in ")
      this.$router.push("/")
    }
   
  },

  methods : {
    async add_to_Cart(a,b,c,d,e,f) {
      fetch(`http://127.0.0.1:5000/all/api/store/${b}`,
                                              {
                                                method:"GET",
                                                headers:{
                                                  "content-type":"application/json",
                                                  "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
                                          
                                                },
                                                //body: JSON.stringify(data)
                                              })
                                              .then(res=>res.json()).then(info=>
                                                {this.store_id=info
                                                console.log(this.store_id)
                                                const newcart = {

                                                  product_name : a,
                                                  quantity : 1,
                                                  description : c,
                                                  image_url : d,
                                                  user_id:this.user.id,
                                                  category_id:b,
                                                  rate:e,
                                                  store_id:this.store_id,
                                                  product_id : f,
                                                };
                                                console.log(f)
                                                 fetch(`http://127.0.0.1:5000/api/cart/${f}`, {
                                                  method: "POST",
                                                  headers: {
                                                    "Content-Type": "application/json",
                                                    "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
                                                  },
                                                  body: JSON.stringify(newcart),//content which should be uploaded
                                                  
                                                })
                                                .then(repo=>{
                                                  console.log(localStorage.getItem("access_token"))
                                               //  this.$router.go(0)
                                               fetch(`http://127.0.0.1:5000/all/api/pro/`,
                                               {
                                                 method:"GET",
                                                 headers:{
                                                   "content-type":"application/json",
                                                   "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
                                           
                                                 },
                                                 //body: JSON.stringify(data)
                                               })
                                               .then(res=>res.json()).then(info=>
                                                 {this.products=info})

                                                 fetch(`http://127.0.0.1:5000/api/cato`,
                                                 {
                                                   method:"PATCH",
                                                   headers:{
                                                     "content-type":"application/json",
                                                     "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
                                             
                                                   },
                                                   //body: JSON.stringify(data)
                                                 })
                                                 .then(res=>res.json()).then(info=>
                                                   {this.Categorys=info
                                                    
                                                   
                                                   
                                                   
                                                   })  


                                                  


                                                  console.log("back to space")
                                                })
                                                })
      
    },
    go_to_cart(){
    
      this.$router.push(`/user_cart/${this.user.id}`)
    },
    go_to_search(){
    
      this.$router.push(`/user_search/${this.user.id}`)
    },
  }
});

export default user_Home;
