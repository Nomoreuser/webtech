
let formContainer = document.getElementById("form-container");

let loginUsername = document.getElementById("loginUsername");
let loginPassword = document.getElementById("loginPassword");

let signupUsername = document.getElementById("signupUsername");
let signupPassword = document.getElementById("signupPassword");

// Function to show the form-container
function toForm(){
    formContainer.style.display = "block";
}

// Function to close the form-container
function closeForm() {

    signupUsername.value="";
    signupPassword.value="";
    document.getElementById("confirmPass").value ="";
    
    loginUsername.value="";
    loginPassword.value="";

    document.getElementById("checkUsers").style.display="none";
    document.getElementById("checkCreate").style.display="none";
    document.getElementById("confirmPass").style.outline="none";
    formContainer.style.display = "none";
}

// show sign up .. hiding log in 
document.getElementById("toSignup").addEventListener("click", function(event) {
    event.preventDefault();

    document.getElementById("signin").style.display = "none"; 
    document.getElementById("signup").style.display = "block";

    loginUsername.value="";
    loginPassword.value="";

    document.getElementById("checkUsers").style.display="none";
    document.getElementById("checkCreate").style.display="none";
    document.getElementById("confirmPass").style.outline="none";
});

// show log in .. hide sign up
document.getElementById("toLogin").addEventListener("click", function(event) {
    event.preventDefault();
    goLogin();
});

function goLogin(){
    signupUsername.value="";
    signupPassword.value="";
    document.getElementById("confirmPass").value ="";

    document.getElementById("checkUsers").style.display="none";
    document.getElementById("checkCreate").style.display="none";

    document.getElementById("signup").style.display = "none";
    document.getElementById("signin").style.display = "block";
}

document.addEventListener('input', ()=>{
    var password = document.getElementById("signupPassword").value;
    var confirmPass = document.getElementById("confirmPass").value;

    if(password == confirmPass && password !=""){
        var confirmPass = document.getElementById("confirmPass").style.outline="1px solid green";
    }else if(confirmPass.length >= password.length && password !=""){
        var confirmPass = document.getElementById("confirmPass").style.outline="1px solid red";
    }else{
        var confirmPass = document.getElementById("confirmPass").style.outline="none";
    }
})


document.getElementById("Sign-up").addEventListener("submit", function(event) {
    event.preventDefault();

    var username = document.getElementById("signupUsername").value;
    var password = document.getElementById("signupPassword").value;
    var confirmPass = document.getElementById("confirmPass").value;
    
    if(password == confirmPass){
        var formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        fetch('signup.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {

            if (data.status === "success") {
                alert(data.msg);
                goLogin();
            } else {
                document.getElementById("checkCreate").style.display="block";
                document.getElementById("checkCreate").innerHTML=`⚠️ ${data.msg}`
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }else{
        document.getElementById("checkCreate").style.display="block";
        document.getElementById("checkCreate").innerHTML=`🔴 Confirm password not match`
    }
});



document.getElementById("Log-in").addEventListener("submit", function(event){
    event.preventDefault();

    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;

    var fD = new FormData();
    fD.append('username', username);
    fD.append('password', password);

    fetch('login.php', {
        method: 'POST',
        body: fD
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === "failed"){
            document.getElementById("checkUsers").style.display="block";
            document.getElementById("checkUsers").innerHTML = `🚫 ${data.msg}`;
        }
        if(data.status === "success"){
            window.location.href = "../Working/index.php";
        }
    });
});

// let i =0;
// let emo = ["⛔", "🚫", "❗","🖐","🔴","⚠️"];
// setInterval(() =>{
//     document.getElementById("checkUsers").innerHTML = `<p>${emo[i]} ${data.msg}</p>`;
//     i=(i+1) % emo.length;
// },1000);