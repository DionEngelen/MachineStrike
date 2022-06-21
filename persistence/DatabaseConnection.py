from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

mydb = mysql.connector.connect(host = "localhost", user = "Dion",
    passwd = "machine97", database = "machine_strike", auth_plugin = "mysql_native_password")
my_cursor = mydb.cursor()

@app.route("/", methods = ["POST", "GET"])
def index():
    return "Hello World!"

@app.route("/boards", methods = ["GET"])
def get_boards():
    my_cursor.execute("select * from boards")
    result = my_cursor.fetchall()
    return jsonify(result)

@app.route("/machines", methods = ["GET"])
def get_machines():
    my_cursor.execute("select * from machines")
    result = my_cursor.fetchall()
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug = True)