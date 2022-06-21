from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
from mysteries import mysteries

app = Flask(__name__)
CORS(app)

db_username = mysteries.get('DATABASE_USER')
db_password = mysteries.get('DATABASE_PASSWORD')
db_name = mysteries.get('DATABASE_NAME')

mydb = mysql.connector.connect(host = "localhost", user = db_username,
    passwd = db_password, database = db_name, auth_plugin = "mysql_native_password")
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