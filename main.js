/* Project: Web App Part 2
        William Rivera
        Visual Frameworks 1302
*/

//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
    
    //getElementById Function
    function $(x){
        var myElement = document.getElementById(x);
        return myElement;
    }
    
    //Create select field element and populate
    function makeCont(){
        var formTag = document.getElementsByTagName("form"),
            selectLi = $("select"),
            makeSelect = document.createElement('select');
            makeSelect.setAttribute("id", "acceso");
        for(var i=0, j=aboutUs.length; i<j; i++){
            var makeOption =document.createElement("option");
            var optText = aboutUs[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }
    //Find value of a selected radio button.
    function getSelectedRadio(){
        var radios = document.forms[0].gender ;
        for(var i=0; i<radios.length; i++){
            if(radios[i].checked){
                genderValue = radios[i].value;
            }
        }
    }
    //Set value of the checkbox
    function getCheckValue(){
        var checkedIt = document.forms[0].ekkipo;
        for(var i=0; i<checkedIt.length; i++){
            if(checkedIt[i].checked){
                departValue[i] = checkedIt[i].value;
            }
        }  
    }
    
    //Toggle Controls
    function toggControls(n){
        switch(n){
            case "on":
                $('MemRegForm').style.display ="none";
                $('clearInfo').style.display = "inline";
                $('displayInfo').style.display = "none";
                $('addMember').style.display = "inline";
                break;
            case "off":
                $('MemRegForm').style.display ="block";
                $('clearInfo').style.display = "inline";
                $('displayInfo').style.display = "inline";
                $('addMember').style.display = "none";
                $('items').style.display = "none";
                break;
            default:
                return false;
        }
    }
    
  
    function storeData(){
        var id   = Math.floor(Math.random()*1000000001);
        //Gather up all our form field value and store in a object.
        //Object properties contain array with the form label and input value.
        getSelectedRadio();
        getCheckValue();
        var item            = {};
            item.fname      =["Full Name:", $("fname").value];
            item.address    =["Address:", $("address").value];
            item.phone      =["Phone:", $("phone").value];
            item.email      =["Email:", $("email").value];
            item.about      =["Hear about Us:", $("acceso").value];
            item.ekkipo     =["Department:", departValue];
            item.worship    =["Instrument:", $("worships").value];
            item.date       =["Birth Date:", $("date").value];
            item.age        =["Age:", $("age").value];
            item.sex        =["Gender:", genderValue];
            item.comments   =["Comments:", $("comments").value];
        //Save date into Local Storage: convert our object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Member Information is Saved!");
    }
    
    function getData(){
        toggControls("on");
        if(localStorage.length === 0){
            alert("There is no data in Local Storage.");
        }
        //Write Data back to the Browser
        var mkeDiv = document.createElement('div');
        mkeDiv.setAttribute("id", "items");
        var mkeList = document.createElement('ul');
        mkeDiv.appendChild(mkeList);
        document.body.appendChild(mkeDiv);
        $('items').style.display = "block";
        for(var i=0, len=localStorage.length; i<len;i++){
            var makeLi = document.createElement('li');
            mkeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //Convert string from LS back to Object using JSON.parse()
            var objeW = JSON.parse(value);
            var mkeSbList = document.createElement('ul');
            makeLi.appendChild(mkeSbList);
            for(var n in objeW){
                var mkeSubLi = document.createElement('li');
                mkeSbList.appendChild(mkeSubLi);
                var optSubText = objeW[n][0]+" "+objeW[n][1];
                mkeSubLi.innerHTML = optSubText;
            }
        }
        
    }
    
    //Clear Local Storage
    function clearLocal(){
        if(localStorage.length === 0){
            alert("There is no data to clear.")
        }else{
            localStorage.clear();
            alert("Everything is Gone!!");
            window.location.reload();
            return false;
        }
    }
    
    //Variable defaults
    var aboutUs = ["--Choose One--", "Facebook", "Twitter", "Website", "Friend", "Other"],
        genderValue,
        departValue = [""]
    ;
    makeCont();
    
    //Set Links & Submit Click Events
    var displayLink = $("displayInfo");
    displayLink.addEventListener("click", getData);
    var clearLink = $("clearInfo");
    clearLink.addEventListener("click", clearLocal);
    var submitInfo = $("submit");
    submitInfo.addEventListener("click", storeData);

});