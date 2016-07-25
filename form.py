# Imported the Flask class and a function render_template
from flask import Flask, render_template, request, flash
from forms import ContactForm
from flask.ext.mail import Message, Mail
import os

mail = Mail()

# Created an instance/object of the Flask class
app = Flask(__name__)

app.secret_key = os.urandom(24)

# Mapped the URL '/' to the function home().
# Now when someone visits this URL, the function home() will execute.
# This uses a decorator to tell Flask which URL will cause the function below  it to execute.

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'kamauharrison@gmail.com'
app.config['MAIL_PASSWORD'] = 'l3d23pp3l1n'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail.init_app(app)

@app.route('/contact', methods=['GET','POST'])
def contact():
form = ContactForm()

if request.method == 'POST':
    if form.validate() == False:
        flash('All fields are required.')
        return render_template('index.html', form=form)
    else:
        msg = Message(form.subject.data, sender='contact@example.com')
        msg.recipients = ["kamauharrison87@gmail.com"]
        msg.body="""
        From: %s <%s>
        %s
        """ % (form.name.data, form.email.data,  form.message.data)
        mail.send(msg)

        return render_template('posted.html')

elif request.method == 'GET':
    return render_template('index.html', form=form)

# Use run() to run our app on a local server.
if __name__ == '__main__':
app.run(debug = True)
