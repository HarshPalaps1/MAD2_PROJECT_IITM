const Admin_Home = Vue.component("home", {
    template: `
    <div  >
                     
                                 <img src="/static/assets/img/ad_bar_chart.png">
                                 <img src="/static/assets/img/ad_pie_chart.png">

<!---------------------------------------------------------->
<button type="button" class="btn btn-primary" >            <a  href="http://127.0.0.1:5000/pdfs/1"class="pt-3">PDF REPORT</a>  </button>
                                                            
                                                                                                    
<div class="float-container" style="text-align: center;">
    <div class="row">
    
      <div class="col-12 text-center">
      <button type="button"  class="btn btn-primary" >HOME</a>  </button>
        <h4 class="pt-3">New Requests</h4>
        
      </div>
    </div>
    <div class="row">
      <div v-for="user in not_users":key="user.id" class="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
      <div  class="container px-4 px-lg-5" style="text-align: center;">
    
                                                                                                <div class="row gx-6 gxlg-7 justify-content-center">
                                                                                                    <div class="col-md-12 col-lg-10 col-xl-11">    
                                                                                                    <!-- Post preview-->
                                                                                                    
                                                                                                 
                                                                                                        <div  class="card" style="text-align: center;background-color: rgb(255, 204, 204">
                                                                                                           
                                                                                                        <a >

                                                                                                                <h2 class="post-title" >{{user.name}}</h2>
                                                                                                                
                                                                                                                
                                                                                                            </a>
                                                                                                           
                                                                                                            <p class="post-meta">
                                                                                                            {{1}}
                                                                                                           <!-- <img :src=cato.image_url class="card-img-top" alt="..." width="150px" height="350px">-->
                                                                                                            
                                                                                                          </carousel>
                                                                                                            <h3 class="post-subtitle">{{2}}</h3>
                                                                                                            {{3}}
                                                                                                            </p> 


                                                                                                            <div class="btn-group">                                            
                                                                                                            <a @click="shop_req(user.id,1,1)" class="btn btn-sm btn-outline-secondary" >Yes</a>
                                                                                                           
                                                                                                            <a @click="shop_req(user.id,1,0)" class="btn btn-sm btn-outline-secondary" >No</a>
                                                                                                           
                                                                                                            
                                                                                                          
                                                                                                           
                                                                                                          </div>
                                                                                                            
                                                                                                           
                                                                                                          
                                                                                                          <small class="text-muted">9 mins</small>
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

    <div class="row">
      <div v-for="store in users":key="store.id" class="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
      <div  class="container px-4 px-lg-5" style="text-align: center;">
    
                                                                                                <div class="row gx-6 gxlg-7 justify-content-center">
                                                                                                    <div class="col-md-12 col-lg-10 col-xl-11">    
                                                                                                    <!-- Post preview-->
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                        <div  class="card" style="text-align: center;">
                                                                                                           
                                                                                                        <a >

                                                                                                                <h2 class="post-title" @click="go_in_store(store.user_id)" >{{store.name}}</h2>
                                                                                                                
                                                                                                                
                                                                                                            </a>
                                                                                                           
                                                                                                           

                                                                                                            <div class="btn-group">                                            
                                                                                                            <a href="/list/view/" class="btn btn-sm btn-outline-secondary" >View </a>
                                                                                                            <a href="/delete/list/" class="btn btn-sm btn-outline-secondary" >Delete </a>
                                                                                                            <div>
                                                                                                            <a href="/list/" class="btn btn-sm btn-outline-secondary" > Edit list and card </a>
                                                                                                            </div>
                                                                                                          </div>
                                                                                                           
                                                                                                          
                                                                                                          <small class="text-muted">9 mins</small>
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
        all:[],
        users:[],
        not_users:[]
      }
    },
    mounted: function () {
      if(localStorage.getItem("access_token")){
        fetch(`http://127.0.0.1:5000/api/admin/report`)
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
                                                        console.log("we got data",this.user.role=="admin")
                                                        fetch(`http://127.0.0.1:5000/all/api/store`,
                                                        {
                                                        method:"POST",
                                                        headers:{
                                                            "content-type":"application/json",
                                                            "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
                                
                                                        },
                                                        //body: JSON.stringify(data)
                                                        })
                                                        .then(res=>res.json()).then(data=>
                                                        {this.all=data
                                                          fetch(`http://127.0.0.1:5000/api/admin/report/${this.users.id}`)
                                                          for(let user in this.all){
                                                          
                                                           
                                                              if(!this.all[user].admin_per&&!this.all[user].admin_seen){
                                                                this.not_users.push(this.all[user])
                                                               // console.log("1")
                                                              }else{
                                                                //console.log("2")
                                                                this.users.push(this.all[user])
                                                              }
                                                           // }
                                                          }
                                                        })
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
    methods:{
      async shop_req(id,as,ap){
        console.log(id)
       
          const up_str = {
            
            admin_seen:as,
            admin_per:ap
            
          };
    
          await fetch(`http://127.0.0.1:5000/api/store/${id}`, {
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
      go_in_store(cato_id){
        console.warn(cato_id)
        this.$router.push(`/admin_categorY/${cato_id}`)
      },
      go_to_man(){
        console.log("done")
        this.$router.push("/store_name")
      },
    },

  });
  
  export default Admin_Home;
  