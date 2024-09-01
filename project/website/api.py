
from flask import Flask,jsonify,request,render_template
from flask_restful import Resource,fields, marshal_with,reqparse,HTTPException,abort
from flask_security import  auth_required
from flask_login import current_user,login_user
from website import db
from flask_jwt_extended import create_access_token,create_refresh_token,jwt_required,get_jwt_identity,decode_token
from .model import User,user_roles,Role,Category,Product,Store,Cart,Bill,Order
from fastapi import Response,status
from datetime import datetime
import pdfkit
#**********************************(Roles)*********************************************






#get
role_body={"id":fields.Integer,
             "name": fields.String}
#Post
put_role_info=reqparse.RequestParser()#it get or connect to correct request/ delivery request or msg

put_role_info.add_argument('name') #it wrape it by giving name 
class role_API(Resource):

    @marshal_with(role_body)
    def get(self):
        role_table=Role.query.all()
        return role_table,status.HTTP_200_OK

        
    #@auth_required('token')
 
    #@marshal_with(user_body)#check info cme and go in correct format
    #@jwt_required()
    def post(self):
        args = put_role_info.parse_args()#it put it all wrap product  in arg box 
        Name = args.get("name", None) # product delivered to correct person
        new_role=Role(name=Name)
        db.session.add(new_role)
        db.session.commit()
        
        return {"message":"new role created!!!"} ,status.HTTP_201_CREATED

        #current=get_jwt_identity()
        #user=User.query.all()
        #if user:
         #   return user,status.HTTP_200_OK
        #else :     
            #abort(status.HTTP_404_NOT_FOUND,message="not found")











#****************************************(user)**************************************************


#in this format respone should be given if we get get_request
user_body={"id":fields.Integer,
             "name": fields.String,
             "email":fields.String,
             "password":fields.String,
             "role":fields.String
             }



user_put_info=reqparse.RequestParser()#it receive request
#it check coming request
user_put_info.add_argument('name')
user_put_info.add_argument('email')
user_put_info.add_argument('password')
user_put_info.add_argument("role")
#we passed info to respective str




        

class all_user_auth(Resource):
    @jwt_required()
    def get(self,Email):
        member=User.query.filter_by(email=Email).all()
        if member:
            access_token=create_access_token(identity=Email)

            return jsonify({"Token":access_token})   

class one_user_auth(Resource):
   # @marshal_with(user_body)
    def get(self,Email,Pass):
        member=User.query.filter_by(email=Email).first()
        if(member):
            if(member.password==Pass):
                a_token=create_access_token(member.email)
                r_token=create_refresh_token(member.email)
                return jsonify({
                        
                            "a_token":a_token,
                            "r_token":r_token
                            })
            else: 
                return  jsonify({"msg":"wrong credentail"})    #"hi" #)#         
        else:
            return   jsonify({"msg":"user not exist"}) 
class all_user_refresh(Resource):
        @jwt_required(refresh=True)
        def get(self):
            user_email=get_jwt_identity()
            refresed_access=create_access_token(identity=user_email)
            return jsonify({"refresed_access_token":refresed_access})
        

class info_user(Resource):
    @marshal_with(user_body)
    @jwt_required()
    def get(self):
        member=User.query.filter_by(email=get_jwt_identity()).first()
        
        roles=   Role.query.filter_by(id=user_roles.query.filter_by(user_id=member.id).first().role_id).first()
        member.role= roles
        return member ,status.HTTP_200_OK

class user_API(Resource):

