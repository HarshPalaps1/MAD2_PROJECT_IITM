const Sign_in = Vue.component("SIGN_IN", {
  template: `
  <div>
          <!-- Page Header -->
          <header class="masthead" style="background-image: url('/static/assets/img/sin.jpg')">
                  <div class="container position-relative px-4 px-lg-5">
                          <div class="row gx-4 gx-lg-5 justify-content-center">
                                  <div class="col-md-10 col-lg-8 col-xl-7">
                                          <div class="page-heading">
                                                  
                                                  <h1>  <br><button type="submit" class="btn btn-primary" @click="signup()" >Signup</button></br></h1>
                                                  <span>if you already member of our app go below</span>
                                                          
                                          
                                          </div>
                                  </div>
                          </div>
                  </div>        
          </header>
          



          <!-- Main Content -->
          
          <div class="container px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
           <div class="col-md-10 col-lg-8 col-xl-7">
                                <p>Welcome user hope  this app make your life easy!!!</p>
                              
                            <!-- Contact Form - Enter your email address on line 19 of the mail/contact_me.php file to make this form work. -->
                            <!-- WARNING: Some web hosts do not allow emails to be sent through forms to common mail hosts like Gmail or Yahoo. It's recommended that you use a private domain email address! -->
                            <!-- To use the contact form, your site must be on a live web host with PHP! The form will not work locally! -->


                              <div class="my-5">
                                <div class="div-center">
                                  <div class="content">
                                    <h3>SignIn</h3>
                                    <hr/>
                                    <form @submit.prevent="Signin()" id="contactForm">
            
                                          <div class="form-floating">
                                                 
                                                          <input  v-model="email" class="form-control" id="eg_email" type="email" placeholder="Enter your email..." data-sb-validations="required,email" />    
                                                          <label for="eg_email">Email</label>
                                                          <div class="invalid-feedback" data-sb-feedback="eg_email:required">An email is required.</div>
                                                          <div class="invalid-feedback" data-sb-feedback="eg_email:email">Email is not valid.</div>
  
                                                  
                                          </div>
                                     

                                          <div class="form-floating">
                                                  
                                                          
                                                          <input class="form-control" type="password"  id="exampleInputPassword1" placeholder="Password" v-model="password">
                                                          <label for="exampleInputPassword1">Password</label>
                                                          <div class="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                                                          
                                          </div>   


                                      
                                          
                                                  
                                                  <button type="submit" class="btn btn-primary"  >Signin</button>
                                          

                                      
                                       
                                    </form>
                                    <hr>
                                  </div>
                                </div>
                              </div>
                              </div>
                            
                </div>
              </div>              
            </div>
          

`,
  data: function() {
  return {
    
      email: null, // Change from 'Username' to 'username'
      password: null,
          info:[],
      ans:null,    
    
  }},
  mounted: function () {
    if(localStorage.getItem("access_token")!=null){
      this.$router.push("/")
                  }},

  methods :{
    refresh_get: function() {
      fetch("http://127.0.0.1:5000/api/user/refresh",
      {
        method:"GET",
        headers:{
          "content-type":"application/json",
          Authorization:`Bearer  ${localStorage.getItem("refresh_token")}`
        }.then(tok=>{
          console.log(tok)
        })
  
    })
    },
    signup(){
    this.$router.push("/Sign_Up")
    },

  Signin() {
        console.log("if check 1",localStorage.getItem("access_token")==null)
         if(localStorage.getItem("access_token")==null){
                console.log("token not present any where")
                
                fetch(`http://127.0.0.1:5000/access/api/user/${this.email}/${this.password}`,
                {
                  method:"GET",
                  headers:{
                    "content-type":"application/json",
                     // Authorization:`Bearer  ${localStorage.getItem("access_token")}`
                  }
                })
                .then(result=>result.json())
                .then(respo =>{
                              console.log("if check 1 pass ")
                              this.info=respo
                              console.log(respo.a_token)
                              if(this.info.msg){
                                                  console.log(this.info.msg)
                                                  alert("Either Email or Password is wrong ")
                                                  this.$router.go(0)
                              }else{
                                localStorage.setItem("access_token",this.info.a_token)
                                localStorage.setItem("refresh_token",this.info.r_token)
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
                                        console.log(info.role)
                                        if( info.role=="manager"){
                                          console.log(info.role)
                                          this.$router.push("/store_name")
                                        
                                        } else if ( info.role=="user"){
                                          console.log(info.role)
                                          this.$router.push("/user_homE")
                                        }
                                        else if ( info.role=="admin"){
                                          console.log(info.role)
                                          this.$router.push("/admin_homE")
                                        }
                                        console.log(info.role)
                                        //if(data==null){console.log("token/wrong")}
                                            // refresh_get() 
                                                //  console.log("ref_key",localStorage.getItem("refresh_token"))
                                                
                                        }
        
                                })
                                .catch(error=>{
                                console.log(error)
                                })
                                
                              }
                          })
                
            }
              else{
                    fetch(`http://127.0.0.1:5000/api/user/${this.email}/auth`,
                    {
                      method:"GET",
                      headers:{
                        "content-type":"application/json",
                          Authorization:`Bearer  ${localStorage.getItem("access_token")}`
                      }
                    })
                    .then(result=>result.json())
                    .then(data =>{
                              console.log(data)
                              //console.log(data["Token"])
                              //localStorage.setItem("access_token",data["Token"])
                            if(data==null){
                                this.$router.go(0)
                            }else   
                            if(data.msg=="Token has expired")
                                {
                                  if(data==null){console.log("token/wrong")}
                              // refresh_get() 
                                  console.log("ref_key",localStorage.getItem("refresh_token"))
                                  console.log("kam ker gaya2")
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
                                      console.log("let go to home page")
                                      this.$router.push("/manager_homE")
                                    })
                                  }else if(data!=null){
                                                        console.log("mere perr kaaam karo",data.Token)
                                                        localStorage.setItem("access_token",data["Token"])
                                                        console.log("step work"),

                                                        this.$router.push("/manager")
                                  }else if(data.msg=="Not enough segment"){
                                    console.log(" bhai refersh token delete hai")
                                    }
                                console.log("i m here")
                              })
                                    
                                  // .then(respo=>{console.log(respo)})
                                    console.log("out of check boxes")
                            //console.log(this.ans[[PromiseResult]] )
                            
                            //localStorage.setItem("user",JSON.stringify(this.info))
                            //this.$router.push("/")
                            
                                  
                    //.catch(error=>{
                      // console.log("error",error)
                    //})
                    

                    
            }  
  }


},

});

export default Sign_in;
