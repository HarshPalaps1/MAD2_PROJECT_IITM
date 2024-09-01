from website import db

from flask_security import UserMixin,RoleMixin
from flask_login import UserMixin
from sqlalchemy.sql import func


# create table in database for assigning roles
class user_roles(db.Model): 
    user_id= db.Column( db.Integer(), db.ForeignKey('User.id'),primary_key=True)
    role_id=db.Column(db.Integer(), db.ForeignKey('Role.id'),primary_key=True)
           
 
# create table in database for storing users
class User(db.Model, UserMixin):
    __tablename__ = 'User'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name=db.Column(db.String)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String(255), nullable=False, server_default='')
    #ctive = db.Column(db.Boolean())
    # backreferences the user_id from roles_users table
    roles =  db.relationship("Role",backref="user" ,secondary="user_roles",cascade = "all, delete")
                                            #user (mujhe vaha user ke naam se bulae)
    categorys=db.relationship("Category",backref="user",cascade = "all, delete") 
    Stores=db.relationship("Store",backref="user",cascade = "all, delete")
    card=db.relationship("Cart",backref="user",cascade = "all, delete") 
    bill=db.relationship("Bill",backref="user",cascade = "all, delete")                                        

class Store(db.Model):
    id = db.Column(db.Integer(),autoincrement=True, primary_key=True)
    name=db.Column(db.String(80), unique=True)
    user_id= db.Column( db.Integer(), db.ForeignKey('User.id'))
    admin_seen=db.Column( db.Integer())
    admin_per=db.Column(  db.Integer())
    man_seen=db.Column(  db.Integer())
    man_per=db.Column(  db.Integer())
# create table in database for storing roles
class Role(db.Model, RoleMixin):
    __tablename__ = 'Role'
    id = db.Column(db.Integer(),autoincrement=True, primary_key=True)
    name = db.Column(db.String(80), unique=True)

    def __repr__(self):
        return F"{self.name}"    


# create table in database for storing Category
class Category(db.Model):
    id = db.Column(db.Integer(), autoincrement=True, primary_key=True)
    Category_name=db.Column(db.String(2000),nullable=False)
    description=db.Column(db.String(2000),nullable=False)
    image_url=db.Column(db.String(2000),nullable=False)

    date=db.Column(db.DateTime(timezone=True),default=func.now())
    admin_seen=db.Column( db.Integer())
    admin_per=db.Column(  db.Integer())
    man_seen=db.Column(  db.Integer())
    man_per=db.Column(  db.Integer())
    user_id= db.Column( db.Integer(), db.ForeignKey('User.id'))
    products=db.relationship("Product",backref="category",cascade = "all, delete") 

# create table in database for storing Product
class Product(db.Model):
    id = db.Column(db.Integer(), autoincrement=True, primary_key=True)
    product_name=db.Column(db.String(2000),nullable=False)
    quantity = db.Column(db.Integer(),nullable=False )
    rate= db.Column(db.Integer(),nullable=False )
    description=db.Column(db.String(2000),nullable=False)
    image_url=db.Column(db.String(2000),nullable=False)
    date=db.Column(db.DateTime(timezone=True),default=func.now())
    allow=db.Column( db.Integer(),nullable=False)
    category_id= db.Column( db.Integer(), db.ForeignKey('category.id'))


class Cart(db.Model):
    id = db.Column(db.Integer(), autoincrement=True, primary_key=True)
    product_name=db.Column(db.String(2000),nullable=False)
    quantity = db.Column(db.Integer(),nullable=False )
    rate= db.Column(db.Integer(),nullable=False )
    image_url=db.Column(db.String(2000),nullable=False)
    date=db.Column(db.DateTime(timezone=True),default=func.now())
    store_id=db.Column(db.Integer(),nullable=False )
    product_id=db.Column(db.Integer(),nullable=False )
    category_id=db.Column(db.Integer(),nullable=False )
    user_id= db.Column( db.Integer(), db.ForeignKey('User.id'))

class Bill(db.Model):
    id = db.Column(db.Integer(), autoincrement=True, primary_key=True)
    total=db.Column(db.String(2000),nullable=False)
    user_id= db.Column( db.Integer(), db.ForeignKey('User.id'))
class Order(db.Model):
    id = db.Column(db.Integer(), autoincrement=True, primary_key=True)
    product_name=db.Column(db.String(2000),nullable=False)
    quantity = db.Column(db.Integer(),nullable=False )
    rate= db.Column(db.Integer(),nullable=False )
    date=db.Column(db.DateTime(timezone=True),default=func.now())
    store_id=db.Column(db.Integer(),nullable=False )
    product_id=db.Column(db.Integer(),nullable=False )
    category_id=db.Column(db.Integer(),nullable=False )
    bill_id=db.Column(db.Integer(),nullable=False)
    
