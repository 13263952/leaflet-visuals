from flask import Flask, jsonify, render_template, send_from_directory
import pandas as pd
import os
import json 
import flask




app = Flask(__name__)

# 3. Define what to do when a user hits the index route
@app.route("/")
def home():
    print("Server received request for 'Home' page...")
    return flask.render_template('index.html')


# 4. Define what to do when a user hits the /about route
@app.route("/about")
def about():
    print("Server received request for 'About' page...")
    return flask.render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)