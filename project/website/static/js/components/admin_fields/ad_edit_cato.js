const ad_Edit_cato  = Vue.component("home", {
    template: `
                        
    <div  >
                                                             
                                                              <!-- Page Header -->
                                                              <header class="masthead" style="background-image: url('/static/assets/img/home-bg.jpg')">
                                                                      <div class="container position-relative px-4 px-lg-5">
                                                                              <div class="row gx-4 gx-lg-5 justify-content-center">
                                                                                      <div class="col-md-10 col-lg-8 col-xl-7">
                                                                                              <div class="page-heading">
                                                                                                 
                                                              <button type="button" class="btn btn-primary" >            <a @click="home()" class="pt-3">HOME</a>  </button>
                                                                                                      <h1>EDIT CATEGORY</h1>
                                                                                                      <div class="float-container">              
                                        
                    
                    <div class="float-container"   style="text-align: center;">
                                            
                                                   
                    <div class="card mb-7 box-shadow"  >
                    <div class="card-body"   >
                    
                  
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
                                  <button type="button" class="btn btn-primary" @click="editCategory()">Submit</button>
                        </form>
                        <div>
                        </div>
  
                         
                         
                              </div>
                          </div>
                    </div>
  
                  
                      </div>
                    </div>
                                                                                                      <span class="subheading">THIS PAGE IS TO EDIT CATEGORY</span>
                                                                                                              
                                                                                              
                                                                                              </div>
                                                                                              
                                                                                      </div>
                                                                              </div>
                                                                      </div>  
                                                                           
                                                              </header>                 
                                         
  
         
  
               
                          <!---------------------------------------------------------->
                       
                  
                          
                                        
                                        
                                      
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
        admin_req:[]
  
      }
    },
  
  
    methods : {
      async editCategory() {
        this.cato_id=this.$route.params.id
        console.log(this.cato_id,"ji")
        const newCategory = {
  
          Category_name : this.categoryName,
          description : this.description,
          image_url : this.imageURL,
          admin_seen:1,
          admin_per:1,
          man_seen:0,
          man_per:0,
        };
        
        await fetch(`http://127.0.0.1:5000/api/cato/${this.cato_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(newCategory),//content which should be uploaded
          
        })
        .then(repo=>{
          console.log(repo)
          const newProduct = {
  
            allow:0,

          };
           fetch(`http://127.0.0.1:5000/api/pro/${this.cato_id}`, {
            method: "PATCH",
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
          })
          this.$router.go(0)
          console.log("back to space")
        }).catch(err=>{
            console.log(err)
        })
      },
      home(){
        console.log("done")
        this.$router.push("/admin_homE")
      },

    
    }
  });
  
  export default ad_Edit_cato ;