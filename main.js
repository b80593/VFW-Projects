/* Project: Web App Part 4
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
        var radios = document.forms[0].gender;
        for(var i=0; i<radios.length; i++){
            if(radios[i].checked){
                genderValue = radios[i].value;
            }
        }
    }
    //Set value of the checkbox
    function getCheckValue(){
        if($("worship").checked){
            departValue = $("worship").value;     
        }else{
            departValue = "No"   
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
    
  
    function storeData(key){
        //If there is no key, this means is a brand new item give a new key
        if(!key){
            var id   = Math.floor(Math.random()*1000000001);
        }else{
            id = key;
        }       
        //Gather up all our form field value and store in a object.
        //Object properties contain array with the form label and input value.
        getSelectedRadio();
        getCheckValue();
        var item            = {};
            item.fname      =["Full Name:", $('fname').value];
            item.address    =["Address:", $('address').value];
            item.phone      =["Phone:", $('phone').value];
            item.email      =["Email:", $('email').value];
            item.about      =["Hear about Us:", $('acceso').value];
            item.ekkipo     =["Discipleship:", departValue];
            item.worship    =["Department:", $('worships').value];
            item.date       =["Birth Date:", $('date').value];
            item.age        =["Age:", $('age').value];
            item.sex        =["Gender:", genderValue];
            item.comments   =["Comments:", $('comments').value];
        //Save date into Local Storage: convert our object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Member Information is Saved!");
    }
    
    function getData(){
        toggControls("on");
        if(localStorage.length === 0){
            alert("There is no data in Local Storage so default data was added.");
            autoFillData();
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
            makeLi.setAttribute("id", "listitem");
            var lnksLi = document.createElement('li');
            mkeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //Convert string from LS back to Object using JSON.parse()
            var objeW = JSON.parse(value);
            var mkeSbList = document.createElement('ul');
            makeLi.appendChild(mkeSbList);
            getImage(obj.group[1], mkeSbList);
            for(var n in objeW){
                var mkeSubLi = document.createElement('li');
                mkeSbList.appendChild(mkeSubLi);
                var optSubText = objeW[n][0]+" "+objeW[n][1];
                mkeSubLi.innerHTML = optSubText;
                mkeSbList.appendChild(lnksLi);
            }
            mkeItemLnks(localStorage.key(i), lnksLi); //Links for edit and delete 
        }
        
    }
    //Get Image for the right Ministry
    function getImage(catName, mkeSbList){
        var imageLi = document.createElement("li");
        mkeSbList.appendChild(imageLi);
        var newImg = document.createElement("img");
        var setSrc = newImg.setAttribute("src", "images/"+ catName + ".png");
        imageLi.appendChild(newImg);
        
    }
    //Auto Populate Local Storage
    function autoFillData(){
        //The data required for this to work is coming from our json.js file, which is loaded from our html
        //Store the JSON Obj into Local Storage
        for (var n in json){
            var id = Math.floor(Math.random()*1000000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
    }
    //Item Links
    // Create links for each stored item when displaed
    function mkeItemLnks(key, lnksLi){
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editTxt = "Edit Member Info";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editTxt;
        lnksLi.appendChild(editLink);
        
        //add line break
        var breakTg = document.createElement('br');
        lnksLi.appendChild(breakTg);
        
        
        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteTxt = "Delete Member Info";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteTxt;
        lnksLi.appendChild(deleteLink);
    }
    
    function editItem(){
        //Grab data info from Local Storage.
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        
        //show Form
        toggControls("off");
        
        $('fname').value = item.fname[1];
        $('address').value = item.address[1];
        $('phone').value = item.phone[1];
        $('email').value = item.email[1];
        $('acceso').value = item.about[1];
        if (item.ekkipo[1] == "Yes") {
            $("worship").setAttribute("checked", "checked");
        }
        $('worships').value = item.worship[1];
        $('date').value = item.date[1];
        $('age').value = item.age[1];
        var radios = document.forms[0].gender;
        for(var i=0; i<radios.length; i++){
            if(radios[i].value == "Male" && item.sex[1] == "Male"){
                radios[i].setAttribute("checked", "checked");
            }else if(radios[i].value == "Female" && item.sex[1] == "Female"){
                radios[i].setAttribute("checked", "checked");
            }
        }
        
        //Removed the initial listener from the input 'submitInfo' buttom.
        submitInfo.removeEventListener("click", storeData);
        //Change submit value to Edit Button
        $("submit").value = "Edit Member Info";
        var editSubmit = $("submit");
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;    
    }
    
    function deleteItem(){
        var ask = confirm("Are you sure you want to DELETE this member info?");
        if(ask){
            localStorage.removeItem(this.key);
            alert("Member Info was deleted!!");
            window.location.reload();
        }else{
            alert("Member Info was NOT deleted.")
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
    function validate(e){
        //Define elements
        var getFname = $('fname');
        var getEmail = $('email');
        var getAbout = $('acceso');
        
        //Reset Error Message
        errMsg.innerHTML = "";
            getFname.style.border = "1px solid black";
            getEmail.style.border = "1px solid black";
            getAbout.style.border = "1px solid black";

        
        // Get error messages
        var messArray = [];
        //Full Name Validation
        if(getFname.value=== ""){
            var fNameError = "Please enter Full Name.";
            getFname.style.border = "1px solid red";
            messArray.push(fNameError);
        }
        
        //Email Validation
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!(re.exec(getEmail.value))){
            var emailError = "Please enter a valid email address.";
            getEmail.style.border = "1px solid red";
            messArray.push(emailError);
        }
        
        //About US Validation  
        if(getAbout.value==="--Choose One--"){
            var aboutError = "Please Choose, How you hear about us:";
            getAbout.style.border = "1px solid red";
            messArray.push(aboutError)
        }
        
        //If errors display them on screen.
        if (messArray.length >= 1){
            for(var i=0, j=messArray.length; i < j; i++){
                var txt = document.createElement('li');
                txt.innerHTML = messArray[i];
                errMsg.appendChild(txt);
            }
            e.preventDefault();
                return false;
        }else{
            //if all is ok save data
            storeData(this.key);
        }
        
    }  
    
    //Variable defaults
    var aboutUs = ["--Choose One--", "Facebook", "Twitter", "Website", "Friend", "Other"],
        genderValue,
        departValue = "No",
        errMsg = $('errors')
    ;
    makeCont();
    
    //Set Links & Submit Click Events
    var displayLink = $("displayInfo");
    displayLink.addEventListener("click", getData);
    var clearLink = $("clearInfo");
    clearLink.addEventListener("click", clearLocal);
    var submitInfo = $("submit");
    submitInfo.addEventListener("click", validate);

});