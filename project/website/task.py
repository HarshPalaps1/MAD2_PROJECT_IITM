from celery import shared_task
from time import sleep
from flask import send_file,Response,render_template
import smtplib
import time 
import pdfkit
from .model import Role,Cart
from website import Message,Mail
from json import dumps
from httplib2 import Http
import os
from .model import User,Role,user_roles,Cart,Order,Bill,Category,Product
import smtplib
import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime. base import MIMEBase
from email import encoders
from jinja2 import Template
import matplotlib.pyplot as plt
SMPTP_SERVER_HOST ="localhost"
SMPTP_SERVER_PORT =1025
SENDER_ADDRESS = "email@thejeshgn.com"
SENDER_PASSWORD=""


@shared_task(bind=True)
def show(self):
    time.sleep(5)
    import csv
    with open("website/data.csv","w") as f:
      f=  csv.writer(f)
      f.writerow(["id","role"])
      role=Role.query.all()
      
      for r in role:
         R=[r.id,r.name]
         f.writerow(R)
    R=[]
    p="/img1-bg.jpg"

    
    #df=pd.read(role)    
    return send_file(f,as_attachment=True)  

@shared_task(bind=True)
def sold_product_csv(self,id):
    
    import csv
    with open("data.csv","w") as f:
      f=  csv.writer(f)
      f.writerow(["id","Product_name","Price","Date"])
      role=Order.query.all()
      
      for r in role:
          f.writerow([f"{r.id}",f"{r.product_name}",f"{r.rate}",f"{r.date}"])
    
    p="/img1-bg.jpg"

    
    #df=pd.read(role)    
    return send_file(p,as_attachment=True)      

  
  


@shared_task(bind=True)
def show2(self,name,req):
    from json import dumps
    from httplib2 import Http
    """Google Chat incoming webhook quickstart."""
    url = "https://chat.googleapis.com/v1/spaces/AAAAGEZbdQQ/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=4b4jMqtbOTkRWOOw_CAtBXHupZhxTNcj0OSUTojuDB4"
    app_message = {"text": f"New request has been sent  from {name} for {req}"}
    message_headers = {"Content-Type": "application/json; charset=UTF-8"}
    http_obj = Http()
    response = http_obj.request(
        uri=url,
        method="POST",
        headers=message_headers,
        body=dumps(app_message),
    )
    print(response) 
    return f"mail will btw sent shortly{id}"


def send_email(to_address, subject, message, content="text",attachment_file=None):
    msg =MIMEMultipart()
    msg["From"] = SENDER_ADDRESS
    msg["To"] = to_address
    msg["Subject"] = subject

    if content == "html":
        msg.attach(MIMEText(message, "html"))
    else:
        msg.attach(MIMEText (message, "plain"))
    if attachment_file:
        with open(attachment_file, "rb") as attachment:
         # Add file as application/octet-stream
            part = MIMEBase("application", "octet-stream")
            part.set_payload(attachment.read())
            print("at,sent")

            encoders.encode_base64(part)

            msg.attach(part)

    #msg.attach(MIMEText(message,"plain"))
    s = smtplib. SMTP(host=SMPTP_SERVER_HOST, port=SMPTP_SERVER_PORT)

    s.login(SENDER_ADDRESS, SENDER_PASSWORD)
    s.send_message(msg)
    s.quit()
    return True
     

out = os.path.isfile("C:\\Users\\pramo\\Downloads\\harshpal.pdf")

@shared_task(bind=True)
def send_mail(self):
    send_email(to_address= "dunmy@gmail.com",
      subject= "Demo for Email Transmission",
      message= "Hello !! We are doing a demo some new",
      #attachment_file=out,
     # attachment_file="website/static/assets/img/home-bg.jpg",
      content="html"
     )
    return(" email sent ")

@shared_task(bind=True)
def pdf(self):
   #config = pdfkit.configuration(wkhtmltopdf="C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe") #replace with your path
   

    
   name="hapal"
   email="pramodishupal@gmail.com"
   html=f"<h1>{name}</h1> and ji <h6>{email}</h6>"

  
   pdf=pdfkit.from_string(html,False,)#configuration=config)

   headers={
      "content-Type":"application/pdf",
      "content-Disposition":f"/website;filename={name}.pdf"
   }
   response=Response(pdf,headers=headers)#,configuration=config)
   
   return response

#for sending daily reminder
@shared_task(bind=True)
def send_mail_daily_remaider(self):
  
   
   user=user_roles.query.filter_by(role_id="3").all()
   for i in user:
      
      user1=User.query.filter_by(id=i.user_id).first()
     
      send_email(to_address= f"{user1.email}",
      subject= "Demo for Email Transmission",
      message= '''<h2> VISIT OUR WEB SITE AGAIN WE HAVE NEW OFFERS!!!! FOR YOU </h2>
            <img src="bar_chart.png">''',
            attachment_file="website/static/assets/img/bar_chart.png",
            content="html")
          
   return(" email sent daily remainder ")


#mouthly report for admin
#for sending daily reminder
@shared_task(bind=True)
def send_mail_admin_report(self):
  
   
   user=user_roles.query.filter_by(role_id="3").all()
   for i in user:
      
      user1=User.query.filter_by(id=i.user_id).first()
     
      send_email(to_address= f"{user1.email}",
      subject= "Demo for Email Transmission",
      message= '''<h2> VISIT OUR WEB SITE AGAIN WE HAVE NEW OFFERS!!!! FOR YOU </h2>
            <img src="bar_chart.png">''',
            attachment_file="website/static/assets/img/bar_chart.png",
            content="html")
          
   return(" email sent of admin report")



#for sending bills
@shared_task(bind=True)
def bill(self,id):
        
        Product=Cart.query.filter_by(user_id=id).all()
        #user=User.query.filter_by(id=id).all()
        #for i in user:
            
        user1=User.query.filter_by(id=id).first()
        role=Role.query.all()
      
        temp=render_template("bill.html",Product=Product,name=user1.name)
        
       # temp=render_template("bill.html",Product=Product,user_name=user1.name)
        send_email(to_address= f"{user1.email}",
        subject= "Demo for Email Transmission",
        message= temp,
                attachment_file="website/static/assets/img/bar_chart.png",
                content="html")
        
            
        return(" product bill send ")

#to send ghar
@shared_task(bind=True)
def graphs(self):
      
      
   user=user_roles.query.filter_by(role_id="1").all()
   for i in user:
      
      user1=User.query.filter_by(id=i.user_id).first()
     
      send_email(to_address= f"{user1.email}",
      subject= "Demo for Email Transmission",
      message= '''<h2> this is bar grahp report  WEB SITE  FOR PDF REPORT GRAPHS SENT </h2>
            <img src="bar_chart.png">''',
            attachment_file="website/static/assets/img/ad_bar_chart.png",
            content="html")
          
   return(" email sent of admin report")


@shared_task(bind=True)
def Graphs(self):
      
      
   user=user_roles.query.filter_by(role_id="1").all()
   for i in user:
      
      user1=User.query.filter_by(id=i.user_id).first()
     
      send_email(to_address= f"{user1.email}",
      subject= "Demo for Email Transmission",
      message= '''<h2> this is sale pie chart report  WEB SITE  FOR PDF REPORT GRAPHS SENT </h2>
            <img src="bar_chart.png">''',
            attachment_file="website/static/assets/img/ad_pie_chart.png",
            content="html")
          
   return(" email sent of admin report")