from website import create_app
from celery.schedules import crontab 

app,celery,show2,show,mail,send_mail_daily_remaider,graphs,Graphs= create_app()
app.app_context().push()

@celery.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    # Calls test('hello') every 10 seconds.,send_mail_daily_remaider.s()
    sender.add_periodic_task(10.0,send_mail_daily_remaider.s(), name='add every 10')
    sender.add_periodic_task(18.0,graphs.s(), name='add every 18')
    sender.add_periodic_task(14.0,Graphs.s(), name='add every 14')

@celery.on_after_configure.connect
def set_periodic_tasks(sender, **kwargs):
    # Calls test('hello') every 10 seconds.,send_mail_daily_remaider.s()
    # Calls test('hello') every 10 seconds.,send_mail_daily_remaider.s()
    sender.add_periodic_task(crontab( minutes="*/1"),send_mail_daily_remaider.s(), name='add every 10')    

if __name__ == "__main__":
    
    # only when you run this file not only at import
    app.run(debug=True)
    celery.run(debug=True)



     

