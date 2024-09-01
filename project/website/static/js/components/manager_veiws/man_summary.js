const man_summary  = Vue.component("home", {
    template: `
                                                    
    <div  >
    
   
                    
                                                              <!-- Page Header -->
                                               
                                                              <div>
                                                              {{user}}
                                                              {{sale}}
                                                              <br>
                                                              <img src="/static/assets/img/bar_chart.png">
                                                              <img src="/static/assets/img/pie_chart.png">
                                                              </div>
                                                  
                          <!---------------------------------------------------------->
                          <button  @click="cvs(user.id)" class="btn btn-primary" > generate csv  </button>
                          <div class="float-container" style="text-align: center;">
                                                              <div class="row">
                                                              
                                                                <div class="col-12 text-center">
                                                                                  
                                                          
                                                                  <h4 class="pt-3">Pending Delivery</h4>
                                                                  
                                                                </div>
                                                              </div>
                                                              <div class="row">
                                                                <div v-for="cato in this.sale":key="cato.id" class="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
                                                                <div class="container px-4 px-lg-5" style="text-align: center;">
                                                              
                                                                                                                                                          <div class="row gx-6 gxlg-7 justify-content-center">
                                                                                                                                                              <div class="col-md-8 col-lg-10 col-xl-10">    
                                                                                                                                                              <!-- Post preview-->
                                                                                                                                                              
                                                                                                                                                              
                                                                                                                                                              
                                                                                                                                                                  <div  class="card" style="text-align: center;">
                                                                                                                                                                     
                                                                                                                                                                  <a >
  
                                                                                                                                                                          <h2 class="post-title" @click="go_in_cato(cato.id)">{{cato.product_name}}  X  {{cato.quantity}}</h2>
                                                                                                                                                                          
                                                                                                                                                                          
                                                                                                                                                                      </a>
                                                                                                                                                                     
                                                                                                                                                                      
                                                                                                                                                                   
  
                                                                                                                                                                      
                                                                                                                                                                
                                                                                                                                                                   
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
        data:[],
        sale:[],
        report2:[]
      
  
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
                                                        if(this.user.role=="user"){
                                                          this.$router.go(-1)}
                                                        //if(data==null){console.log("token/wrong")}
                                                               // refresh_get() 
                                                                //  console.log("ref_key",localStorage.getItem("refresh_token"))
  
                                                            //////////////
      if(localStorage.getItem("access_token")){
                                              
        console.log( " hai cat")
        console.log(this.user.id)
        document.title = "shop - Home";
        ///store
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
           
           
                this.data=info
                console.log(this.data)
                //product
                fetch(`http://127.0.0.1:5000/api/order/${this.data.id}`,
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
           
           
                this.sale=info
                console.log(this.sale)})
                //if(data==null){console.log("token/wrong")}
                       // refresh_get() 
                        //  console.log("ref_key",localStorage.getItem("refresh_token"))
                
                          //  }else{
                            //  this.pending_catos.push(this.Categorys[cato])
                         //     console.log("1")
                         //   }
             //     }         
                          
                
             fetch(`http://127.0.0.1:5000/api/report/${this.user.id}`)
    
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
    
      cvs(){
        fetch(`http://127.0.0.1:5000/sold_product_cvs/${this.user.id}`,
        {
          method:"GET",
          headers:{
            "content-type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
    
          },
          //body: JSON.stringify(data)
        }).then(console.log("Done"))
      },
   
    
    }
  });
  
  export default man_summary ;