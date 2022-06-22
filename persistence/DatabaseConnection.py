from flask import Flask, jsonify
from json import loads
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
    columns = my_cursor.description
    results = [{columns[index][0]:column for index, column in enumerate(value)} for value in my_cursor.fetchall()]
    for result in results:
        result["tiles"] = loads(result["tiles"])
    return jsonify(results)

@app.route("/machines", methods = ["GET"])
def get_machines():
    my_cursor.execute("select * from machines")
    columns = my_cursor.description
    results = [{columns[index][0]:column for index, column in enumerate(value)} for value in my_cursor.fetchall()]
    for result in results:
        result["armor"] = loads(result["armor"])
        result["weak_spots"] = loads(result["weak_spots"])
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug = True)