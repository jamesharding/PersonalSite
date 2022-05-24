title: Build a Simple, Static, Markdown-Powered Blog with Flask
date: 2019-11-16
description: A short tutorial explaining how to set up a static Markdown blog in Flask in just a few lines of Python.
tags: programming

For years, I used and adored Wordpress as my go-to blogging platform. It was quick to install, easy to use, and had a ton of <s>bloat</s> functionality that I simply never used. Flask has been my framework of choice when starting a new web project for a while now, and I wanted a dead-simple solution for managing my mostly static site and handling my _occasional_ writing.  I had the following requirements

* Must build into static site
* Posts composed in Markdown <3
* Ability to include code snippets

Before we begin, I recommend having a quick read of the [Flask Documentation](http://flask.pocoo.org/docs/quickstart/) to familiarise yourself with the basics of Flask.


### Ingredients

Let's start with our Python dependencies. We are using Flask 2.1 and Python 3.8

    Click==8.1.3
    Flask==2.1.2
    Flask-FlatPages==0.8.1
    Frozen-Flask==0.18
    Markdown==3.3.7
    Pygments==2.12.0
    PyYAML==6.0
	
I will assume that you know a little about [venv](http://iamzed.com/2009/05/07/a-primer-on-virtualenv/). If not, you should probably be using it for all of your Python projects. Drop the above list into a file named requirements.txt and execute `pip install -r requirements.txt` from your shell. You are now ready to start building your blog.

### Folder Structure

We need to create folders to store our static markdown pages, in addition to our standard templates and static files folders.

	:::text
	├── blog.py
	├── content
	│   └── posts
	│       └── firstpost.md
	├── static
	└── templates
	
	4 directories, 2 files

Your stylesheets and javascript files will go in the static directory, and all of your posts will go in the… I think that you can probably guess which folder :)

### The Routes File

Flask makes it dead simple to declare a pretty URL scheme for your blog with the route wrapper functions. To begin, we need to make sure that we import all of the required packages. Create a new file named `blog.py` and open it up. It should look something like this...

	:::python
	import sys
	from flask import Flask, render_template
	from flask_flatpages import FlatPages, pygments_style_defs
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
	
	if __name__ == "__main__":
	    if len(sys.argv) > 1 and sys.argv[1] == "build":
	        freezer.freeze()
	    else:
	        app.run(host='0.0.0.0', debug=True)

Great, we have the beginnings of our blog. Time to add some routes that will serve our blog posts. You can [add your own routes](http://flask.pocoo.org/docs/quickstart/#routing) for custom pages here too. We will define the *posts* route to find and list all of our posts, and *post* will create a page for each one. Let's add the following immediately before the `if __name__ == "__main__"` line.

	:::python
	@app.route("/posts/")
	def posts():
		posts = [p for p in flatpages if p.path.startswith(POST_DIR)]
		posts.sort(key=lambda item:item['date'], reverse=False)
		return render_template('posts.html', posts=posts)
	
	@app.route('/posts/<name>/')
	def post(name):
	    path = '{}/{}'.format(POST_DIR, name)
	    post = flatpages.get_or_404(path)
	    return render_template('post.html', post=post)
	    
The first route will iterate over the list of posts, and pass this to the template which we will look at shortly. I chose to sort by date. 10 lines of code, and this covers all of the *blog* logic that we have to deal with.

### Templates

Start by making a new template for the list of posts. I will give you a bare minimal snippet, beyond that it is up to you! We will name this file **posts.html** and place it in the templates directory:

	:::jinja
	{% for post in posts %}
    	<a href="{{ url_for('post', name=post.path.replace('posts/', '')) }}">
       		{{ post.title }}
   		</a>
   		<small>{{ post.date }}</small>
  	{% endfor %}
  	
And for **post.html**, drop the following into your template wherever you want them displayed!

	:::jinja
	{{ post.html|safe }}
	{{ post.title }}
	{{ post.date }}
	
Now you're cooking with a Flask!

### How About The Posts
	
Oh yeah, this is the easy part. If you are on Mac, I would recommend [Mou](http://mouapp.com/) as your editor, and for those on Windows [MarkdownPad](http://markdownpad.com/) comes highly commended. You will store your markdown files in the `content/posts/` directory as `some_file_name.md`, and include a small amount of metadata in each file.
	
	:::text
	title: Should it be YYYY-MM-DD or YYYY-DD-MM? My Thoughts
	date: 2013-08-27
	
	American-style dates. I know, I know.
	
	You can have:
	* Lists
	* More Lists
	
	> And block quotes
	
		And event highlighted code if you indent :)

### Lets Build This Thing

If you want to run this server to test on your local machine, you can simply run the script using `python blog.py`.

When you are happy and want to generate the static site, use `python blog.py build` and a new **build** directory will be created with your new static blog.

Deploy away :)