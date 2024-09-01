from flask import Blueprint , render_template,Response
from .task import show,show2,send_mail,sold_product_csv,pdf,send_mail_daily_remaider,send_mail_admin_report,bill,graphs,Graphs
views=Blueprint('views',__name__)
import time
from .model import User,Role,user_roles,Cart,Order,Store
import pdfkit

from celery.schedules import crontab
import os 

@views.route("/")
def home():
    return  render_template("index.html", a = False)






@views.route("/hi/1")
def h():
  
  a=send_mail.delay()

  return {
     "TAsk_ID": a.id,
     "TASK_Status": a.state,
      "TASK_RESULT": a.result
  } 
    
@views.route("/info/<man_name>/<request>")
def h2(man_name,request):
  a= show2.delay(man_name,request)
  
  return {
     "TAsk_ID": a.id,
     "TASK_Status": a.state,
      "TASK_RESULT": a.result
  } 

@views.route("/sold_product_cvs/<id>")
def sold_products_csv(id):
  a = sold_product_csv.delay(id)
  
  return "done"


@views.route("/mail")
def delivary_mail():
   b=send_mail.delay()
   return {
     "TAsk_ID": b.id,
     "TASK_Status": b.state,
      "TASK_RESULT": b.result
  } 




@views.route("/pdf")
def pdf_gen():
   b=pdf.delay()
   return {
     "TAsk_ID": b.id,
     "TASK_Status": b.state,
      "TASK_RESULT": b.result
  } 

import smtplib
import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime. base import MIMEBase
from email import encoders
from jinja2 import Template

SMPTP_SERVER_HOST ="localhost"
SMPTP_SERVER_PORT =1025
SENDER_ADDRESS = "email@thejeshgn.com"
SENDER_PASSWORD=""



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
           #Add file as application/octet-stream
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
@views.route("/pdfs/<id>")
def pdfs(id):
   
   config = pdfkit.configuration(wkhtmltopdf="C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe") #replace with your path
   Product=Cart.query.filter_by(user_id=id).all()
   #user=User.query.filter_by(id=id).all()
   #for i in user:
      
   store=Store.query.all() 
   order=Order.query.all()
   count=0
   number=0
   for i in store:
      count+=1
   for i in order:
      number+=float(i.quantity)
   ren=render_template("pdf.html",order=order,count=count,number=number)
   name="harshpal"
   email="pramodishupal@gmail.com"
  # html=f"<h1>{name}</h1> {id}and <h6>{email}</h6> "
   html=ren
  
   pdf=pdfkit.from_string(html,False,configuration=config)

   headers={
      "content-Type":"application/pdf",
      "content-Disposition":f"attachment;filename={name}.pdf"
   }
   response=Response(pdf,headers=headers)
  
          
   return response

   
#daily reminder
@views.route("/user_remainder/1")
def user_remainder():
  
  a=send_mail_daily_remaider.delay()

  return {
     "TAsk_ID": a.id,
     "TASK_Status": a.state,
      "TASK_RESULT": a.result
  } 




#mounthly report for admin
@views.route("/admin_report/1")
def admin_report_trigger():
  
  a=send_mail_admin_report.delay()

  return {
     "TAsk_ID": a.id,
     "TASK_Status": a.state,
      "TASK_RESULT": a.result
  } 

#for sending product bill
@views.route("/product_bill/<id>")
def Product_bill(id):
  
  a=bill.delay(id)

  return {
     "TAsk_ID": a.id,
     "TASK_Status": a.state,
      "TASK_RESULT": a.result
  } 


#sending reports to admin
@views.route("/graph")
def gen():
   b=graphs.delay()
   return {
     "TAsk_ID": b.id,
     "TASK_Status": b.state,
      "TASK_RESULT": b.result
  } 

#sending reports to admin
@views.route("/Graph")
def gen2():
   b=Graphs.delay()
   return {
     "TAsk_ID": b.id,
     "TASK_Status": b.state,
      "TASK_RESULT": b.result
  } 