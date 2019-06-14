var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

function clas(params,visualRecognition) {
    return new Promise(function(resolve, reject) {
        visualRecognition.classify(params, function(err, response) {
            if (err) { 
                reject(err);
            } else {
              resolve(response);
              console.log(response);
            }
        });
    });
}

module.exports = {
    analizar: async function(link){

var visualRecognition = new VisualRecognitionV3({
    version: '2019-03-19',
    iam_apikey: '<INGRESAR-APIKEY-DE-WVR>',
    disable_ssl_verification: true

});

var url = link;
console.log(url);
var classifier_ids = ["food"];
var threshold = 0.6;

var params = {
	url: url,
	classifier_ids: classifier_ids,
	threshold: threshold
};

let valores = await clas(params, visualRecognition);

let data = valores;
var comidas = [];
var scores = [];
var classes = data.images[0].classifiers[0].classes;
for (let x=0;(x<classes.length) && (x<4);x++){
       comidas [x]= classes[x].class;
        scores [x]= classes [x].score;
}
var msgInfo = "Segun mi razonamiento, tu imagen tiene las siguientes caracteristicas: \n";
for (x = 0; x < comidas.length; x++){
  msgInfo += comidas[x] + "  "+ Math.trunc(scores[x]*100) + " %; \n"
}
        return msgInfo;
    }
}