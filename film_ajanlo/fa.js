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

//----------------------------------------Modal-------------------------------------------------//
function KiIras(valasz) {//Vegleges megjelenites
var filmDiv = document.getElementById("ajanlottFilmek")
    console.log(valasz);
    for (let i = 0; i < valasz.length; i++) {
        var div = document.createElement("div")
        let img = document.createElement("img");
        let p = document.createElement("p");
        div.style.textAlign = "center";
        div.style.paddingBottom = "16px";
        div.classList.add("col-xxl-3", "col-xl-4", "col-md-6");           
        img.src = valasz[i].kep;
        img.style.width="150px"
        img.style.height="216px"
        img.id="kep";
        img.addEventListener("click",()=>{FilmModal(valasz[i]);});
        p.addEventListener("click",()=>{FilmModal(valasz[i]);});
        div.append(img);
        p.append(valasz[i].name);
        div.append(p);
      
        filmDiv.appendChild(div);
    }
}



function FilmModal(film) {
    var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
    myModal.show();
    $("#adatok").text("");
    $("#kepDiv").text("");

    let img = document.createElement("img");        
    let cim = document.createElement("h1");
    let megjelent = document.createElement("p");
    let mufaj = document.createElement("p");        
    let leiras = document.createElement("p");
    let hossz = document.createElement("p");

    let h = document.createElement("h6");
    let h1 = document.createElement("h6");
    let h2 = document.createElement("h6");
    

    img.src = film.kep;
    img.style.width="350px";
    //img.style.height="411px";
    img.style.paddingTop ="50px"
    
   
    h.append("Megjelenési év:");
    h1.append("Műfaj: ");
    h2.append("Leírás:");
    
    cim.append(film.name);    
    megjelent.append(film.date);
    mufaj.append(film.type);
    leiras.append(film.leiras);
    hossz.append("Hossz: "+film.hossz);
        
    
    $("#kepDiv").append(img);
    $("#adatok").append(cim);
    $("#adatok").append(h);
    $("#adatok").append(megjelent);
    $("#adatok").append(h1);
    $("#adatok").append(mufaj);
    $("#adatok").append(h2);
    $("#adatok").append(leiras);
    $("#adatok").append(hossz);
    
}