#"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTDNEpUTHQoQUJMHLrErGJyHg89uy71MyuHtMDFiZC00ZWQxLWJmOGYtNGJlMzEzMWZhMWM0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImhhcnNmNGYzM2RjaGt1bWFyIiwibmJmIjoxNjk4ODEyMDIyLCJleHAiOjE2OTg4MTI5MjJ9.TXKVnzVLOUKaGU-etwdhbYAJk8ZXMkA6y5bBqTmX4us"
    #
    
    @marshal_with(user_body)

    #@jwt_required()
    def get(self):
        user_email=get_jwt_identity()
        member=User.query.all()
        #email= get_jwt_identity()
       # access_token=create_access_token(identity=member.email)
        for i in member:
            roles=   Role.query.filter_by(id=user_roles.query.filter_by(user_id=i.id).first().role_id).first()
            i.role= roles
        if  member:
            return member

        else :      
            abort(status.HTTP_404_NOT_FOUND,message="not found")

    #@auth_required("token")
   # @jwt_required()        
    def post(self):
        #user_email=get_jwt_identity()
        #now a var taking info from str 
        args = user_put_info.parse_args() 
        Name = args.get("name", None)
        Email = args.get("email", None)
        Password = args.get("password", None)
        Role_id=args.get("role",None)
        member_already=User.query.filter_by(email=Email).first()
        role_already=user_roles.query.filter_by(role_id="1").first()

        if Name is None:
            abort(status.HTTP_400_BAD_REQUEST,message="name not found")
        elif Name == (" ") or Name==(""):
            abort(status.HTTP_400_BAD_REQUEST,message="give proper name")    
 
        elif Email is None:
            abort (status.HTTP_400_BAD_REQUEST,message='Email not found')

        elif "@" not in Email:
            abort (status.HTTP_400_BAD_REQUEST,message="in valid Email  format")
        elif member_already:
            abort(status.HTTP_400_BAD_REQUEST,message="Member with same email already exist")
        elif role_already:
            if(Role_id=="1"):
              return jsonify({"message":"Role exist !!!",})
            else:
                new_User = User(name=Name,email=Email,password=Password)
                access_token=create_access_token(identity=new_User.email)
                refresh_token=create_refresh_token(identity=new_User.email)
                role_col= Role.query.filter_by(id=Role_id).all()[0]
                db.session.add_all([new_User])
                role_col.user.append(new_User)
                db.session.commit()
                return jsonify({"message":"Member account created!!!",
                            'token':{ "access":access_token,
                                    "refresh":refresh_token,
            
            
           
                                    

            }
            })
        else:
                new_User = User(name=Name,email=Email,password=Password)
                access_token=create_access_token(identity=new_User.email)
                refresh_token=create_refresh_token(identity=new_User.email)
                role_col= Role.query.filter_by(id=Role_id).all()[0]
                db.session.add_all([new_User])
                role_col.user.append(new_User)
                db.session.commit()
                return jsonify({"message":"Member account created!!!",
                            'token':{ "access":access_token,
                                    "refresh":refresh_token, }
            })

    @jwt_required() 
    def delete(self,id):
            user_email=get_jwt_identity()
            member=User.query.filter_by(id=id).first()
            #work=user_roles.query.filter_by(user_id=member.id).first()
            db.session.delete(member)
            #db.session.delete(work)
            db.session.commit()
            return member.email #abort (status.HTTP_400_BAD_REQUEST,message="in valid Email  format")
                  
       

#*************************************************(store)*************************************************
store_body={"id":fields.Integer,
             "name": fields.String,
             "user_id":fields.Integer,
             "admin_seen":fields.Boolean,
             "admin_per":fields.Boolean,
             "man_seen":fields.Boolean,
             "man_per":fields.Boolean}
#Post
put_store_info=reqparse.RequestParser()#it get or connect to correct request/ delivery request or msg

put_store_info.add_argument('name') #it wrape it by giving name 
put_store_info.add_argument('user_id')
put_store_info.add_argument('admin_seen')
put_store_info.add_argument('admin_per')
put_store_info.add_argument('man_seen')
put_store_info.add_argument('man_per')

update_store_info = reqparse.RequestParser()
update_store_info.add_argument('admin_per',0)
update_store_info.add_argument('admin_seen',0) 

class all_store_API(Resource):

    #@marshal_with(store_body)
    #@jwt_required()
    def get(self,id):
        cat=Category.query.filter_by(id=id).first()
        sto=Store.query.filter_by(user_id=cat.user_id).first()
        return sto.id
    
    @marshal_with(store_body)
    @jwt_required()
    def post(self):
        user_email=get_jwt_identity()
        sto=Store.query.all()
        return sto


class store_API(Resource):

    @marshal_with(store_body)
    @jwt_required()
    def get(self):
        member=User.query.filter_by(email=get_jwt_identity()).first()
        name=Store.query.filter_by(user_id=member.id).first()
        return name#role_table,status.HTTP_200_OK

        
    #@auth_required('token')
 
    #@marshal_with(user_body)#check info cme and go in correct format
    @jwt_required()
    def post(self):
        user_email=get_jwt_identity()
        args = put_store_info.parse_args()#it put it all wrap product  in arg box 
        Name = args.get("name", None) 
        User_id=args.get("user_id")# product delivered to correct person
        Admin_seen=args.get("admin_seen")
        Admin_per=args.get("admin_per")
        Man_seen=args.get("man_seen")
        Man_per=args.get("man_per")
        store_name=Store(name=Name,user_id=User_id,admin_seen=Admin_seen,admin_per=Admin_per,man_seen=Man_seen,man_per=Man_per)
        db.session.add(store_name)
        db.session.commit()
        
        return {"message":"new role created!!!"} ,status.HTTP_201_CREATED

        #current=get_jwt_identity()
        #user=User.query.all()
        #if user:
         #   return user,status.HTTP_200_OK
        #else :     
            #abort(status.HTTP_404_NOT_FOUND,message="not found")

    @jwt_required()
    def put(self,id):
        user_email=get_jwt_identity()
    #    member=User.query.filter_by(email=get_jwt_identity()).first()
        str=Store.query.filter_by(id=id).first()
        args = update_store_info.parse_args()
        Admin_per=args.get("admin_per")
        Admin_seen=args.get("admin_seen")
        str.admin_per=Admin_per
        str.admin_seen=Admin_seen        
        db.session.commit()
        return "done"









