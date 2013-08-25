import sys
from flask import Flask
from flask import render_template

from flask_flatpages import FlatPages
from flask_frozen import Freezer

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'
FLATPAGES_ROOT = 'content'
POST_DIR = 'posts'

app = Flask(__name__)
flatpages = FlatPages(app)
freezer = Freezer(app)

app.config.from_object(__name__)

@app.route("/")
def home():
	return render_template('home.html')

@app.route("/engineer/")
def engineer():
	return render_template('engineer.html')

@app.route("/aviation/")
def aviation():
	return render_template('aviation.html')

@app.route("/hobbies/")
def hobbies():
	return render_template('hobbies.html')

@app.route("/projects/")
def projects():
	return render_template('projects.html')

@app.route("/work-experience/")
def workexperience():
	return render_template('workexperience.html')

@app.route("/posts/")
def posts():
	posts = [p for p in flatpages if p.path.startswith(POST_DIR)]
	print posts
	return render_template('posts.html', posts=posts)

@app.route('/posts/<name>/')
def post(name):
    """For blogpost type pages"""
    path = '{}/{}'.format(POST_DIR, name)
    post = flatpages.get_or_404(path)
    return render_template('post.html', post=post)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html'), 404

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        freezer.freeze()
    else:
        app.run(debug=True)