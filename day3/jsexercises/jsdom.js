function js_style() {
    paragraph.style.color = "red";
    //paragraph.style.font-size = "99px";
}

function getFormValue(){
    var fname = document.querySelector('input[name=firstname]').value;
    var lname = document.querySelector('input[name=lastname]').value;
    console.log(fname);
    console.log(lname);
}
