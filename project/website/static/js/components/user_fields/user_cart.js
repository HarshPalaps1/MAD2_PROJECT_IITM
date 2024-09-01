const user_Cart = Vue.component("home", {
    template: `
                  <div>
                  <div>
                  <header class="masthead" style="background-image: url('/static/assets/img/r3_537_5614_3707_w1200_h678_fmax.jpg')">
                  
            
                       
          </header>  
  
  
  
                        
                   <div class="col-12 text-center">
                
             
                  
                 <button type="button" class="btn btn-primary" >           <a @click="go_to_search()"class="pt-3">SEARCH</a></h4>  </button>                  
                 <button type="button" class="btn btn-primary" >           <a @click="home()"class="pt-3">HOME</a></h4>  </button>   
                   
                 </div>
                                                                                         <div class="container">
                                                                         <h1 class="text-center p-5">Our Products</h1>
                                                                         <div class="row">
                                                                             
                                                                             <div v-for="item in products":key="item.id" class="col-md-4">
                                                                             <div v-if="item.quantity>0" >
                                                                                 <div v-if="item.allow"  class="card product-item">
                                                                                     <img src="https://th.bing.com/th/id/OIP.H8AnHPjvINvZceBW090pnQHaEK?rs=1&pid=ImgDetMain" class="card-img-top" alt="...">
                                                                                         <div class="card-body">
                                                                                             <h5 class="card-title">Surface Book 2</h5>
                                                                                             <p class="card-text">
                                                                                                {{item}}
                                                                                             </p>
                                                                                             <a   @click="add_to_Cart(item.product_name,item.quantity,item.description,item.image_url,item.rate)" class="btn btn-primary">Add to Cart</a>
                                                                                         </div>
                                                                                     </div>
                                                                                     
                                                                             </div>
                                                                            </div> 
  
                                                                            
                   </div>
       </div>
       <!------------->
       <table class="table">
  <thead>
    <tr>
      
      <th scope="col">Product Name</th>
      <th scope="col">Image</th>
      <th scope="col">Quantiy</th>
      <th scope="col">Rate</th>
      <th scope="col">Total Item Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="items in this.cart":key="items.id">
    
      <td>{{items.product_name}}</td>
      <td width="2.5px" height="10px"><img :src=items.image_url class="card-img-top" alt="..."  ></td>
      <td>{{items.quantity}}</td>
      <td>{{items.rate}}</td>
      <td>{{items.rate*items.quantity}}</td>
      <td><a @click="remove_to_Cart(items.product_id)" class="btn btn-primary" >remove to Cart</a></td>
    </tr>

   
    <tr>
      <th scope="col">#</th>
  
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col"> Total Bill Amount</th>
      <th scope="col">{{total_amount}}</th>
      <th scope="col"><a @click="buy()" class="btn btn-primary" >Buy</a></th>
      
      
    </tr>
   
  </tbody>
</table>
                          </div>
      `,
    data(){
      return{
        user:[],
        products:[],
        Categorys:[],
        cart:[],
        cat_id:[],
        total_amount:0,
        b_id:null
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
                                                                 
  
  
                                                                fetch(`http://127.0.0.1:5000/api/cart/${this.user.id}`,
                                                                {
                                                                  method:"GET",
                                                                  headers:{
                                                                    "content-type":"application/json",
                                                                    "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
                                                            
                                                                  },
                                                                  //body: JSON.stringify(data)
                                                                })
                                                                .then(res=>res.json()).then(info=>
                                                                  {this.cart=info
                                                                    for(let c in this.cart){
                                                                        
                                                                        console.log(this.cart[c].quantity*this.cart[c].rate)
                                                                        this.total_amount=this.total_amount+(this.cart[c].quantity*this.cart[c].rate)
                                                                        
                                                              }
                                                                
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
      async add_to_Cart(a,b,c,d,e) {
        const newcart = {
  
          product_name : a,
          quantity : b,
          description : c,
          image_url : d,
          user_id:this.user.id,
          rate:e
        };
        console.log(this.user.id)
        await fetch("http://127.0.0.1:5000/api/cart/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(newcart),//content which should be uploaded
          
        })
        .then(repo=>{
          console.log(localStorage.getItem("access_token"))
          this.$router.go(0)
          console.log("back to space")
        })
      },
      home(){
        console.log("done")
        this.$router.push("/user_homE")
      },
      go_to_search(){
    
        this.$router.push(`/user_search/${this.user.id}`)
      },
   
      go_to_cart(){
      
        this.$router.push(`/user_cart/${this.user.id}`)
      },
      remove_to_Cart(id){
      
       
        fetch(`http://127.0.0.1:5000/api/cart/${id}`, {
                                                  method: "PATCH",
                                                  headers: {
                                                    "Content-Type": "application/json",
                                                    "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
                                                  },
                                                 //content which should be uploaded
                                                  
                                                })
                                                .then(repo=>{
                                                  console.log(repo)
                                                 
                                                  fetch(`http://127.0.0.1:5000/api/cart/${this.user.id}`,
                                                  {
                                                    method:"GET",
                                                    headers:{
                                                      "content-type":"application/json",
                                                      "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
                                              
                                                    },
                                                    //body: JSON.stringify(data)
                                                  })
                                                  .then(res=>res.json()).then(info=>
                                                    {this.cart=info
                                                      for(let c in this.cart){
                                                          
                                                          console.log(this.cart[c].quantity*this.cart[c].rate)
                                                          this.total_amount=this.total_amount+(this.cart[c].quantity*this.cart[c].rate)
                                                          
                                                }
                                                  
                                                  })
                                                  console.log("back to space")
                                                })
      },
      async buy() {
        fetch(`http://127.0.0.1:5000/pdfs/${this.user.id}`)
        const newbill = {
          
          total : this.total_amount,
          user_id:this.user.id,
        };
        if(this.total_amount==0){alert("Add Something in Cart")}
        fetch(`http://127.0.0.1:5000/product_bill/${this.user.id}`)
        console.log(this.total_amount)
        console.log(this.total_amount)
        await fetch("http://127.0.0.1:5000/api/bill/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(newbill),//content which should be uploaded
          
        })
        .then(repo=>{
          console.log(repo)
          fetch(`http://127.0.0.1:5000/api/bill/${this.user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
          }
          
        })
        .then(res=>res.json()).then(info=>
          {
           
           const bills=info
          for ( let i in  bills){
            if (bills[i].user_id==this.user.id && bills[i].total==this.total_amount){
              this.b_id=bills[i].id
              
            }
          }
          console.log(this.b_id)
          
          for ( let i in  this.cart){
            const orders = {
    
              product_name : this.cart[i].product_name,
             
             
             
      
              quantity :this.cart[i].quantity,
          
              store_id:this.cart[i].store_id,
              rate:this.cart[i].rate,
              product_id:this.cart[i].product_id,
              category_id:this.cart[i].category_id,
              bill_id:this.b_id
             
            };
            console.log(this.b_id)
             fetch("http://127.0.0.1:5000/api/order/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
              },
              body: JSON.stringify(orders),
              //content which should be uploaded   
             
            
            })
           
              
            
      
          }
        
         
        ////////////////////////

        
        
        
        
        }).then(
         // fetch(`http://127.0.0.1:5000/pdfs/${this.user.id}`))
           // ).then(
              //content which should be uploaded   
        fetch(`http://127.0.0.1:5000/api/cart/${this.user.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
          }}) .then(res=>res.json()).then(info=>{console.log(info)
          
              //console.log(info)
     
              this.$router.go(0)
          
          
          }))

          //fetch(`http://127.0.0.1:5000/pdfs/${this.user.id}`,
          //{
            //method:"GET",
            //headers:{
             // "content-type":"application/json",
              ///"Authorization":`Bearer ${localStorage.getItem("access_token")}`,
      
         //   }}).then(this.$router.go(0))
      
          //)))
      
      
      
      })
        
          
         
},
    }
  });
  
  export default user_Cart;