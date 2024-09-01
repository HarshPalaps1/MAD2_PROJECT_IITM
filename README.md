Author
HARSH PAL
21f1002562
21f1002562@student.onlinedegree.iitm.ac.in
I had done my schooling from army public school no.1 Roorkee and I'm pursuing my
second
degree in Bsc physical science from Delhi university.
Description
On this gorcery app you can enter as Manager and you can open your shop and can
sell your product 
or as user where you can buy any product from app.
Technologies used
1. python = 3.8.0,<3.9
2. Flask = 2.2.2
3. Flask-SQLAlchemy =^2.5.1
4. Jinja
5. SQLAlchemy = 1.4.41
6. Flask-RESTful = ^0.3.9
7. Google graphs
8. SQLAlchemy = 1.4.41
9. Flask-Login = ^0.6.2
10. fastapi = 0.82.0
11.js
12.vue js
13.celery
14.JWT authantication
15)other are mention in requirment.txt
These modules are used because I got friendly with them throughout the MAD 2 
course and
modules like Flask-login and fastapi provide easy ways of implementing my ideas.
This is the
minimum requirement to make a task tracking app.
DB Schema Design
Database contain table :-
a) user_role table have user id and role id contain their foreignkeys
b) user have one to many relationship with stores,cart and bill
c) store table containn info of table
d)Role contain all avaible role for app
e)Categorys contain all info categorys in shop of manager and have one to many 
relationship with products
f)Product table contain all detail of manager product
G)cart contain all product of user (who come to just shop)
h)bill table have info of all bill for shoppers
i)order contain all oeder placed till now
Architecture and Features
├── web :- ( is folder where our application code is)
│ 
│ ├── static :- (Default “static” files folder used to front end)
│ │ ├── assets
│ | │ └──img
| | | └──background images
│ │ ├── css
│ │ │ └── styles
│ │ └── js
│ │ 
│ │ ├── acart.js
│ │ ├── app.js
│ │ ├── astore.js
│ │ ├── router.js
│ │ ├── scripts.js
│ │ └── components
│ | ├── sign_in.js
│ | ├── sign_up.js
│ │ └── Admin_fields
│ │ ├── ad_edit_cato.js
│ │ ├── ad_pending.js
│ │ ├── ad_rejected.js
│ │ ├── category.js
│ │ ├── home.js
│ │ └── man_req.js
│ │ └── manager_veiws
│ │ ├── ad_req.js
│ │ ├── Category.js
│ │ ├── edit_cato.js
│ │ ├── edit_pro.js
│ │ ├── extra.js
│ │ ├── man_summary.js
│ │ ├── name.js
│ │ ├── pending.js
│ │ └── rejected.js
│ │ └── user_fields
│ │ ├── home.js
│ │ ├── user_cart.js
│ │ └── ad_scarch.js
│ ├── templates :- (Default flask templates folder)
│ │ ├── bill.html
│ │ ├── pdf.html
│ │ └── index.html
│ │
│ ├── __init__.py
│ ├── api.py
│ ├── auth.py
│ ├── celery_worker.py
│ ├── Models.py
│ ├── task.py
│ ├── shop_database.sqlite3 :- (it is my app database)
│ └── views.py
└── App.py :- ( application initiator just run this file to run app )
│
└── requirements.txt
After the login app shows you the home page from where you can chose can perform
your task as your role:
Video
https://drive.google.com/file/d/1RfDBM9TaOM2AChfehdsMJL-yJfmXZePW/view?
usp=sharing
