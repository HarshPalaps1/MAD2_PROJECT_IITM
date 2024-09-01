const anager_Home = Vue.component("home", {
    template: `
                  <div>
                                                           
                                                            <!-- Page Header -->
                                                            <header class="masthead" style="background-image: url('/static/assets/img/contact-bg.jpg')">
                                                                    <div class="container position-relative px-4 px-lg-5">
                                                                            <div class="row gx-4 gx-lg-5 justify-content-center">
                                                                                    <div class="col-md-10 col-lg-8 col-xl-7">
                                                                                            <div class="page-heading">
                                                                                                    
                                                                                                    <h1>SIGN IN</h1>
                                                                                                    <h2> Home Page  {{this.user}}</h2>
                                                                                                    <span class="subheading">Have questions? I have answers.</span>
                                                                                                            
                                                                                            
                                                                                            </div>
                                                                                            
                                                                                    </div>
                                                                            </div>
                                                                    </div>        
                                                            </header>                 
                                       
                            
                                                    
                  
                  
                                                            <!-- Main Content-->
                                                            
                                                            <div class="container px-4 px-lg-5">
                                                            
                                                                <div class="row gx-4 gx-lg-5 justify-content-center">
                                                                    <div class="col-md-10 col-lg-8 col-xl-7">    
                                                                    <!-- Post preview-->
                                                                        <div v-for="cato in Categorys":key="cato" class="post-preview">
                                                                            <a href="post.html">

                                                                                <h2 class="post-title">{{cato.Category_name}}</h2>
                                                                                <h3 class="post-subtitle">{{cato.description}}</h3>
                                                                            </a>
                                                                            <p class="post-meta">
                                                                                Posted by
                                                                                <button type="button" class="btn btn-primary" @click="addCategory">Submit</button>
                                                                                on September 24, 2022
                                                                            </p>
                                                                        </div>
                                                                        <!-- Divider-->
                                                                        <hr class="my-4" />
                                                                        <!-- Post preview-->
                                                                        <div class="post-preview">
                                                                            <a href="post.html"><h2 class="post-title">I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.</h2></a>
                                                                            <p class="post-meta">
                                                                                Posted by
                                                                                <a href="#!">Start Bootstrap</a>
                                                                                on September 18, 2022
                                                                            </p>
                                                                        </div>
                                                                        <!-- Divider-->
                                       
                                
                                          <div class="row" >
                                          <div class="album py-3 bg-light" >
                                          <div class="container"   style="text-align: center;">
                                            <div class="col-md-3" >
                                              <div class="card mb-7 box-shadow"  >
                                              <div class="card-body"  style="background-color: darkgreen;"  >
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
                                          </div>
                                          <div class="col-5"></div>
                                        </div>
                                      </div>
                                      </div>
                                      </div>
                                      </div>
                                      </div>
                                      </div>
                                      
                                    
                  </div>
      `,
    data(){
      return{
        user:[],
        categoryName : null,
        description : null,
        imageURL : null,
      
      }
    },
    methods : {
      async addCategory() {
        const newCategory = {
  
          Category_name : this.categoryName,
          description : this.description,
          image_url : this.imageURL,
          //user_id:user.id
        };
  
        await fetch("http://127.0.0.1:5000/api/cato/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(newCategory),//content which should be uploaded
          
        })
        .then(repo=>{console.log(localStorage.getItem("access_token"))})
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
                                                                  if(this.user.role=="user"){
                                                                    this.$router.go(-1)}
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
  }


});
  
  export default anager_Home;
  