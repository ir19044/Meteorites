/*
Ilja Repko, ir19044
 */

var lookup = {};
var recclasses = [];
var table = document.getElementsByTagName("table")[0];


function Tabulas_galva() {
    var thead = table.createTHead();
    var row = thead.insertRow(0);

    for(let i=0;i<6;i++){
        var th = document.createElement("th");
        row.appendChild(th);

        switch (i) {
            case 0:
            th.innerHTML="ID"; 
            th.setAttribute('rowspan','2');  
            th.setAttribute('height','50px');  
            th.setAttribute('width','30px');  
            break; 
            case 1:
            th.innerHTML="Class"; 
            th.setAttribute('rowspan','2');
            th.setAttribute('width','120px');
            break; 
            case 2:
            th.innerHTML="Year"; 
            th.setAttribute('rowspan','2');
            th.setAttribute('width','30px');
            break; 
            case 3:
            th.innerHTML="Name"; 
            th.setAttribute('rowspan','2');
            th.setAttribute('width','150px');
            break; 
            case 4:
            th.innerHTML="Mass"; 
            th.setAttribute('rowspan','2');
            th.setAttribute('width','100px');
            break; 
            case 5:
            th.innerHTML="Coordinates"; 
            th.setAttribute('colspan','2');
            th.setAttribute('id','coordinat');
            var row2 = thead.insertRow(-1);
            for(let j=0; j<2; j++){
                var th2=document.createElement("th");
                th2.setAttribute("id","col1");
                row2.appendChild(th2);
                if (j ==0){
                    th2.innerHTML = "Latitide";
                    row2.appendChild(th2);    
                } else {
                    th2.innerHTML = "Longitude";
                    th2.setAttribute("id","col2");
                    row2.appendChild(th2);   
                }
            }
        }  
    }
Create_table();
}

function Create_table(){
    for (let i in data){
        var tr = document.createElement("tr");
        tr.setAttribute("id","trr"+i);
        var td_ID = document.createElement("td");
        var td_class = document.createElement("td");
        var td_year = document.createElement("td");
        var td_name = document.createElement("td");
        var td_mass = document.createElement("td");
        var td_latitude = document.createElement("td");
        var td_longitude = document.createElement("td");

        td_ID.innerHTML = data[i].id;
        tr.appendChild(td_ID);
        td_class.innerHTML = data[i].recclass;
        tr.appendChild(td_class);
        if (data[i].year) td_year.innerHTML = data[i].year.substring(0,4);
        else td_year.innerHTML = "undefined";
        tr.appendChild(td_year);
        td_name.innerHTML = data[i].name;
        tr.appendChild(td_name);
        td_name.setAttribute("id","name"+i);
        td_mass.innerHTML = data[i].mass;
        tr.appendChild(td_mass);
        td_latitude.innerHTML = data[i].reclat;
        tr.appendChild(td_latitude);
        td_latitude.setAttribute("id","first"+i);
        td_longitude.innerHTML = data[i].reclong;
        tr.appendChild(td_longitude);
        td_longitude.setAttribute("id","second"+i);
        table.appendChild(tr);
    }
}
Tabulas_galva();

for (let i in data) {
    var recclass = data[i].recclass;
    if (recclass && !(recclass in lookup)) {
        lookup[recclass] = 1;
        recclasses.push(recclass);
    }
}




/*Class*/
let mas = new this.Array();
var option;
var select;
window.onload=function(){
    select = document.getElementById("class-select");
    for(let i in recclasses){
        mas[i] = recclasses[i];  
    }
    mas.sort();
    for(let i=-1;i<mas.length;i++){
        option = document.createElement("option");
         if(i>=0) option.text=mas[i];
         else option.text='-';
         select.appendChild(option);
     }  
}







/*Hide coordinates*/
var count = -1;
function hide_coordinates() {
    var words = document.getElementById('hide');
    count++;
    if(count/2 == 0) words.innerHTML = "Show coordinates"; else{ 
        words.innerHTML = "Hide coordinates"; 
        count=-1;
    }
    let elem3=document.getElementById("coordinat");
    let elem4=document.getElementById("col1");
    let elem5=document.getElementById("col2");
    if(count ==0){
        for(var i in data){
            let elem1=document.getElementById("first"+i);
            let elem2=document.getElementById("second"+i);
            elem1.hidden = true; 
            elem2.hidden=true;
        }
        elem3.hidden=true;
        elem4.hidden=true;
        elem5.hidden=true;  
    } else {
        for(let i in data){  
            let elem1=document.getElementById("first"+i);
            let elem2=document.getElementById("second"+i);  
            elem1.hidden = false;
            elem2.hidden=false;
        }
        elem3.hidden=false;
        elem4.hidden = false;
        elem5.hidden = false; 
    }
}



/*Click the button or write more than 1 letter for name*/
var name = document.getElementById("search").value;
function show_list(){ 
    if(document.getElementById("search").value.length>1 || document.getElementById("search").value.length==0){
        for (let i in data){  
            var n=document.getElementById("class-select").options.selectedIndex;
            var m=document.getElementById("year-from").value;
            var l=document.getElementById("year-until").value;
            var name = document.getElementById("search").value;
       
            var a = data[i].recclass;
            var b = select.options[n].text;
            var q = document.getElementById("trr"+i);
            var w = document.getElementById("name"+i);
            toString(w);
            w = w.innerHTML;
            tmp = 0;
            if (w.indexOf(name.toString())!= -1) tmp=1;
            if(tmp==0 && name !='') {q.hidden = true; continue;}
            if(correctdate(m,l) && (m.length==4 || m=='') && (l.length==4 || l=='')){ //&& toString(m).length==4 && toString(l).length==4
                if(data[i].year){
                    if(m != '' && m.length!=4) m = parseInt(m);
                    if(l != '' && l.length!=4) l = parseInt(l);
                    c = parseInt(data[i].year.substring(0,4), 10);
                    if((( b == "-" && m == '' && l =='') || (b == "-" && m=='' && c<=l)) || (b == "-" && c>=m && l=='') || (b == "-" && c>=m && c<=l) ||
                    ( a==b && m == '' && l =='') || ( a==b && m=='' && c<=l) || ( a==b && c>=m && l=='') || ( a==b && c>=m && c<=l) ){
                        q.hidden = false;
                    } else q.hidden = true;   
                } else q.hidden = true;
            } else q.hidden=true; 
            if ( (b == "-" && m == '' && l =='') || ( a==b && m == '' && l =='')) q.hidden=false;
        } if((!(correctdate(m,l))) || (m.length!=4 && m!='') || (l.length!=4 && l!='')) alert("KĻŪDA! Gadi tika ievadīti nepareizi");
    }
}



/*Datu korekts ievads*/
function correctdate(c,d){
    if( (c!='' && d!='') && (parseInt(c)<1700) || (parseInt(c)>2019) || parseInt(c)>parseInt(d)) return 0;
    else if ((c!='') && (parseInt(c)<1700) || (parseInt(c)>2019)) return 0;
    else if ((d!='') && (parseInt(d)<1700) || (parseInt(d)>2019)) return 0;
    else return 1;
}