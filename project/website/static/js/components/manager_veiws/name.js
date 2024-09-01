const Name  = Vue.component("home", {
  template: `
                      
  <div  >
                                                           
                                                            <!-- Page Header -->
                                                            <header class="masthead" style="background-image: url('/static/assets/img/sin.jpg')">
                                                                    <div class="container position-relative px-4 px-lg-5">
                                                                            <div class="row gx-4 gx-lg-5 justify-content-center">
                                                                                    <div class="col-md-10 col-lg-8 col-xl-7">
                                                                                            <div class="page-heading">
                                                                                                    {{store}}
                                                                                                    {{user}}
                                                                                                    <h1>Name</h1>
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
                        <label>Store Name</label>
                        <input type="text" class="form-control" v-model="storeName" required>
                      </div>
                     
                        </br>
                                <button type="button" class="btn btn-primary" @click="storename(user.id)">Submit</button>
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
                                       

       

             
                        <!---------------------------------------------------------->
                
                       
                      


                                     
                                      
                                      
                                      
                                    
                  </div>


    `,
  data(){
    return{
      user:[],
      storeName : null,
      store:[]
      
    }
  },

  mounted: function () {
     fetch(`http://127.0.0.1:5000/api/store`,
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
                                                      this.store=info
                                                      console.log(this.store)
                                                      //if(data==null){console.log("token/wrong")}
                                                             // refresh_get() 
                                                              //  console.log("ref_key",localStorage.getItem("refresh_token"))
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
                                                                        if(this.store.user_id==this.user.id){
                                                                          console.log(this.store.user_id)
                                                                          console.log(this.user.id)
                                                                          this.$router.push("/manager_homE")
                                                                        }
                                                                        console.log(this.store)
                                                                        console.log(this.user.id)//if(data==null){console.log("token/wrong")}
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
                                                               
                                                      }
                                          
                                                })
                                              .catch(error=>{
                                                console.log(error)
                                              })
    
    ////////////////





  },
  methods : {
    async storename(id) {
      const newCategory = {

        name : this.storeName,
        user_id : id,
        admin_seen :"0",
        admin_per:"0",
        man_seen:"1",
        man_per:"1",
        //user_id:user.id
      };

      await fetch("http://127.0.0.1:5000/api/store/", {
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
  
  }
});

export default Name ;