#***************************************************(cato)******************************************************************

cat_body={ "id": fields.Integer,
            "Category_name":fields.String,
            "description":fields.String,
            "image_url":fields.String,
            "date":fields.DateTime,
            "admin_seen":fields.Boolean,
            "admin_per":fields.Boolean,
            "man_seen":fields.Boolean,
            "man_per":fields.Boolean}



create_cat_parser = reqparse.RequestParser()
create_cat_parser.add_argument('id')  
create_cat_parser.add_argument('Category_name')
create_cat_parser.add_argument('description')
create_cat_parser.add_argument('image_url')  
create_cat_parser.add_argument('admin_seen') 
create_cat_parser.add_argument('admin_per')
create_cat_parser.add_argument('admin_seen')
create_cat_parser.add_argument('man_seen')
create_cat_parser.add_argument('man_per')

update_cat_info = reqparse.RequestParser()
#update_cat_parser.add_argument('new_list_name') 
update_cat_info.add_argument('Category_name')
update_cat_info.add_argument('description')
update_cat_info.add_argument('image_url')

update_cat_info.add_argument('admin_per')
update_cat_info.add_argument('admin_seen')
update_cat_info.add_argument('man_seen')
update_cat_info.add_argument('man_per')


class all_cat_API(Resource):
    
    @marshal_with(cat_body)
    @jwt_required()
    def get(self):
        user_email=get_jwt_identity()
        #member=User.query.filter_by(email=get_jwt_identity()).first()
        cat=Category.query.all()
        return  cat
    
    #@jwt_required()
    def post(self,id):
            #user_email=get_jwt_identity()
            #member=User.query.filter_by(email=get_jwt_identity()).first()
            args = create_cat_parser.parse_args() 
            #Id = args.get('id', id)
            category_name = args.get('Category_name', None)
            description = args.get('description', None)
            image_url = args.get('image_url', None)
            Admin_seen = args.get('admin_seen', None)
            Admin_per = args.get('admin_per', None)
            Man_seen = args.get('man_seen', None)
            Man_per=args.get("man_per",None)
            #user_id=User.query.filter_by(email=get_jwt_identity()).first()
            #list=#List.query.filter_by(list_name=list_name_input).first()
            #member=#Member.query.filter_by(name=member_name).first()
        # if  not member:
            #    abort(status.HTTP_404_NOT_FOUND,message=f"Member of this name not found")
            #elif list:
            #    abort(status.HTTP_400_BAD_REQUEST,message=f"List with same {list.list_name} already exist")  
            #else:
            # user_of_list=#Member.query.filter_by(name=member_name).first()
                
            cat=Category.query.filter_by(Category_name=category_name,user_id=id).first()
            
            if cat:
                    abort(status.HTTP_400_BAD_REQUEST,message="category name already exist") 
            else:
                    new_cat = Category(
                                    Category_name=category_name,
                                    description=description,
                                    image_url=image_url,
                                    date=datetime.now(),
                                    user_id=id,
                                    admin_seen=Admin_seen,
                                    admin_per=Admin_per,
                                    man_per=Man_per,
                                    man_seen=Man_seen)
                    db.session.add(new_cat)
                    db.session.commit()
                    #return {"message":"new list created!!!"} ,status.HTTP_201_CREATED
                    return {"message":"new Category created!!!"} ,status.HTTP_201_CREATED
    

    


   

 
