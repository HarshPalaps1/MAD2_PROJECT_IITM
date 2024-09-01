from flask import Flask, render_template, redirect, request, jsonify, send_file
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security
from flask_jwt_extended import JWTManager
from flask_restful import  Resource,Api
from os import path
from flask_cors import CORS
#from flask_celery import make_celery
#from .sec import sto
from .celery_worker import make_celery
from datetime import timedelta
from celery import Celery
#from celery.schedules import crontab
#import time
#from .task import show
from flask_mail import Mail,Message

db=SQLAlchemy()
jwt=JWTManager()






def create_app():

    app = Flask(__name__)
    app.config['SECRET_KEY']="harshpalaps1"
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///shop_database.sqlite3"
    app.config['SECURITY_PASSWORD_SALT']="Harshpalaps1"
    app.config['SQLACLHEMY_TRACK_MODIFICATION']=False
    app.config['WTF_CSRF_ENABLED']=False

    app.config['SECURITY_TOKEN_AUTHENTICATION_HEADER']="Authentication-Token"
    app.config['JWT_SECRET_KEY']="6A7774686172736870616C61707331"

    app.config['CELERY_CONFIG']={"broker_url":"redis://localhost:6379","result_backend":"redis://localhost:6379"}
    app.config["CELERYBEAT_SCHEDULE"]={"say-every-5-seconds":{"schedule":timedelta(seconds=5)}}

    app.config["MAIL_SERVER"]="smtp.gmail.com"
    app.config["MAIL_PORT"]=465
    app.config["MAIL_USERNAME"]='pramodishupal@gmail.com'
    app.config["MAIL_PASSWORD"]='7983447762bsc'
    app.config["MAIL_USE_TLS"]=False
    app.config["MAIL_USE_SSL"]=True
    import pdfkit
    

    mail=Mail(app)
    from .views import views
    from .auth import auth
    from .model import User,user_roles,Role,Category,Product,Store,Cart
    from .api import pdf_bill,admin_report_API,report_API, all_bill_API,user_API,role_API,all_user_refresh,info_user,all_user_auth,one_user_auth,cat_API,all_cat_API,pro_API,store_API,all_store_API,all_pro_API,cart_API,bill_API,order_API#all_pro_API
    from .task import show,show2,send_mail_daily_remaider,graphs,Graphs
  
    db.init_app(app)
    jwt.init_app(app)
    celery=make_celery(app)
    celery.set_default()
    
    @celery.task(name='h')
    def h():
        print("done")
        return "ji"
    
    


      
    api=Api(app)
    CORS(app)

   
    app.register_blueprint(views,url_prefix="/")
    app.register_blueprint(auth,url_prefix="/auth/")

    api.add_resource(one_user_auth, "/access/api/user/<Email>/<Pass>")
    api.add_resource(info_user,"/api/user/info",)
    api.add_resource(all_user_auth,"/api/user/<Email>/auth")
    api.add_resource(user_API,"/api/users/","/api/users/<id>")
    api.add_resource(role_API,"/api/role/",)
    api.add_resource(all_user_refresh,"/api/user/refresh",)
    api.add_resource(all_cat_API,"/all/api/cato","/all/api/cato/<id>")

    api.add_resource(cat_API,"/api/cato/","/api/cato/<id>")
    api.add_resource(pro_API,"/api/pro/","/api/pro/<id>")
    api.add_resource(all_store_API,"/all/api/store/","/all/api/store/<id>",)
    api.add_resource(store_API,"/api/store/","/api/store/<id>")
    api.add_resource(all_pro_API,"/all/api/pro/",)
    api.add_resource(cart_API,"/api/cart/","/api/cart/<p_id>")
    api.add_resource(bill_API,"/api/bill/","/api/bill/<id>")
    api.add_resource(all_bill_API,"/all/api/bill/")
    api.add_resource(order_API,"/api/order/","/api/order/<id>")
    api.add_resource(report_API,"/api/report/","/api/report/<id>")
    api.add_resource(admin_report_API,"/api/admin/report","/api/admin/report/<id>")
    api.add_resource(pdf_bill,"/api/pdf/bill","/api/pdf/bill/<id>")
    
  


    db.create_all(app=app)



    return app,celery,show,show2,mail,send_mail_daily_remaider,graphs,Graphs



#if __name__ == "__main__":
    # with app.app_context():
    #     db.create_all()
#    app.run(debug=True)



    

   