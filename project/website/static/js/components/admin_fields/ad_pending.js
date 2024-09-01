const Admin_pending  = Vue.component("home", {
    template: `
                        
    <div  >
                                                             
                                                              <!-- Page Header -->
                                                              <header class="masthead" style="background-image: url('/static/assets/img/home-bg.jpg')">
                                                                      <div class="container position-relative px-4 px-lg-5">
                                                                              <div class="row gx-4 gx-lg-5 justify-content-center">
                                                                                      <div class="col-md-10 col-lg-8 col-xl-7">
                                                                                              <div class="page-heading">
                                                                                                    
                                                                                                      all{{this.Categorys}}


                                                                                                      
                                                                                                      rejected {{this.not_catos}}
                                                                                                      agree {{this.catos}}
                                                                                                      pending  {{this.pending_catos}}
                                                                                                      man_req{{this.man_req}}
                                                                                                      <h1>SIGN IN</h1>
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
                                                                                                      <span class="subheading">Have questions? I have answers.</span>
                                                                                                              
                                                                                              
                                                                                              </div>
                                                                                              
                                                                                      </div>
                                                                              </div>
                                                                      </div>  
                                                                           
                                                              </header>                 
                                         
  
                                                              <button type="button" class="btn btn-primary" >            <a @click="go_to_accepted()" class="pt-3">ACCEPTED_REQUEST</a>  </button>
                                                              <button type="button" class="btn btn-primary" >            <a @click="go_to_pending()" class="pt-3">PENDING_REQUEST</a>  </button>
                                                              <button type="button" class="btn btn-primary" >           <a @click="go_to_rejected()"class="pt-3">REJECTED_REQUEST</a></h4>  </button>                  
                                                              <button type="button" class="btn btn-primary" >            <a @click="go_to_man()" class="pt-3">MANAGER_REQUEST</a>  </button>
                                                              
                                                        

                                                              <div class="float-container" style="text-align: center;">
                                                              <div class="row">
                                                              
                                                                <div class="col-12 text-center">
                                                                  <h4 class="pt-3">New Requests</h4>
                                                                  
                                                                </div>
                                                              </div>
                                                              <div class="row">
                                                                <div v-for="cato in pending_catos":key="cato.id" class="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
                                                                <div  class="container px-4 px-lg-5" style="text-align: center;">
                                                              
                                                                                                                                                          <div class="row gx-6 gxlg-7 justify-content-center">
                                                                                                                                                              <div class="col-md-12 col-lg-10 col-xl-11">    
                                                                                                                                                              <!-- Post preview-->
                                                                                                                                                              
                                                                                                                                                              
                                                                                                                                                              
                                                                                                                                                                  <div  class="card" style="text-align: center;background-color: rgb(255, 204, 204">
                                                                                                                                                                  
                                                                                                                                                                  <a >
  
                                                                                                                                                                          <h2 class="post-title" @click="go_in_cato(cato.id)">{{cato.Category_name}}</h2>
                                                                                                                                                                          
                                                                                                                                                                          
                                                                                                                                                                      </a>
                                                                                                                                                                     
                                                                                                                                                                      <p class="post-meta">
                                                                                                                                                                     
                                                                                                                                                                      <img :src=cato.image_url class="card-img-top" alt="..." width="150px" height="350px">
                                                                                                                                                                      
                                                                                                                                                                    </carousel>
                                                                                                                                                                      {{cato.description}}
                                                                                                                                                                   
                                                                                                                                                                      </p>
                                                                                                                                                                      <div class="btn-group">                                            
                                                                                                                                                                      <a @click="cato_req(cato.id,1,1,1,1)" class="btn btn-sm btn-outline-secondary" >Yes</a>
                                                                                                                                                                     
                                                                                                                                                                      <a @click="cato_req(cato.id,1,0,1,1)" class="btn btn-sm btn-outline-secondary" >No</a>
                                                                                                                                                                     
                                                                                                                                                                      
                                                                                                            
                                                                                                                                                                     
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
        cato_id:null,
        
        all:[],
        catos:[],
        not_catos:[],
        pending_catos:[],
        man_req:[],
        email_id:null
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
      //////////////
      if(localStorage.getItem("access_token")){
                                              
        console.log( " hai cat")
        console.log(localStorage.getItem("access_token"))
        document.title = "shop - Home";
        this.cato_id=this.$route.params.id
        console.log(this.cato_id)
        fetch(`http://127.0.0.1:5000/api/cato/${this.cato_id}`,
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
                          
                           
                          if(this.Categorys[cato].man_seen){
                            console.log("1")
                            if(this.Categorys[cato].man_per){
                              console.log("2")
                              if(this.Categorys[cato].admin_per){
                                console.log("3")
                                this.man_req.push(this.Categorys[cato]) }
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
     
    },
    methods : {
      async addCategory() {
        this.email_id=this.$route.params.id
      console.log( this.email_id)
        const newCategory = {
  
          Category_name : this.categoryName,
          description : this.description,
          image_url : this.imageURL,
          admin_seen:1,
          admin_per:1,
          man_seen:0,
          man_per:0,
        };
  
        await fetch(`http://127.0.0.1:5000/api/cato/`, {
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
        })
      },
      go_in_cato(cato_id){
        console.warn(cato_id)
        this.$router.push(`/manager_categorE/${cato_id}`)
      },
      async cato_req(id,as,ap,ms,mp){
        console.log(id)
       
          const up_str = {
            
            admin_seen:as,
            admin_per:ap,
            man_seen:ms,
            man_per:mp
            
          };
    
          await fetch(`http://127.0.0.1:5000/api/cato/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify(up_str),//content which should be uploaded
            
          })
          .then(repo=>{
            console.log(localStorage.getItem("access_token"))
            this.$router.go(0)
            console.log("back to space")
          })
       
      },
      go_to_man(){
        console.log("done")
        this.cato_id=this.$route.params.id
        console.log(this.cato_id)
        this.$router.push(`/man_reQ/${this.cato_id}`)
      },
      go_to_pending(){
        console.log("done")
        this.$router.push(`/admin_pending/${this.cato_id}`)
      },
      go_to_rejected(){
        console.log("done")
        this.$router.push(`/admin_rejecY/${this.cato_id}`)
      },
      go_to_accepted(){
        console.log("done")
        this.cato_id=this.$route.params.id
        console.log(this.cato_id)
        this.$router.push(`/admin_categorY/${this.cato_id}`)
      },
    }
  });
  
  export default Admin_pending ;