class cat_API(Resource):
    

    @marshal_with(cat_body)
    @jwt_required()
    def get(self,id):
        user_email=get_jwt_identity()
        member=User.query.filter_by(id=id).first()
        cat=Category.query.filter_by(user_id=member.id).all()
        return  cat


   # @marshal_with(cat_body)
    #@jwt_required()
    #def get(self,id):
       # member=User.query.filter_by(email=get_jwt_identity()).first()
    #    cat=Category.query.filter_by(id=id).first()
    #    return  cat
  
    @jwt_required()
    def post(self):
        user_email=get_jwt_identity()
        member=User.query.filter_by(email=get_jwt_identity()).first()
        args = create_cat_parser.parse_args() 
        id = args.get('id', None)
        category_name = args.get('Category_name', None)
        description = args.get('description', None)
        image_url = args.get('image_url', None)
        Admin_seen = args.get('admin_seen', None)
        Admin_per = args.get('admin_per', None)
        Man_seen = args.get('man_seen', None)
        Man_per=args.get("man_per",None)
        #user_id=User.query.filter_by(email=get_jwt_identity()).first()
        #list=#List.query.filter_by(list_name=list_name_input).first()
        #member=#Member.query.filter_by(name=member_name).first()
       # if  not member:
        #    abort(status.HTTP_404_NOT_FOUND,message=f"Member of this name not found")
        #elif list:
        #    abort(status.HTTP_400_BAD_REQUEST,message=f"List with same {list.list_name} already exist")  
        #else:
           # user_of_list=#Member.query.filter_by(name=member_name).first()
        cat=Category.query.filter_by(Category_name=category_name).first()
        cat2=Category.query.filter_by(user_id=id).first()
                # user_of_list=#Member.query.filter_by(name=member_name).first()
        print(category_name)
       
        
    
        if cat:
                   
                    abort(status.HTTP_400_BAD_REQUEST,message="category name already exist") 
        else:    

            new_cat = Category(id=id,
                            Category_name=category_name,
                            description=description,
                            image_url=image_url,
                            date=datetime.now(),
                            user_id=member.id,
                            admin_seen=Admin_seen,
                            admin_per=Admin_per,
                            man_per=Man_per,
                            man_seen=Man_seen)
            db.session.add(new_cat)
            db.session.commit()
            #return {"message":"new list created!!!"} ,status.HTTP_201_CREATED
            return {"message":"new Category created!!!"} ,status.HTTP_201_CREATED
    @jwt_required()
    def put(self,id):
        user_email=get_jwt_identity()
        str=Category.query.filter_by(id=id).first()
        if str.admin_per=="1":
            Pro=Product.query.filter_by(category_id=id).all()
            for P in Pro:
                P.allow=True
                db.session.commit()
        else:
             Pro=Product.query.filter_by(category_id=id).all()
             for P in Pro:
                P.allow=False
                db.session.commit()

        member=User.query.filter_by(email=get_jwt_identity()).first()
        
        args =update_cat_info.parse_args()

        category_name = args.get('Category_name', None)
        description = args.get('description', None)
        image_url = args.get('image_url', None)
        Admin_per=args.get("admin_per")
        Admin_seen=args.get("admin_seen")
        Man_seen=args.get("man_seen")
        Man_per=args.get("man_per")
        if(category_name):
            str.Category_name=category_name
        if(description):
            str.description=description    
        if(image_url):
            str.image_url=image_url
        str.admin_per=Admin_per
        str.admin_seen=Admin_seen
        str.man_seen=Man_seen
        str.man_per=Man_per        
        db.session.commit()
        return "done"
 
    
    def delete(self,id):
        cat=Category.query.filter_by(id=id).first()
        
        if cat:
            pro=Product.query.filter_by(category_id=id).all()
            if pro:
                abort(status.HTTP_409_CONFLICT,message="category have products first delete it !!!")
                
            else:
                db.session.delete(cat)
                db.session.commit()
                return f" {cat.Category_name} list deleted"
        else:
            abort (status.HTTP_400_BAD_REQUEST,message='list of this name does\'nt exist') 
    
    @marshal_with(cat_body)
    def patch(self):
        cat=Category.query.all()
        return  cat          

     
   


#****************************************(Product)**************************************************

pro_body={ "id": fields.Integer,
            "product_name":fields.String,
            "date":fields.DateTime,
            'rate':fields.Integer,
            "quantity":fields.Integer,
            "description":fields.String,
            "image_url":fields.String,
            "allow":fields.Boolean,
            "category_id":fields.String,
            }



create_pro_parser = reqparse.RequestParser()
create_pro_parser.add_argument('category_id')  
create_pro_parser.add_argument('product_name')
create_pro_parser.add_argument('quantity')
create_pro_parser.add_argument('description')
create_pro_parser.add_argument('image_url')
create_pro_parser.add_argument('allow')    
create_pro_parser.add_argument('rate')


