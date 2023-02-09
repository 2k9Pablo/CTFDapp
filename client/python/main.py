from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/flags", methods=["POST"])
def compare_strings():
    incoming_string = request.get_json()["string"]

    # Compare the incoming string to another string
    if incoming_string == "df412cf499822853aa22a6d459b1a7caa926b3d24e57c98ddcab6041a60d0107":
        return jsonify({"result": "HackOn{c0ng4ts_m4t3}"})
    
    if incoming_string == "f9bb8e8c330762612b5e8a4b09d985fea26e32696ab546082d4e3ef78452d886":
        return jsonify({"result": "HackOn{U_4_M4st3r}"})

    return jsonify({"result": "Strings do not match"})

if __name__ == "__main__":
    app.run(debug=True)