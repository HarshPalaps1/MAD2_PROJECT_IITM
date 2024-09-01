
const Sign_up = Vue.component("sign_up", {
  template: `
  <div>
          <!-- Page Header -->
          <header class="masthead" style="background-image: url('/static/assets/img/sin.jpg')">
          <div class="container position-relative px-4 px-lg-5">
                  <div class="row gx-4 gx-lg-5 justify-content-center">
                          <div class="col-md-10 col-lg-8 col-xl-7">
                                  <div class="page-heading">
                                          
                                          <h1>  <br><button type="submit" class="btn btn-primary" @click="signin()" >Signin</button></br></h1>
                                          <span>if you already member of our app go below</span>
                                                  
                                  
                                  </div>
                          </div>
                  </div>
          </div>        
  </header>
  



          <!-- Main Content -->
          <div class="container">
           <div class="row">
             <div class="col-lg-8 col-md-10 mx-auto" >
                                <p>hope this app will help you</p>
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
      
    //  fetch("http://127.0.0.1:5000/api/user/all").then(res=>res.json()).then(info=>
      //{
      //  this.users=info
      //  console.log("we got data",this.users)

     // })
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
         signin(){
    this.$router.push("/sign_iN")
  },
    
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
  
  
export default Sign_up;