update_pro_info = reqparse.RequestParser()
#update_cat_parser.add_argument('new_list_name') 
update_pro_info.add_argument('category_id')  
update_pro_info.add_argument('product_name')
update_pro_info.add_argument('quantity')
update_pro_info.add_argument('description')
update_pro_info.add_argument('image_url')
update_pro_info.add_argument('allow')    
update_pro_info.add_argument('rate')

class all_pro_API(Resource):
    @marshal_with(pro_body)
    def get(self):
        pro=Product.query.all()
        return pro


class pro_API(Resource):

    @marshal_with(pro_body)
    def get(self,id):
        pro=Product.query.filter_by(category_id=id).all()
        return pro

    @jwt_required()
    def post(self):
        user_email=get_jwt_identity()
        #member=User.query.filter_by(email=get_jwt_identity()).first()
        args = create_pro_parser.parse_args() 
        id = args.get('category_id', None)
        product_name = args.get('product_name', None)
        description = args.get('description', None)
        quantity = args.get('quantity', None)
        image_url = args.get('image_url', None)
        Allow = args.get('allow', None)
        Rate = args.get('rate', None)
        #user_id=User.query.filter_by(email=get_jwt_identity()).first()
        #list=#List.query.filter_by(list_name=list_name_input).first()
        #member=#Member.query.filter_by(name=member_name).first()
       # if  not member:
        #    abort(status.HTTP_404_NOT_FOUND,message=f"Member of this name not found")
        #elif list:
        #    abort(status.HTTP_400_BAD_REQUEST,message=f"List with same {list.list_name} already exist")  
        #else:
           # user_of_list=#Member.query.filter_by(name=member_name).first()
        pro=Product.query.filter_by(product_name=product_name).first()
        pro2=Product.query.filter_by(category_id=id).first()
        if pro.id==pro2.id:
            
             abort(status.HTTP_400_BAD_REQUEST,message="product name already exist") 
        else:
            new_cat = Product(product_name=product_name,
                            quantity=quantity,
                            description=description,
                            image_url=image_url,
                            date=datetime.now(),
                            rate=Rate,
                            allow=Allow,
                            category_id=id)
            db.session.add(new_cat)
            db.session.commit()
            return {"message":"new list created!!!"} ,status.HTTP_201_CREATED
    
    def put(self,id):
    #    member=User.query.filter_by(email=get_jwt_identity()).first()
        str=Product.query.filter_by(id=id).first()
        args =update_pro_info.parse_args()

        id = args.get('category_id', None)
        product_name = args.get('product_name', None)
        description = args.get('description', None)
        quantity = args.get('quantity', None)
        image_url = args.get('image_url', None)
        Allow = args.get('allow', None)
        Rate = args.get('rate', None)
        if(product_name):
            str.product_name=product_name
        if(description):
            str.description=description    
        if(quantity):
            str.quantity=quantity
        if(image_url):
            str.image_url=image_url
        if(Allow):
            str.allow=Allow
        if(Rate):
            str.rate=Rate          
        db.session.commit()
        return "done"
    @jwt_required()
    def patch(self,id):
    #    member=User.query.filter_by(email=get_jwt_identity()).first()
        str=Product.query.filter_by(category_id=id).all()
        args =update_pro_info.parse_args()

        Allow = args.get('allow', None)
        for pro in str:
            pro.allow=Allow
            db.session.commit()
        
        
        return "done"

    @jwt_required()
    def delete(self,id):
                user_email=get_jwt_identity()
                pro=Product.query.filter_by(id=id).first()
                
                if pro:
                   
                        db.session.delete(pro)
                        db.session.commit()
                        return f" {pro._name} list deleted"
                else:
                    abort (status.HTTP_400_BAD_REQUEST,message='list of this name does\'nt exist') 



 

                #return id
#////////////////////////////// Cart
cart_body={ "id": fields.Integer,
            "product_name":fields.String,
            "date":fields.DateTime,
            'rate':fields.Integer,
            "quantity":fields.Integer,
            "image_url":fields.String,
            "allow":fields.Boolean,
            "user_id":fields.String,
            'category_id':fields.Integer,
            "store_id":fields.Integer,
            "product_id":fields.Integer,
            }



create_cart_parser = reqparse.RequestParser()
create_cart_parser.add_argument('user_id')  
create_cart_parser.add_argument('product_name')
create_cart_parser.add_argument('quantity')
create_cart_parser.add_argument('store_id')
create_cart_parser.add_argument('image_url')
create_cart_parser.add_argument('category_id')    
create_cart_parser.add_argument('rate')
create_cart_parser.add_argument('product_id')


