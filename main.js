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
    
    //Find value of a selected radio button.
    function getSelectedRadio(){
        var radio = document.form[0].gender;
        for(var i=0; i<radio.length; i++){
            if(radios[i].checked){
            genderValue = radios[i].value;
            }
        }
    }
  
    function storeData(){
        var id   = Math.floor(Math.random()*1000000001);
        //Gather up all our form field value and store in a object.
        //Object properties contain array with the form label and input value.
        var item            = {};
            item.fname      =["Full Name:", $("fname").value];
            item.address    =["Address:", $("address").value];
            item.phone      =["Phone:", $("phone").value];
            item.email      =["Email:", $("email").value];
            //item.department =["Department:", departValue];
            item.worship    =["Instrument:", $("worship").value];
            item.date       =["Birth Date:", $("date").value];
            item.age        =["Age:", $("age").value];
            //item.gender     =["Gender:", genderValue];
            item.comments   =["Comments:", $("comments").value];
        //Save date into Local Storage: convert our object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Member Information is Saved!");
    }
    
    //Variable defaults
    
    
    //Set Links & Submit Click Events
    //var displayLink = $("displayInfo");
    //displayLink.addEventListener("click", getData);
    //var clearLink = $("clearInfo");
    //clearLink.addEventListener("click", clearLocal);
    var submitInfo = $("submit");
    submitInfo.addEventListener("click", storeData);

});