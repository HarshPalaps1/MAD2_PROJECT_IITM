const User_Search = Vue.component("home", {
    template: `
                  <div>
                 
                                 {{data}}                                          
                  <!-- Page Header -->
                  <div>
                  <header class="masthead" style="background-image: url('/static/assets/img/r3_537_5614_3707_w1200_h678_fmax.jpg')">
                  
            
                       
         
                  
                          <div class="container position-relative px-4 px-lg-5">
                                  <div class="row gx-4 gx-lg-5 justify-content-center">
                                          <div class="col-md-10 col-lg-8 col-xl-7">
                                                  <div class="page-heading">
                                                       
                                                          <h1>SERACH PRODUCT</h1>
                                                          <div class="float-container">              


<div class="float-container"   style="text-align: center;">

       
<div class="card mb-7 box-shadow"  >
<div class="card-body"   >
<p class="card-text">
<h4 class="pt-8">Add new Category</h4>
</p>

<div class="btn-group align-items-center ">
<form style="align-items: center;"  >
<div class="form-group ">


<label>
<input type="radio" name="role" @click="search()" value="1" required>catogarys
</label>
<label>
<input type="radio" name="role" @click="search()" value="2">prices
</label>
<label></label>
<input   type="text" class="form-control" v-model="input_val"  list="programmingLanguages"   >
</div>


</br>
<button type="button" class="btn btn-primary" @click="display()" value="3" >Submit</button>
</form>
<div>
</div>



</div>
</div>
</div>


</div>
</div>
                                                          <span class="subheading">Find Wha you want</span>
                                                                  
                                                  
                                                  </div>
                                                  
                                          </div>
                                  </div>
                          </div>  
                               
                  </header>   
  
                          
                                   <datalist  id="programmingLanguages"> 
                                        <div v-if="pass1==1">
                                       <option  v-for="cato in list":key="cato.id"   >{{cato.Category_name}}</option> 
                                       </div>
                                       <div v-else-if="pass1=2">
                                        <option  v-for="cato in list":key="cato.id"   >{{cato.rate}}</option>
                                       </div>
                                       
                            </datalist> 
                       
                          
                   <div class="col-12 text-center">
                
             
                  
                 <button type="button" class="btn btn-primary" >           <a @click="home()"class="pt-3">HOME</a></h4>  </button>                  
                 <button type="button" class="btn btn-primary" >            <a @click="go_to_cart()" class="pt-3">CART</a>  </button>
                 
           
                   
                 </div>
                                                                                         <div class="container">
                                                                         <h1 class="text-center p-2">Our Products</h1>
                                                                         <div class="row">
                                                                             
                                                                         <div v-for="item in data":key="item.id" class="col-md-3">
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
        store_id:null,
        role:null,
        list:null,
        pass:null,
        pass1:null,
      
        input_val:null
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
                                                      this.data=[]
                                                      
                                                      console.log(this.input_val)
                                                      console.log(this.pass1)
                                                      if(this.pass1==1){
                                                          
                                              
                                                          for(let cato in this.Categorys){
                                                                          
                                                           if(this.Categorys[cato].Category_name==this.input_val){
                                                               let id =this.Categorys[cato].id
                                                               console.log(id)
                                                              for(let i in this.products){
                                                                  if(this.products[i].category_id==id){
                                                                      console.log(this.products[i])
                                                                      this.data.push(this.products[i])
                                                                  }
                                                              
                                              
                                                              }
                                                          }
                                                    }
                                                      }else if(this.pass1==2 ){
                                                        for(let cato in this.products){
                                                        if(this.products[cato].rate==this.input_val){
                                                          let id =this.products[cato].id
                                                          console.log(id)
                                                         for(let i in this.products){
                                                             if(this.products[i].id==id){
                                                                
                                                                 this.data.push(this.products[i])
                                                             }
                                                             else{
                                                                 this.data=[]  
                                                            }
                                              
                                                         }
                                                        
                                                        }
                                                      }
                                                      }
                                                      
                                                     
                                                     
                                                     
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
       home(){
        console.log("done")
        this.$router.push("/user_homE")
      },
      search(){
        const pass=event.target.value
        console.log(pass)
        if(pass==1){
            this.pass1= 1
        this.list=this.Categorys}
        else{
            this.pass1= 2
            this.list=this.products
        }
      },
      display(hi){
        this.data=[]
        this.pass=event.target.value.id
        console.log(this.input_val)
        console.log(this.pass1)
        if(this.pass1==1){
            

            for(let cato in this.Categorys){
                            
             if(this.Categorys[cato].Category_name==this.input_val){
                 let id =this.Categorys[cato].id
                 console.log(id)
                for(let i in this.products){
                    if(this.products[i].category_id==id){
                        console.log(this.products[i])
                        this.data.push(this.products[i])
                    }
                

                }
            }
      }
        }else if(this.pass1==2 ){
          for(let cato in this.products){
          if(this.products[cato].rate==this.input_val){
            let id =this.products[cato].id
            console.log(id)
           for(let i in this.products){
               if(this.products[i].id==id){
                  
                   this.data.push(this.products[i])
               }
               else{
                   this.data=[]  
              }

           }
          
          }
        }
        }
        //this.list=this.Categorys
      }
    }
  });
  
  export default User_Search;
  