update_pro_info = reqparse.RequestParser()
#update_cat_parser.add_argument('new_list_name') 
update_pro_info.add_argument('user_id')  
update_pro_info.add_argument('product_name')
update_pro_info.add_argument('quantity')
#update_pro_info.add_argument('description')
update_pro_info.add_argument('image_url')
update_pro_info.add_argument('allow')    
update_pro_info.add_argument('rate')

#class all_cart_API(Resource):
    #@marshal_with(pro_body)
    #def get(self):
    #    pro=Product.query.all()
    #    return pro


class cart_API(Resource):

    @marshal_with(cart_body)
    @jwt_required()
    def get(self,p_id):
        pro=Cart.query.filter_by(user_id=p_id).all()
        return pro

    @jwt_required()
    def post(self,p_id):
        user_email=get_jwt_identity()
        args = create_cart_parser.parse_args() 
        id = args.get('user_id', None)
        product_name = args.get('product_name', None)
        Category_id = args.get('category_id', None)
        quantity = args.get('quantity', None)
        image_url = args.get('image_url', None)
        store_id = args.get('store_id', None)
        product_id = args.get('product_id', None)
            
        Rate = args.get('rate', None)
        #member=User.query.filter_by(email=get_jwt_identity()).first()
        al_cart=Cart.query.filter_by(product_id=p_id).first()
        pro=Product.query.filter_by(id=p_id).first()
        if(al_cart):
             if(pro.quantity>0):
                qua1=int(al_cart.quantity)
                qua2=int(pro.quantity)
                al_cart.quantity=qua1+int(1)
                pro.quantity=qua2-int(1)
                db.session.commit()
                return "hi"   
        else:        
              
                #user_id=User.query.filter_by(email=get_jwt_identity()).first()
                #list=#List.query.filter_by(list_name=list_name_input).first()
                #member=#Member.query.filter_by(name=member_name).first()
            # if  not member:
                #    abort(status.HTTP_404_NOT_FOUND,message=f"Member of this name not found")
                #elif list:
                #    abort(status.HTTP_400_BAD_REQUEST,message=f"List with same {list.list_name} already exist")  
                #else:
                # user_of_list=#Member.query.filter_by(name=member_name).first()
                qua2=int(pro.quantity)
                pro.quantity=qua2-int(1)   
                
                new_cart = Cart(product_name=product_name,
                                quantity=quantity,
                                store_id = store_id,
                                image_url=image_url,
                                date=datetime.now(),
                                rate=Rate,
                                category_id=Category_id,
                                product_id=product_id,
                                #allow=Allow,
                                user_id=id)
                db.session.add(new_cart)
                db.session.commit()
                return {"message":"new list created!!!"} ,status.HTTP_201_CREATED

    @jwt_required()    
    def delete(self,p_id):
        user_email=get_jwt_identity()
        al_cart=Cart.query.filter_by(user_id=p_id).all()

        if(al_cart):
            for i in al_cart:
                db.session.delete(i)
                db.session.commit()
            return "product deleted"
        else:
            return abort (status.HTTP_400_BAD_REQUEST,message='product does\'nt exist')  

    @jwt_required()    
    def patch(self,p_id):
        user_email=get_jwt_identity()
        al_cart=Cart.query.filter_by(product_id=p_id).first()
        if(al_cart):
            Pro=Product.query.filter_by(id=p_id).first()
            amount2=int(Pro.quantity)
            amount1=int(al_cart.quantity)
            total=amount1+amount2
            Pro.quantity=total
            db.session.delete(al_cart)

            db.session.commit()
            return "product deleted"
        else:
            return abort (status.HTTP_400_BAD_REQUEST,message='product does\'nt exist')
                    
#****************************************(Bill)**************************************************

bill_body={ "id": fields.Integer,
            
       
            "total":fields.Integer,

            "user_id":fields.Integer,            
           
            }



create_bill_parser = reqparse.RequestParser()
create_bill_parser.add_argument('user_id')  
create_bill_parser.add_argument('total')




class all_bill_API(Resource):
    @marshal_with(bill_body)
    @jwt_required()
    def get(self):
        user_email=get_jwt_identity()
        pro=Bill.query.all()
        return pro


