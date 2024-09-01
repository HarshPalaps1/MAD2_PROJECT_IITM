const manager_category = Vue.component("category", {
    template: `
                  <div>
                         
                          <!-- Page Header -->
                          <header class="masthead" style="background-image: url('/static/assets/img/maxresdefault.jpg')">
                                  <div class="container position-relative px-4 px-lg-5">
                                          <div class="row gx-4 gx-lg-5 justify-content-center">
                                                  <div class="col-md-10 col-lg-8 col-xl-7">
                                                          <div class="page-heading">
                                                                  
                                                               
                                                                  <div class="float-container">              
    

<div class="float-container"   style="text-align: center;">
        
               
<div class="card mb-7 box-shadow"  >
<div class="card-body"   >
<p class="card-text">
<h4 class="pt-8">Add Products</h4>
</p>

<div class="btn-group align-items-center ">
<form style="align-items: center;"  >
<div class="form-group ">
<label>product Name</label>
<input type="text" class="form-control" v-model="product_name" required>
</div>
<div class="form-group">
<label>Description</label>
<input type="text" class="form-control" v-model="description" required>
</div>
<div class="form-group">
<label>ImageURL</label>
<input type="url" class="form-control" v-model="imageURL" required>
</div>
<div class="form-group">
<label>Quantity</label>
<input type="number" class="form-control" v-model="quantity" required>
</div>
<div class="form-group">
<label>Rate</label>
<input type="number" class="form-control" v-model="Rate" required>
</div>
</br>
<button type="button" class="btn btn-primary" @click="additem()">Submit</button>
</form>
<div>
</div>



</div>
</div>
</div>


</div>
</div>
                                                                  <span class="subheading">Have questions? I have answers.</span>
                                                                          
                                                          
                                                          </div>
                                                          
                                                  </div>
                                          </div>
                                  </div>  
                                       
                          </header>                 
     

                          <!------------------------------------------------------------------------->
                                                                         <div class="container">
                                                                        <h1 class="text-center p-5">Our Products</h1>
                                                                        <div class="row">
                                                                            
                                                                            <div v-for="item in items":key="item.id"   style="text-align: center;"  class="col-md-3">
                                                                                <div  class="card product-item">
                                                                                <img :src=item.image_url class="card-img-top" alt="..." width="150px" height="250px">
                                                                                        <div class="card-body">
                                                                                        <h5 class="card-title">{{item.product_name}}</h5>
                                                                                        <h5 class="card-title">Quantity {{item.quantity}}</h5>
                                                                                        <h5 class="card-title">Price ₹{{item.rate}}</h5>
                                                                                        <p class="card-text">
                                                                                        {{item.description}}
                                                                                        </p>  
                                                                                                                                                                                                            
                                                                                            
                                                                                            <div> 
                                                                                            <a @click=" delete_pro(item.id)" class="btn btn-sm btn-outline-secondary" >Delete </a>
                                                                                           
                                                                                            <a @click=" go_in_edit(item.id)" class="btn btn-sm btn-outline-secondary" > Edit list and card </a>
                                                                                            </div>
                                                                                          </div>
                                                                                          
                                                                                          
                                                                                      </div> 
                                                                                        </div>
                                                                                        </br>
                                                                                    </div>
                                                                                    </br>
                                                                            </div>
                                                                            </br>

                                                                            
                                                                            
      </div>
      
      </div>            
      `,
    data(){
      return{
        user:[],
        product_name : null,
        quantity:null,
        description : null,
        imageURL : null,
        cato_id:null,
        Rate:null,
        items:[]
      }
    },
    mounted: function () {
      this.cato_id=this.$route.params.id
      console.log( this.cato_id)
      if(localStorage.getItem("access_token")){
                                              
                                                console.log( " hai bhai")
                                                console.log(localStorage.getItem("access_token"))
                                                document.title = "shop - Home";
                                                
                                                fetch(`http://127.0.0.1:5000/api/pro/${this.cato_id}`,
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
                                                        this.items=info
                                                        console.log(info)
                                                        console.log("we got data",this.user.role=="manager")
                                                        if(this.user.role=="user"){
                                                          this.$router.go(-1)}
                                                        //if(data==null){console.log("token/wrong")}
                                                               // refresh_get() 
                                                                //  console.log("ref_key",localStorage.getItem("refresh_token"))
                                                                 
                                                        }
                                            
                                                  })
                                                .catch(error=>{
                                                  console.log(error)
                                                })
      }else{
        console.log("nahi hai bhai")
        alert(" please log in ")
        this.$router.push("/sign_iN")
      }

     
    },
    methods : {
      async additem() {
        const newProduct = {
          product_name : this.product_name,
          quantity : this.quantity,
          description : this.description,
          image_url : this.imageURL,
          category_id:this.cato_id,
          allow:1,
          rate:this.Rate
        };
        if ( this.quantity==null||this.cato_id==null||this.Rate==null||this.product_name==null||this.description==null||this.imageURL==null){alert("please fill all detials ")}
        await fetch(`http://127.0.0.1:5000/api/pro`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(newProduct),//content which should be uploaded
          
        })
        .then(repo=>{
          console.log(repo)
          this.$router.go(0)
          console.log("back to space")
        }).then(
          fetch(`http://127.0.0.1:5000/info/${this.user.name}/${this.product_name}`)
            )
      },
      async delete_pro(id) {
      
       // console.log(id)
        await fetch(`http://127.0.0.1:5000/api/pro/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
          },
  
          
        })
        .then(repo=>{
          console.log(localStorage.getItem("access_token"))
          this.$router.go(0)
          console.log("back to space")
        }).catch(err=>{alert(err)})
      },
      go_in_edit(id){
        console.warn(id)
        this.$router.push(`/edit_producT/${id}`)
      },
      //go_in_cato(cato_id){
     //   console.warn(cato_id)
     //   this.$router.push(`/manager_categorE/${cato_id}`)
     // },
    
    }
  });
  
  export default manager_category;