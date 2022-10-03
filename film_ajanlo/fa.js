var mydata;
$.getJSON("test.json", function(json) {
    console.log(json); // this will show the info it in firebug console
    mydata=json
});
function TipusKereses(id){//Bemeno adatok beolvasasa
    let kivantTipusSV = new Array();
    for (let i = 0; i < 7; i++) {
        let checkBox = document.getElementById(id+i);
        if (checkBox.checked==true) {
            kivantTipusSV.push(checkBox.value)
        }
    }
    return kivantTipusSV;
}
function CheckRemove() {//check boxok false-a tetele
    for (let i = 0; i < 7; i++) {
        let checkBox1 = document.getElementById("id"+i);
        let checkBox2 = document.getElementById("noid"+i);
        checkBox1.checked = false;
        checkBox2.checked = false;
    }
}

function AzonosType(kivantTipus,nemKivantTipus){//azonos tipusok deaktivalasa
    for (let i = 0; i < kivantTipus.length; i++) {
        for (let j = 0; j < nemKivantTipus.length; j++) {
            if (kivantTipus[i]==nemKivantTipus[j]) {
                alert("Ne legyen azonos a kívánt és nem kívánt típusok között :)");
                CheckRemove();
                return true;
            }
        }
    }
    return false;
}
function FilmekKizarasa(mydata,kivanatosTipus, nemKivantTipus) {//rossz filmek kizarasa
    var lehetHogyJo = new Array();
    for (let i = 0; i < mydata.length; i++) {
        var kilep = false;
        for (let j = 0; j < mydata[i].type.length; j++) {
            kilep = false;
            for (let k = 0; k < nemKivantTipus.length; k++) {
                if (mydata[i].type[j] == nemKivantTipus[k]) {
                    kilep=true;
                    break;
                } 
            }
            if (kilep==true) {
                break;
            }
        }
        if (kilep == false) {
            lehetHogyJo.push(mydata[i]);
        }
    }
    //console.log(lehetHogyJo);
    JoFilmek(kivanatosTipus,lehetHogyJo);
}
function JoFilmek(kivanatosTipus,lehetHogyJo) {// jo/ajanlott filmek lementese
    var ajanlottFilmek = new Array();
    for (let i = 0; i < lehetHogyJo.length ; i++) {
        for (let j = 0; j < kivanatosTipus.length; j++) {
            var kilep = false;
            for (let k = 0; k < lehetHogyJo[i].type.length; k++) {
                if (kivanatosTipus[j] == lehetHogyJo[i].type[k]) {
                    ajanlottFilmek.push(lehetHogyJo[i]);
                    kilep = true;
                    break;
                }
            }
            if (kilep==true) {
                break;
            }
        }
    }
    KiIras(ajanlottFilmek);
}
function KiIras(valasz) {//Vegleges megjelenites
    var filmDiv = document.getElementById("ajanlottFilmek")
    for (let i = 0; i < valasz.length; i++) {
        var div = document.createElement("div")
        let img = document.createElement("img");
        let p = document.createElement("p");
        div.style.textAlign = "center";
        div.style.paddingBottom = "16px";
        img.src = valasz[i].kep;
        img.style.width="100px"
        img.id="kep";
        img.addEventListener("click",()=>{FilmModal(valasz);});
        div.append(img);
        p.append(valasz[i].name);

        div.append(p);






        console.log("asd")
        filmDiv.appendChild(div);
    }
}

function FilmModal(params) {
    var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
    myModal.show();
}

function Kereses () {//main function 
    document.getElementById("ajanlottFilmek").innerHTML="<h2>Ajanlott filmek: </h2>";
    var kivantTipus = new Array();
    var nemKivantTipus = new Array();
    kivantTipus = TipusKereses("id");//feltoltes
    nemKivantTipus = TipusKereses("noid");//feltoltes
    if (!AzonosType(kivantTipus,nemKivantTipus)) {//
        FilmekKizarasa(mydata,kivantTipus,nemKivantTipus);
    }   
}