class bill_API(Resource):

    @marshal_with(bill_body)
    def get(self,id):
        pro=Bill.query.filter_by(user_id=id).all()
    
        return pro

    @jwt_required()
    def post(self):
        user_email=get_jwt_identity()
        #member=User.query.filter_by(email=get_jwt_identity()).first()
        args = create_bill_parser.parse_args() 
        id = args.get('user_id', None)
    
        total = args.get('total', None)
        
        #user_id=User.query.filter_by(email=get_jwt_identity()).first()
        #list=#List.query.filter_by(list_name=list_name_input).first()
        #member=#Member.query.filter_by(name=member_name).first()
       # if  not member:
        #    abort(status.HTTP_404_NOT_FOUND,message=f"Member of this name not found")
        #elif list:
        #    abort(status.HTTP_400_BAD_REQUEST,message=f"List with same {list.list_name} already exist")  
        #else:
           # user_of_list=#Member.query.filter_by(name=member_name).first()
            

        new_bill = Bill(
                          total=total,
                          user_id=id
                          )
        db.session.add(new_bill)
        db.session.commit()
        return {"message":"new list created!!!"} ,status.HTTP_201_CREATED 

#****************************************(orders)**************************************************

ord_body={ "id": fields.Integer,
            "product_name":fields.String,
            "date":fields.DateTime,
            'rate':fields.Integer,
            "quantity":fields.Integer,
    
            "bill_id":fields.String,
            'category_id':fields.Integer,
            "store_id":fields.Integer,
            "product_id":fields.Integer,
            }



create_ord_parser = reqparse.RequestParser() 
create_ord_parser.add_argument('product_name')
create_ord_parser.add_argument('quantity')
create_ord_parser.add_argument('store_id')
create_ord_parser.add_argument('bill_id')
create_ord_parser.add_argument('category_id')    
create_ord_parser.add_argument('rate')
create_ord_parser.add_argument('product_id')


update_pro_info = reqparse.RequestParser()
#update_cat_parser.add_argument('new_list_name') 
update_pro_info.add_argument('user_id')  
update_pro_info.add_argument('product_name')
update_pro_info.add_argument('quantity')
#update_pro_info.add_argument('description')
update_pro_info.add_argument('image_url')
update_pro_info.add_argument('allow')    
update_pro_info.add_argument('rate')

#class all_cart_API(Resource):
    #@marshal_with(pro_body)
    #def get(self):
    #    pro=Product.query.all()
    #    return pro


class order_API(Resource):

    @marshal_with(ord_body)
    def get(self,id):
        pro=Order.query.filter_by(store_id=id).all()
        return pro

    #@jwt_required()
    def post(self):
        args = create_ord_parser.parse_args() 
        Bill_id = args.get('bill_id', None)
        product_name = args.get('product_name', None)
        Category_id = args.get('category_id', None)
        quantity = args.get('quantity', None)
        store_id = args.get('store_id', None)
        product_id = args.get('product_id', None)    
        Rate = args.get('rate', None)
        #member=User.query.filter_by(email=get_jwt_identity()).first()
        
       
           
              
                #user_id=User.query.filter_by(email=get_jwt_identity()).first()
                #list=#List.query.filter_by(list_name=list_name_input).first()
                #member=#Member.query.filter_by(name=member_name).first()
            # if  not member:
                #    abort(status.HTTP_404_NOT_FOUND,message=f"Member of this name not found")
                #elif list:
                #    abort(status.HTTP_400_BAD_REQUEST,message=f"List with same {list.list_name} already exist")  
                #else:
                # user_of_list=#Member.query.filter_by(name=member_name).first()


        new_order = Order(product_name=product_name,
                                quantity=quantity,
                                store_id = store_id,
                                bill_id=Bill_id,
                                date=datetime.now(),
                                rate=Rate,
                                category_id=Category_id,
                                product_id=product_id,
                                #allow=Allow,
                               )
    
        db.session.add(new_order)
        db.session.commit()
        return {"message":"order listed !!!"} ,status.HTTP_201_CREATED


import matplotlib.pyplot as plt

