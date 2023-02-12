from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/flags", methods=["POST"])
def compare_strings():
    incoming_string = request.get_json()["string"]

    # Compare the incoming string to another string
    if incoming_string == "4567890p098765456a78s9fsijhgbsfa243":
        return jsonify({"result": "HackOn{0ld_v3rsi0ns_sUck}"})
    
    if incoming_string == "234u78o97867564q32ewqdesfthy7ui6867":
        return jsonify({"result": "HackOn{U_4_M4st3r}"})

    return jsonify({"result": "Strings do not match"})

if __name__ == "__main__":
    app.run(debug=True)