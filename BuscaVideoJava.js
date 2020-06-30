var VideoContainer = document.getElementById("video_info");

var digitado  = document.getElementById("text-to-find");

entrou = true;

nachou = true;

arrtags = [];

alltags = [];

arrlinks = [];

alllinks = [];

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://raw.githubusercontent.com/Albina-fazenda/repo2/master/R2.json');

ourRequest.onload = function() {
OurData=JSON.parse(ourRequest.responseText);
coletalinks(OurData);
criaArray(OurData);
naoPesquisa(OurData);
autocomplete(document.getElementById("text-to-find"), alltags);

};

ourRequest.send();

digitado.addEventListener("keyup", function(event) {
   
        if (event.keyCode === 13) {
            nachou =true;
            pesquisar(digitado.value);
           
            };
      
  });

function coletatags(data){

    for (i = 0; i < data.length; i++) {      

    arrtags = data[i].tg;

    alltags = alltags.concat(arrtags);

    };

};
 
function coletalinks(data){
  
    for (i = 0; i < data.length; i++) {      

    arrlinks = data[i].link;

    alllinks = alllinks.concat(arrlinks);
    
    };

};

function pesquisar (item){  

    limpar();
    
    item = digitado.value.toLowerCase();
        for (i=0; i<OurData.length; i++) { 

        for (d=0; d<OurData[i].tg.length; d++){

         
    if (item === OurData[i].tg[d]) {

    mostrarvideo(OurData);    
    nachou = false;

    } else {  
     
      };
    
        };

        };

        if (nachou) {
            alert("Nenhum video foi encontrado");

// Пример отправки POST запроса:
async function postData(url = 'https://raw.githubusercontent.com/Albina-fazenda/SAVE/master/lista.json', data = { username: 'example' }) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
};

postData('https://raw.githubusercontent.com/Albina-fazenda/SAVE/master/lista.json', { answer: 42 })
  .then((data) => {
    console.log(data); // JSON data parsed by `response.json()` call
  });
          
            //var listRequest = new XMLHttpRequest(); 
            //listRequest.open('POST', 'https://raw.githubusercontent.com/Albina-fazenda/repo2/master/procura.json');
            //listRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            //, 'Access-Control-Allow-Origin: *', 'Access-Control-Allow-Credentials: true');
            //listRequest.addRequestHeader('Access-Control-Allow-Headers "origin, x-requested-with, content-type"');
            //listRequest.withCredentials = true; 
            //listRequest.onreadystatechange = handler;
            //listRequest.onload = function() {
            // var procurado = '{ name:"'+digitado.value+'"},';
            // var listaProcura = JSON.stringify(procurado);
             //};
             //listRequest.send();   
             
            digitado.value = "";
            item = digitado.value.toLowerCase();
            naoPesquisa();
          
        };

};

function mostrarvideo(data){
 
   var htmlString = '<a href="' + data[i].name +
   '"> <img src="' + data[i].thumb +
    '" style="width:320px;height:180px;border:0;"></a><br>'+data[i].label; 

    var manual = "";
    var pagina = "";

    var n = document.createElement('DIV');
    n.setAttribute("class", "superbox");
    var h = document.createElement('DIV');
    h.setAttribute("class", "videobox");
    h.insertAdjacentHTML('beforeend', htmlString);
    n.appendChild(h);
    var l = document.createElement('DIV');
    l.setAttribute("class", "linkbox");


    for (ii=0; ii<data[i].link.length; ii++) {
     
        manual = data[i].link[ii];
               
        ii++

        pagina = data[i].link[ii];
        
        var link = '<a href="https://files.support.epson.com/docid/cpd5/cpd55467.pdf#page='+pagina+'">'+manual+'</a><br>';

        l.insertAdjacentHTML('beforeend', link);
        n.appendChild(l);

    };
    
    VideoContainer.appendChild(n);
    
 
};

function autocomplete(inp,arr) {

    var currentFocus;
    inp.addEventListener("input", function(e) {

        var a, b, i, ii, val = this.value;
        val = val.toLowerCase();
        var palavrasArray = [];

        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        
        this.parentNode.appendChild(a);
       
        for (i = 0; i < arr.length; i++) {
          
          for (ii = 0; ii < arr[i].length-1; ii++) {

              if (arr[i].trim().substr(ii, val.length).toUpperCase() ==  val.toUpperCase()) {                      
               
               b = document.createElement("DIV");                              
               
               var inPal = "";
               var finPal = "";
            
               inPal = arr[i].substr(0,arr[i].indexOf(val));
               finPal = arr[i].substr(arr[i].indexOf(val)+val.length, arr[i].length-inPal.length-val.length);
              
               b.innerHTML = inPal + "<strong>" + val + "</strong>" + finPal;
               b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
               b.addEventListener("click", function(e) {
                
                inp.value = this.getElementsByTagName("input")[0].value;
                
                closeAllLists();
           
            });

          if (palavrasArray[i] != b.innerText) {
              a.appendChild(b); 
              palavrasArray[i]= b.innerText;

            } else {
              
            };
           
          } 


          }
       }
    });
   
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
       
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          
          currentFocus++;
          addActive(x);

        } else if (e.keyCode == 38) { 
          currentFocus--;
          addActive(x);

        } else if (e.keyCode == 13) {
          e.preventDefault();

          if (currentFocus > -1) {
            
            if (x) x[currentFocus].click();
            pesquisar(OurData);
          } else if (currentFocus = -1) {
            
            limpar();
            naoPesquisa(OurData);

          };

    
          };
        
    });

    function addActive(x) {
      
      if (!x) return false;
      removeActive(x);

      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
      
    }
    function removeActive(x) {
     
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
        nachou = true;
        
    });
  };

function limpar() {

    for (i=0; i<myElement.childNodes.length; i=i) {
    myElement.removeChild(myElement.childNodes[i]);
    };
   
    for (i=0; i<VideoContainer.childNodes.length; i=i) {
    VideoContainer.removeChild(VideoContainer.childNodes[i]);
    }; 
};

function naoPesquisa (data) {

    for (i=0; i<OurData.length; i++) { 
      
      mostrarvideo(OurData);
      
    };

};

function criaArray (data) {

  for (i = 0; i < data.length; i++) {      
   
    for (ii=0;  ii < data[i].tg.length; ii++ ) {
        
      function findInArray(tag) {
      return tag === data[i].tg[ii];
  
      };

      if (alltags.find(findInArray)) {
        
      } else {
        alltags = alltags.concat(data[i].tg[ii]);
        };

    };

  };

};