#*************************(report)***********************
class report_API(Resource):


    def get(self,id):
        print(id)
        a=Bill.query.all()
        pro=Category.query.filter_by(user_id=id).all()
       
       
  
        import numpy as np
        sale=[]
        cato_name=[]
        sale2=[]
        for i in pro:
            if i.admin_per!=0:
                print(i.Category_name)
                cato_name.append(i.Category_name) 
                b=Product.query.filter_by(category_id=i.id).all()
                c=Order.query.filter_by(category_id=i.id).all()
                sale_count=0
                
                for m in c:
                    sale_count+=m.quantity
                    
                    print(m.quantity)
                sale2.append(sale_count)
                count=0
                for j in b:
                    
                    count+=j.quantity

                    print(j.quantity)
                sale.append(count)
            
            
        print(sale)
        print(cato_name) 
        print(sale2)   
        boys = [20, 35, 30, 35, 5]
        girls = (25, 32, 34, 20,5 )
      
        ind = np.arange(len(sale))   
        width = 0.35 
            
        fig = plt.subplots(figsize =(7, 5))
        p1 = plt.bar(ind, sale, width)
        p2 = plt.bar(ind, sale2, width, bottom = sale)
            
        
        
        plt.ylabel('CATEGORYS')
        plt.title(' categorys vice inventory sold and unsold product')
        plt.xticks(ind, cato_name)
        plt.yticks(np.arange(0,max(sale)+max(sale2),max(sale)/10))
        plt.legend((p1[0], p2[0]), ('unsold product', 'sold product'))
        plt.savefig("website/static/assets/img/bar_chart.png")

        store_id=Order.query.filter_by(store_id=Store.query.filter_by(user_id=id).first().id).all()
        product_id=[]
        for i in store_id:
            if i.product_id in product_id:
                pass
            else:
                product_id.append(i.product_id)
        print(product_id)

        product_name=[]
        total_sell=[]
        for id in product_id:
            product_name.append(Order.query.filter_by(product_id=id).first().product_name) 
            product=Order.query.filter_by(product_id=id).all()        
            total=0
            for item in product:
                total+=item.quantity
            total_sell.append(total)    
        print(product_name) 
        print(total_sell)       
        labels = product_name
        sizes = total_sell
        fig1, ax1 = plt.subplots()
        ax1.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90)
        ax1.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.
       
        plt.title(' contribution of each  product in sale')
        plt.savefig("website/static/assets/img/pie_chart.png")
        return "done"
        

import matplotlib.pyplot as plt

class admin_report_API(Resource):
    import matplotlib.pyplot as plt

    def get(self):
        
        a=Bill.query.all()
        pro=Category.query.all()
       
       
  
        import numpy as np
        sale=[]
        cato_name=[]
        sale2=[]
        for i in pro:
            if i.admin_per!=0:
                print(i.Category_name)
                cato_name.append(i.Category_name) 
                b=Product.query.filter_by(category_id=i.id).all()
                c=Order.query.filter_by(category_id=i.id).all()
                sale_count=0
                
                for m in c:
                    sale_count+=m.quantity
                    
                    print(m.quantity)
                sale2.append(sale_count)
                count=0
                for j in b:
                    
                    count+=j.quantity

                    print(j.quantity)
                sale.append(count)
            
            
        print(sale)
        print(cato_name) 
        print(sale2)   
        boys = [20, 35, 30, 35, 5]
        girls = (25, 32, 34, 20,5 )
      
        ind = np.arange(len(sale))   
        width = 0.35 
            
        fig = plt.subplots(figsize =(7, 5))
        p1 = plt.bar(ind, sale, width)
        p2 = plt.bar(ind, sale2, width, bottom = sale)
            
        
        
        plt.ylabel('CATEGORYS')
        plt.title(' categorys vice inventory sold and unsold product')
        plt.xticks(ind, cato_name)
        plt.yticks(np.arange(0,max(sale)+max(sale2),max(sale)/10))
        plt.legend((p1[0], p2[0]), ('unsold product', 'sold product'))
        plt.savefig("website/static/assets/img/ad_bar_chart.png")

        store_id=Order.query.all()
        product_id=[]
        for i in store_id:
            if i.product_id in product_id:
                pass
            else:
                product_id.append(i.product_id)
        print(product_id)

        product_name=[]
        total_sell=[]
        for id in product_id:
            product_name.append(Order.query.filter_by(product_id=id).first().product_name) 
            product=Order.query.filter_by(product_id=id).all()        
            total=0
            for item in product:
                if item.quantity=="a":
                    pass
                else:

                    total+=item.quantity
            total_sell.append(total)    
        print(product_name) 
        print(total_sell)       
        labels = product_name
        sizes = total_sell
        fig1, ax1 = plt.subplots()
        ax1.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90)
        ax1.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.
       
        plt.title(' contribution of each  product in sale')
        plt.savefig("website/static/assets/img/ad_pie_chart.png")
        return "done" 



class pdf_bill(Resource):
    

    def get(self,id):
        config = pdfkit.configuration(wkhtmltopdf="C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe")   
        role=Role.query.all()
        ren=render_template("bill.html",name=role)
        name="bill"
        email="pramodishupal@gmail.com"
        # html=f"<h1>{name}</h1> {id}and <h6>{email}</h6> "
        html=ren
        
        pdf=pdfkit.from_string(html,False,configuration=config)

        headers={
            "content-Type":"application/pdf",
            "content-Disposition":f"attachment;filename={name}.pdf"
        }
        response=Response(pdf,headers=headers)
 
        return "done"      