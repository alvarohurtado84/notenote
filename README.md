# notenote

Notenote is... I do not know what. It is something related with blogging, maybe.

Notenote was born as something very different. A good friend designed a logo I love for me and I bought a domain so I am going to recycle that.

### How?

I will use Django + Django Rest Framework in the backend side. I will use ReactJS in frontend.

### Why?

- Because I want to learn how to build APIs.
- Because I want to learn how to build Single Page Applications.
- Because I want to use that brand for something
- Because why not.


### How to run this project?

Install python requirements:
```pip -r requirements/base.txt```

Install node requirements:
```npm install```
```npm install -g browserify```
```npm install -g react-tools```

Parse JSX to JS:
```jsx static/js/app/ static/js/build/```

Browserify it:
```browserify static/js/build/notenote.js -o static/js/app/app.js```

And runserver:
```python manage.py runserver```
