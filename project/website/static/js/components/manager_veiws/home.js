const manager_Home  = Vue.component("home", {
  template: `
                
  <div  >
                                                           
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
                                  <h4 class="pt-8">Add new Category</h4>
                    </p>
                
                <div class="btn-group align-items-center ">
                <form style="align-items: center;"  >
                      <div class="form-group ">
                        <label>Category Name</label>
                        <input type="text" class="form-control" v-model="categoryName" required>
                      </div>
                      <div class="form-group">
                        <label>Description</label>
                        <input type="text" class="form-control" v-model="description" required>
                      </div>
                        <div class="form-group">
                          <label>ImageURL</label>
                          <input type="url" class="form-control" v-model="imageURL" required>
                        </div>
                        </br>
                                <button type="button" class="btn btn-primary" @click="addCategory">Submit</button>
                      </form>
                      <div>
                      </div>

                       
                       
                            </div>
                        </div>
                  </div>

                
                    </div>
                  </div>
                                                                                                    <span class="subheading">You can add category from here!!!</span>
                                                                                                            
                                                                                            
                                                                                            </div>
                                                                                            
                                                                                    </div>
                                                                            </div>
                                                                    </div>  
                                                                         
                                                            </header>                 
                                       

       

             
                        <!---------------------------------------------------------->
                   
                
                        <div class="float-container" style="text-align: center;">
                                                            <div class="row">
                                                            <div class="col-12 text-center">
                                                           
                                                            
                                                        
                                                            <button type="button" class="btn btn-primary" >            <a @click="go_to_pending()" class="pt-3">PENDING_REQUEST</a>  </button>
                                                          <button type="button" class="btn btn-primary" >           <a @click="go_to_rejected()"class="pt-3">REJECTED_REQUEST</a> </button>                  
                                                          <button type="button" class="btn btn-primary" >            <a @click="go_to_admin()" class="pt-3">ADMIN_REQUEST</a>  </button>
                                                          <button type="button" class="btn btn-primary" >            <a @click="go_to_sum()" class="pt-3">REPORT</a>  </button>
                                                            
                                                          </div>
                                                              <div class="col-12 text-center">
                                                                <h4 class="pt-3">Our Categories</h4>
                                                                
                                                              </div>
                                                            </div>
                                                            <div class="row">
                                                              <div v-for="cato in this.catos":key="cato.id" class="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
                                                              <div class="container px-4 px-lg-5" style="text-align: center;">
                                                            
                                                                                                                                                        <div class="row gx-6 gxlg-7 justify-content-center">
                                                                                                                                                            <div class="col-md-8 col-lg-10 col-xl-10">    
                                                                                                                                                            <!-- Post preview-->
                                                                                                                                                            
                                                                                                                                                            
                                                                                                                                                            
                                                                                                                                                                <div  class="card" style="text-align: center;">
                                                                                                                                                                   
                                                                                                                                                                <a >

                                                                                                                                                                        <h2 class="post-title" @click="go_in_cato(cato.id)">{{cato.Category_name}}</h2>
                                                                                                                                                                        
                                                                                                                                                                        
                                                                                                                                                                    </a>
                                                                                                                                                                   
                                                                                                                                                                    <p class="post-meta">
                                                                                                                                                                   
                                                                                                                                                                    <img :src=cato.image_url class="card-img-top" alt="..." width="150px" height="250px">
                                                                                                                                                                    
                                                                                                                                                                  </carousel>
                                                                                                                                                                    <h3 class="post-subtitle">{{cato.description}}</h3>
                                                                                                                                                                 
                                                                                                                                                                    </p> 

                                                                                                                                                                    
                                                                                                                                                                <div class="btn-group">  
                                                                                                                                                                                                            
                                                                                                                                                              
                                                                                                                                                                    <div> 
                                                                                                                                                                    <a @click=" delete_cato(cato.id)" class="btn btn-sm btn-outline-secondary" >Delete </a>
                                                                                                                                                                    </div>
                                                                                                                                                                    <div>
                                                                                                                                                                    <a @click=" go_in_edit(cato.id)" class="btn btn-sm btn-outline-secondary" > Edit list and card </a>
                                                                                                                                                                    </div>
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
                                                              </br>
                                                            </div>
                                                            </br>
                                                          </div>
                                                            
                
                      


                                     
                                      
                                      
                                      
                                    
                  </div>


    `,
  data(){
    return{
      user:[],
      categoryName : null,
      description : null,
      imageURL : null,
      Categorys:[],
      not_catos:[],
      catos:[],
      pending_catos:[],
      admin_req:[],
    

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
                                                      console.log("we got data",this.user.role!="manager")
                                                      if(this.user.role=="user"){
                                                        this.$router.go(-1)

                                                      }
                                                      //if(data==null){console.log("token/wrong")}
                                                             // refresh_get() 
                                                              //  console.log("ref_key",localStorage.getItem("refresh_token"))

                                                          //////////////
    if(localStorage.getItem("access_token")){
                                            
      console.log( " hai cat")
      console.log(this.user.id)
      document.title = "shop - Home";
      
      fetch(`http://127.0.0.1:5000/api/cato/${this.user.id}`,
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
              this.Categorys=info
              console.log("we got data",this.Categorys)
              //if(data==null){console.log("token/wrong")}
                     // refresh_get() 
                      //  console.log("ref_key",localStorage.getItem("refresh_token"))
                                         
                      for(let cato in this.Categorys){
                          
                           
                        if(this.Categorys[cato].admin_seen){
                          console.log("1")
                          if(this.Categorys[cato].admin_per){
                            console.log("2")
                            if(!this.Categorys[cato].man_per){
                              console.log("3")
                              this.admin_req.push(this.Categorys[cato]) }
                              else{
                                console.log("4")
                                this.catos.push(this.Categorys[cato])
                              }
                            }else{
                              this.not_catos.push(this.Categorys[cato])
                            }
                          
                        }else{
                          this.pending_catos.push(this.Categorys[cato])
                          console.log("1")
                        }
              }
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
    async addCategory() {
      if (this.categoryName==null||this.description==null||this.imageURL==null){alert("please fill all detials ")}
      else{
      const newCategory = {

        Category_name : this.categoryName,
        description : this.description,
        image_url : this.imageURL,
        admin_seen:0,
        admin_per:0,
        man_seen:1,
        man_per:1,
      };

      await fetch("http://127.0.0.1:5000/api/cato/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(newCategory),//content which should be uploaded
        
      })
      .then(repo=>{
        console.log(localStorage.getItem("access_token"))
        this.$router.go(0)
        console.log("back to space")
      }).then(
        fetch(`http://127.0.0.1:5000/info/${this.user.name}/${this.categoryName}`)
          ).catch("somthing")}
    },
    async delete_cato(cato_id) {
      

      await fetch(`http://127.0.0.1:5000/api/cato/${cato_id}`, {
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

    go_in_cato(cato_id){
      console.warn(cato_id)
      this.$router.push(`/manager_categorE/${cato_id}`)
    },
    go_in_edit(cato_id){
      console.warn(cato_id)
      this.$router.push(`/edit_categorE/${cato_id}`)
    },
    go_to_main(){
      console.log("done")
      this.$router.push(`/manager_homE`)
    },
    go_to_pending(){
      console.log("done")
      this.$router.push(`/pending_homE`)
    },
    go_to_rejected(){
      console.log("done")
      this.$router.push(`/rejected_homE`)
    },
    go_to_admin(){
      console.log("done")
      this.$router.push(`/admin_req_homE`)
    },
    go_to_sum(){
      console.log("done")
      this.$router.push(`/man_summary/${this.user.id}`)
    },
  
  }
});

export default manager_Home ;