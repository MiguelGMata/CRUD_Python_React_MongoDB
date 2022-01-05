from bson.objectid import ObjectId
from flask import Flask, request
from flask import json
from flask.json import jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

#initialiser
app = Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost/crudpythonreactdb'
mongo = PyMongo(app)

CORS(app)

db = mongo.db.users


#routes
@app.route('/')
def index():
    return '<h1>Serveur en route</h1>'

#----------------------route ajouter un utilisateur----------------------
@app.route('/users', methods=['POST']) 
def createUser():
    id = db.insert_one({
        'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password']
    })
    return jsonify(str(id))

#---------------------route recuperer tous les utilisateur---------------------
@app.route('/users', methods=['GET']) 
def getUsers():
    users=[]
    for doc in db.find(): #busqueda en la db
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'email': doc['email'],
            'password': doc['password']
        })
    return jsonify(users)
#jsonify c'est l'objet json
#----------------------route regarder un seul utilisateur----------------------
@app.route('/user/<id>', methods=['GET']) 
def getUser(id):
    user = db.find_one({'_id': ObjectId(id)})
    print(user)
    return jsonify({
        '_id': str(ObjectId(user['_id'])),
        'name': user['name'],
        'email': user['email'],
        'password': user['password'] 
    })

@app.route('/user/<id>', methods=['PUT']) #modifier un utilisateur
def updateUser(id):
    #print(id)
    #print(request.json)
    db.update_one({'_id': ObjectId(id)}, {'$set': {
        'name': request.json['name'],
        'email': request.json ['email'],
        'password': request.json['password'] 
    }})
    return jsonify({'msg': 'Utilisateur editer'})

 #------------------------efaccer un utilisateur----------------------
@app.route('/user/<id>', methods=['DELETE'])
def deleteUser(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': 'Utilisateur effacer'})

if __name__ == "__main__":
    app.run(debug=True)
