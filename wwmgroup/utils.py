import smtplib
from email.mime.text import MIMEText

def send_email(to_email,name):
    print(name)
    smtp = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    smtp.set_debuglevel(1)
    smtp.ehlo("gmail.com")
    smtp.login(user = 'gjihun852@gmail.com', password='poqgkvcbrzaznlwp')
    link = "http://127.0.0.1:8000/wwmgroup/"+str(name)+"/"

    html_message = """
        <html>
        <head></head>
        <body>
            <p>하단 링크를 눌러 그룹에 입장하세요</p>
            <a href = 
        """ + link + """
        ">
        """ + link + """
        </a>
        </body>
        </html>
        """
    msg = MIMEText(html_message,"html")
    msg['Subject'] = 'WhenMeet 그룹 초대'

    smtp.sendmail(from_addr='gjihun852@gmail.com', to_addrs =to_email, msg =msg.as_string())

    smtp.quit()
