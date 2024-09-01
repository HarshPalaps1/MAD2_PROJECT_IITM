const Void = Vue.component("sign_up", {
    template: `
    <div>
            <!-- Page Header -->
            <header class="masthead">
              <div class="overlay">
              <div class="container">
                <div class="row">
                  <div class="col-lg-8 col-md-10 mx-auto">
                    <div class="page-heading" >
                      <h1>void</h1>
                      
                      <span class="subheading">Have questions? I have answers.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </header>
  
  
  
            <!-- Main Content -->
            <div class="container">
             <div class="row">
               <div class="col-lg-8 col-md-10 mx-auto" >
                                  <p>Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!</p>
                              <!-- Contact Form - Enter your email address on line 19 of the mail/contact_me.php file to make this form work. -->
                              <!-- WARNING: Some web hosts do not allow emails to be sent through forms to common mail hosts like Gmail or Yahoo. It's recommended that you use a private domain email address! -->
                              <!-- To use the contact form, your site must be on a live web host with PHP! The form will not work locally! -->
  
  
                                <div class="back">
                                  <div class="div-center">
                                    <div class="content">
                                      <h3>Signup</h3>
                                      <hr />
                                      <form @submit.prevent="Signup">
              
                                        <div class="control-group">
                                        <div class="form-group floating-label-form-group controls">
                                          <label for="exampleInputEmail1">Email address</label>
                                            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" v-model="email">
                                          <p class="help-block text-danger"></p>
                                        </div>
                                      
                                        </div>
                                        <div class="control-group">
                                          <div class="form-group floating-label-form-group controls">
                                                <label for="exampleInputUsername">Username</label>
                                                <input type="text" class="form-control" id="exampleInputUsername" placeholder="Username" v-model="username">
                                                <p class="help-block text-danger"></p>
                                          </div>
                                        </div>
  
                                        <div class="control-group">
                                          <div class="form-group floating-label-form-group controls">
                                            <label for="exampleInputPassword1">Password</label>
                                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                                          </div>
                                        </div>   
  
                                        
                                        <br> </br>
                                        <div class="control-group">
                                      
                                      
                                            <label>
                                              <input type="radio" name="role" v-model="role" value="1" required>Admin
                                            </label>
                                            <label>
                                              <input type="radio" name="role" v-model="role" value="2">Manager
                                            </label>
                                            <label>
                                            <input type="radio" name="role" value="3" v-model="role">User
                                            </label>
                                            {{this.role}}
                                      
                                      </div>
                                        
                                        <br> </br>
                                        <div class="control-group">
                                          <div class="form-group col-xs-12 floating-label-form-group controls">
                                            <div class="form-group">
                                                <button type="submit" class="btn btn-primary">Signup</button>
                                            </div>
                                          </div>
                                        </div>
                                         
                                      </form>
                                      <hr />
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
          
            username: null, // Change from 'Username' to 'username'
            email: null,
            password: null,
            confirm_password:null,
            users:[],
            role:null
          
        };
      },
       mounted: function(){
        
          const data1 = {
            name:"admin"
          };
    
          fetch("http://127.0.0.1:5000/api/role", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length":"<calculated when request is sent>",
            },
            body: JSON.stringify(data1),//content which should be uploaded
            
          }).then(respo=>{return respo.json()}).then(res=>{
            
            const data2 = {
              name:"manager"
            };
      
           fetch("http://127.0.0.1:5000/api/role", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Content-Length":"<calculated when request is sent>",
              },
              body: JSON.stringify(data2),//content which should be uploaded
              
            }).then(respo=>{return respo.json()}).then(res=>{
              
              const data3 = {
                name:"user"
              };
        
              fetch("http://127.0.0.1:5000/api/role", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Content-Length":"<calculated when request is sent>",
                },
                body: JSON.stringify(data3),//content which should be uploaded
                
              }).then(respo=>{return respo.json()}).then(res=>{
                
                
              }).catch(err=>console.log(err,"kuvh to gadbad hai"))
              
              
              
            }).catch(err=>console.log(err,"kuvh to gadbad hai"))
          
          
            
          }).catch(err=>console.log(err,"kuvh to gadbad hai"))
          
          
          
        
          
        
        

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
                   
                    if( info.role=="manager"){
                      console.log(info.role)
                      this.$router.push("/store_name")
                    
                    } else if ( info.role=="user"){
                   
                      this.$router.push("/user_homE")
                    }
                    else if ( info.role=="admin"){
                      
                      this.$router.push("/admin_homE")
                    }
                    
                    }
        
              })
            .catch(error=>{
             // this.$router.push("/sign_iN")
              console.log(error)
              
            })
}else{
console.log("nahi hai bhai")

this.$router.push("/sign_iN")
}
      },
      methods:{
              
      //  get_user(){
         // fetch("http://127.0.0.1:5000/api/user/all",
         // {
         //   method:"GET",
         //   headers:{
         //     "content-type":"application/json",
           //   "Content-Length":"<calculated when request is sent>",
         //   }
        //  })
        //  .then(result=>result.json())
        //  .then(data =>{
        //    console.log(data)
        //  })
        //  .catch(error=>{
           // console.log(error)
        //  })
       // },
       // created() {
        //  this.get_user()
        //},
      
        Signup() {
          const data = {
            name: this.username,
            email: this.email,
            password: this.password,
            role:this.role
          };
    
          fetch("http://127.0.0.1:5000/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length":"<calculated when request is sent>",
            },
            body: JSON.stringify(data),//content which should be uploaded
            
          }).then(respo=>{return respo.json()}).then(res=>{
            console.log(res)
            //if(res.status==201){
            localStorage.setItem("access_token",res.token.access)
            localStorage.setItem("refresh_token",res.token.refresh)
            console.log("Success_sign_up")
            this.$router.push("/sign_iN")
            console.log("lets go to sign in page")
          }).catch(err=>console.log(err,"kuvh to gadbad hai"))
          
          
          
        
        },
      },
  
    });
    
    
  export default Void;