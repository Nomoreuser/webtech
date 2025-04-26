


let quotes = document.getElementById("forQuotes");
let links = document.getElementById("forLinks");
let tasks = document.getElementById("forTodo");


document.addEventListener('click', function(event){

  if(event.target === document.getElementById("addBtn")){
    document.getElementById("addList").style.display="block";

  }else{
    document.getElementById("addList").style.display="none";
  }

  if(event.target.matches("#popQuote,#popLink,#popTodo") || event.target.matches("#cancel,#cancelLink,#cancelTask")){
    //quote
    document.getElementById("popQuote").style.display = "none";
    document.getElementById("quoteInp").value="";
    document.getElementById("quoteTitle").value="";
    //link
    document.getElementById("popLink").style.display="none";
    document.getElementById("linkName").value="";
    document.getElementById("linkURL").value="";
    //todo
    document.getElementById("popTodo").style.display="none";
    document.getElementById("submitTodo").disabled = true;
    document.getElementById("submitTodo").style.cssText=`background-color: #2A2A2A; color: #d3d7d9;`;
  }

  if(event.target === document.getElementById("qbg")){
    document.getElementById("qbg").style.display="none";
  }

  if (event.target == document.getElementById("delaccount")) {
    DeleteAcc();
  } else {
    const dellAcc = document.getElementById("dellAcc");
    if (dellAcc && !dellAcc.contains(event.target)) {
      dellAcc.remove();
    }
  }

  if (event.target == document.getElementById("setU")) {
    changeU();
  } else {
    const cup = document.getElementById("cup");
    if (cup && !cup.contains(event.target)) {
      cup.remove();
    }
  }

  if(event.target == document.getElementById("setP")) {
    changeP();
  }else {
    const cpd = document.getElementById("cpd");
    if(cpd && !cpd.contains(event.target)){
      document.getElementById("cpd").remove();
    }
  }

});

let statusQuote = ""; //on editing or adding new to magamit ulit #popQuote

function addQuotes() {
  statusQuote = "addQuote";
  document.getElementById("submitQuote").style.color=" #565656c6";
  document.getElementById("submitQuote").disabled=true;

  document.getElementById("quoteInp").value="";
  document.getElementById("quoteTitle").value="";
  
  document.getElementById("popQuote").style.display = "block";
  console.log(statusQuote);
};

function addLinks(){
  document.getElementById("popLink").style.display="block";
}

function addTodo(){
  statusTodo = 'addTodo';
  document.getElementById("popTodo").style.display="block";
  document.getElementById("todoDate").value = dateCreated;
  document.getElementById("todoTitle").value= "";
  document.getElementById("desc").value ="";
}



document.addEventListener('input', ()=>{

  //quote text box checking if i put text
  if(document.getElementById("quoteInp").value.trim() !== ""){
    document.getElementById("submitQuote").style.color=" #007bff"
    document.getElementById("submitQuote").disabled=false;
  }else{
    document.getElementById("submitQuote").style.color=" #565656c6";
    document.getElementById("submitQuote").disabled=true;
  }

  //same in link
  if(document.getElementById("linkURL").value.trim() !== ""){
    document.getElementById("submitLink").style.color=" #007bff";
    document.getElementById("submitLink").disabled=false;
  }else{
    document.getElementById("submitLink").style.color=" #565656c6";
    document.getElementById("submitLink").disabled=true;
  }

  //kkk sugod raaaaa

  let indate = document.getElementById("todoDate").value;
  let ind = new Date(indate);
  let td = new Date(dateCreated);

  if(ind >= td && document.getElementById("todoTitle").value.trim() != ""){
    document.getElementById("todoDate").style.backgroundColor = "rgba(119, 255, 201, 0.83)";
    // console.log( ind +" >= "+ td)
    document.getElementById("submitTodo").disabled = false;
    document.getElementById("submitTodo").style.cssText=`background-color:rgb(93, 93, 93); color:rgb(152, 255, 158);`;
  }else{
    document.getElementById("todoDate").style.backgroundColor = "rgba(255, 119, 126, 0.83)";
    document.getElementById("submitTodo").disabled = true;
    document.getElementById("submitTodo").style.cssText=`background-color: #2A2A2A; color: #d3d7d9;`;
  }

});


const today = new Date();
const day = today.getDate();
let month = today.getMonth()+1;
const year = today.getFullYear();
if(month < 10){
  month = "0"+month;
};
let dateCreated = ""+month+"/"+day+"/"+year+"";



console.log(dateCreated);

document.getElementById("submitQuote").addEventListener('click', (event) => {
  event.preventDefault();

  if(statusQuote == "addQuote"){
    let quoteTitle = document.getElementById("quoteTitle").value;
    let quoteInp = document.getElementById("quoteInp").value;

    if(quoteTitle.trim() === ""){
      quoteTitle = "Untitled Quote";
    };

    let fd = new FormData();
    fd.append('action', 'addQuote');
    fd.append("title", quoteTitle);
    fd.append("text", quoteInp);
    fd.append("date", dateCreated);

    fetch('php/addDelete.php', {
      method: "POST",
      body: fd
    })
    .then(response => response.json())
    .then(data => {
      console.log("Response:", data);
      if (data.status == "fail" || data.status == "error") {
        alert(data.msg);
      }
      if (data.status == "success") {
        // alert(data.msg);
        Quotes();
      }
    })
    .catch(error => console.error("Fetch Error:", error));

  }else if(statusQuote == "editQuote"){

    let quoteTitle = document.getElementById("quoteTitle").value;
    let quoteInp = document.getElementById("quoteInp").value;

    if(quoteTitle.trim() === ""){
      quoteTitle = "Untitled Quote";
    };

    console.log(qId+" "+quoteTitle+" "+quoteInp);

    let fd = new FormData();
    fd.append('action', 'editQuote');
    fd.append('id', qId);
    fd.append('qtitle', quoteTitle);
    fd.append('qtext', quoteInp);

    fetch('php/addDelete.php',{
      method: 'POST',
      body: fd
    })
    .then(response => response.json())
    .then(data => {
      if(data.status == 'success'){
        // alert(data.msg);
        Quotes();
      }
    });
  };

  document.getElementById("popQuote").style.display = "none";
  document.getElementById("quoteInp").value="";
  document.getElementById("quoteTitle").value="";
}); 

function loadQuotes(){
  let fd = new FormData();
  fd.append("action", "getQuote");
  fetch('php/getDataSql.php',{
    method: "POST",
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == "success"){
      quotes.innerHTML = "";
      data.dquotes.reverse().forEach(quote => {
        quotes.innerHTML += `
          <div class="quoteList" data-id="${quote.id}" data-title="${escapeHTML(quote.title)}"data-content="${escapeHTML(quote.content)}" data-date="${quote.dcreate}"onclick="openQuote(this)">
            <div class="titleDate">
              <h1>${quote.title}</h1>
              <small>${quote.dcreate}</small>
            </div>
            <svg onclick="delQuote(event,${quote.id})" style="border-radius: 50%; width:fit-content;height:fit-content;padding:3px;" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="-1 0 27 27" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </div>`;
      });
    }else alert("ok lang yan bawi next life!!");
  });
};

let dltstatus;
function delQuote(event,id){
  event.stopPropagation();

  if(dltstatus == 'indlt'){
    document.getElementById("dellot").play();
    document.getElementById("dellot").addEventListener('complete', ()=>{
      document.getElementById("qbg").style.display="none";
    },{once:true});
  }

  let fd = new FormData();
  fd.append('action', 'dltQuote');
  fd.append('id', id);

  fetch('php/addDelete.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == 'success'){
      Quotes();
    }else if(data.status == 'fail'){
      alert(data.msg);
    };
  });
};

function escapeHTML(str){
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

function openQuote(el){
  dltstatus = 'indlt';
  let id = el.dataset.id;
  let title = el.dataset.title;
  let cc = el.dataset.content;
  let dc = el.dataset.date;



  console.log(id+cc+title+dc);

  let a = document.getElementById("qbox");

  document.getElementById("qbg").style.display="block";

  a.innerHTML="";
  a.innerHTML = `
    <dotlottie-player src="https://lottie.host/2bf652cf-ff04-4777-a0e2-fee9fae51ebc/GWVTTyjlWc.lottie" background="transparent" speed="2" 
      style="width: 75px; height: 75px; position: absolute;top:0; border-radius:10px" loop autoplay></dotlottie-player>

    <div style="position:absolute; right: 20px;top:-40px; padding: 10px; background-color:rgba(120, 152, 177, 0.79); display: flex;align-items: center;gap:10px;border-radius:25px 25px;">
      <svg class="qqq" onclick="editQuote(${id},'${escapeHTML(title)}','${escapeHTML(cc)}')" xmlns="http://www.w3.org/2000/svg" style="background-color:rgba(0, 0, 0, 0.87);border-radius:100%;padding:3.5px;" width="24" height="24" viewBox="-5 -5 34 34" fill="black" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
      <dotlottie-player class="qqq" id="dellot"; onclick="delQuote(event,${id})" src="https://lottie.host/45bf31cf-8b69-4dcc-8219-ab762867d263/2EAsmMeil5.lottie" background="transparent" speed="3"
        style="width: 50px; height: 50px;"></dotlottie-player>
      <svg class="qqq" onclick="document.getElementById('qbg').style.display='none'" xmlns="http://www.w3.org/2000/svg" style="background-color:rgba(255, 93, 93, 0.96);border-radius:15px;padding:3.5px;" width="24" height="24" viewBox="-5 -5 34 34" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
    </div>
    <div style="text-align: center; font-family: 'Inter', sans-serif; font-size:26px;font-weight:bold;">
      <div style="text-align:right;margin: 20px 0">
        <small style="font-size:14px; padding: 10px">${dc}</small>
      </div>
      <p style="word-break: break-word;">${escapeHTML(cc)}</p>
      <p style="margin: 40px 0 0 0;">${escapeHTML(title)}</p>
    </div>
    <dotlottie-player src="https://lottie.host/2bf652cf-ff04-4777-a0e2-fee9fae51ebc/GWVTTyjlWc.lottie" background="transparent" speed="3" 
      style="width: 75px; height: 75px; position: absolute;bottom:0px;right:25px;transform:rotate(-180deg);" loop autoplay></dotlottie-player>
    `;
};
let qId;
function editQuote(id,title,cc){
  qId = id;
  document.getElementById("qbg").style.display="none";
  addQuotes();
  statusQuote = "editQuote";
  console.log(statusQuote+" "+qId);


  document.getElementById("quoteTitle").value = title;
  document.getElementById("quoteInp").value = cc;

}




// -=0-=00--0=-------------0-===0-=00==0--=-=0-00=0-0=-0-=0-=0-=0-=0-=0-=0
document.getElementById("submitLink").addEventListener('click', function(event){
  event.preventDefault();

  let linkName = document.getElementById("linkName").value;
  let url = document.getElementById("linkURL").value;

  if(!url.startsWith("http://") && !url.startsWith("https://")){
    linkErr.innerHTML = `❗URL invalid!!`;
    return;
  };

  if(linkName.trim() == ""){
    linkName = url;
    console.log(linkName);
  };
  console.log(linkName);

  let fd = new FormData();
  fd.append("action", "addLink");
  fd.append("name", linkName);
  fd.append("url", url);

  fetch('php/addDelete.php',{
    method: "POST",
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == 'success'){
      alert(data.msg);

      document.getElementById("linkName").value="";
      document.getElementById("linkURL").value="";
      document.getElementById("popLink").style.display="none";
      Links();
    }
  })

});

function loadLinks(){
  let fd = new FormData();
  fd.append("action", "getLink");
  fetch('php/getDataSql.php',{
    method: "POST",
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == 'success'){
      gridLinks.innerHTML = "";
      data.dlinks.reverse().forEach(link =>{
        let date = link.lastvisit;
        if(date == null){
          date =""
        };
        let domain = new URL(link.link).hostname;
        let faviconUrl = `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
        gridLinks.innerHTML += ` 
        <div class="gridItemLink">
          <div style="width:200px; position: absolute">
            <div class="delLink" onclick="delLink(${link.id})">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark-x-icon lucide-bookmark-x"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/><path d="m14.5 7.5-5 5"/><path d="m9.5 7.5 5 5"/></svg>
            </div>
            <div class="linkList" onclick="linkClick('${link.link}',${link.visit},${link.id})">
              <div class="linkImg"><img src="${faviconUrl}"></div>
              <h3>${escapeHTML(link.name)}</h3>
              <div class="linkVisit">
                <small>Visit: ${link.visit}</small><br>
                <small>Last visit: ${date}</small>
              </div>
            </div>
          </div>
        </div>`
      });
      links.appendChild(gridLinks);
    };
  });
};

function delLink(id){
  let fd = new FormData();
  fd.append("action", "delLink");
  fd.append("id", id);
  fetch('php/addDelete.php', {
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == "success"){
      // alert(data.msg);
      Links();
    }else if(data.status = "fail"){
      alert(data.msg);
    }
  });
}

function linkClick(i,visit,id){
  visit += 1;
  let date = dateCreated;
  // console.log((visit) + date);

  let fd = new FormData();
  fd.append('action', 'updateLink');
  fd.append('visit', visit);
  fd.append('date', date);
  fd.append('id', id);

  fetch('php/addDelete.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == "success"){
      // alert(data.msg);
      loadLinks();
    }
  });
  window.open(i,'_blank');
}

///
flatpickr("#todoDate",{
  dateFormat: "m/d/Y"
});

document.getElementById("submitTodo").addEventListener('click', (event)=>{
  event.preventDefault();

  let title = document.getElementById("todoTitle").value;
  let descript = document.getElementById("desc").value;
  let due = document.getElementById("todoDate").value;
  // alert(title+descript+due);
 
  if(statusTodo == 'addTodo'){

    let fd = new FormData();
    fd.append('action', 'addTodo');
    fd.append('title', title);
    fd.append('descr', descript);
    fd.append('due', due);
    fd.append('status', 'inprogress');
    fd.append('dcreate', dateCreated);

    fetch('php/addDelete.php', {
      method: 'POST',
      body: fd
    })
    .then(response => response.json())
    .then(data => {
      if(data.status == "success"){
        // alert(data.msg);
        Todo();
      };
    });
  }else if(statusTodo == 'editTodo'){
    // alert("edit Todo!");
    
    let fd = new FormData();
    fd.append('action', 'editTodo');
    fd.append('id', tId);
    fd.append('title', title);
    fd.append('descr', descript);
    fd.append('due', due);

    fetch('php/addDelete.php', {
      method: 'POST',
      body: fd
    })
    .then(response => response.json())
    .then(data => {
      // alert(data.msg);
      Todo();
    });
  };
  document.getElementById("popTodo").style.display="none";
  document.getElementById("todoTitle").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("todoDate").value = "";
});


function loadTodo(){
  let fd = new FormData();
  fd.append('action', 'getTodo');
  fd.append('dToday', dateCreated);
  fetch('php/getDataSql.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById("storedInprogress").innerHTML = "";
    document.getElementById("storedTodayDue").innerHTML = "";


    if(data.today.length > 0){
      console.log(data.today);
      document.getElementById("lblToday").innerHTML = "Today";
      data.today.reverse().forEach(td =>{

        storedTodayDue.innerHTML += `
        <div class="loadTodo">
          <h4>Due: ${td.dueDate}</h4>
          <h1>${td.title}</h1>
          <h3>${td.descript}</h3>
          <div class="tbtn">
            <small onclick="doneTodo(${td.id},'completed')">Done</small>
            <small onclick="editTodo(${td.id},'${escapeHTML(td.title)}','${escapeHTML(td.descript)}','${td.dueDate}')">Edit</small>
            <small onclick="delTodo(${td.id})">Remove</small>
          </div>
        </div><br>
        `;
      });
    }
    
    if(data.inprogress){
      data.inprogress.reverse().forEach(inprog =>{
        document.getElementById("storedInprogress").innerHTML += 
        `
        <br>
        <div class="loadTodo">
          <h4>Due: ${inprog.dueDate}</h4>
          <h1>${inprog.title}</h1>
          <h3>${inprog.descript}</h3>
          <div class="tbtn">
            <small onclick="doneTodo(${inprog.id},'completed')">Done</small>
            <small onclick="editTodo(${inprog.id},'${escapeHTML(inprog.title)}','${escapeHTML(inprog.descript)}','${inprog.dueDate}')">Edit</small>
            <small onclick="delTodo(${inprog.id})">Remove</small>
          </div>
        </div>
        `;
      });
    };


    if(data.completed.length > 0){
      console.log("Ito:  "+data.completed);
      document.getElementById("storedCompleted").innerHTML = "";

      data.completed.reverse().forEach(complete => {
        document.getElementById("storedCompleted").innerHTML +=`
        <div class="loadTodo">
          <h4>Due: ${complete.dueDate}</h4>
          <h1>${complete.title}</h1>
          <h3>${complete.descript}</h3>
          <div class="tbtn">
            <small onclick="delTodo(${complete.id})">Remove</small>
          </div>
        </div><br>
        `;
      });
    };

    if(data.pastDue.length > 0){
      console.log("Umayyy "+data.pastDue.length);
      document.getElementById("storedFailed").innerHTML = "";

      data.pastDue.reverse().forEach(past =>{

        document.getElementById("storedFailed").innerHTML += `
        
        <div class="loadTodo">
          <h4>Due: ${past.dueDate}</h4>
          <h1>${past.title}</h1>
          <h3>${past.descript}</h3>
          <div class="tbtn">
            <small onclick="delTodo(${past.id})">Remove</small>
          </div>
        </div><br>
        `;
      });
    };
  });
};

function doneTodo(id, status){

  let fd = new FormData();
  fd.append('action', 'updateTodo');
  fd.append('id', id);
  fd.append('status', status);

  fetch('php/addDelete.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    // alert(data.msg);
    Todo();
  });
};
let statusTodo;
let tId;

function editTodo(id,title,descript,due){
  statusTodo = 'editTodo';
  tId = id;
  
  document.getElementById("popTodo").style.display="block";
  document.getElementById("todoTitle").value=title;
  document.getElementById("desc").value=descript;
  document.getElementById("todoDate").value=due;
};
function delTodo(id){

  let fd = new FormData();
  fd.append('action', 'delTodo');
  fd.append('id', id);

  fetch('php/addDelete.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    // alert(data.msg);
    Todo();
  });

};

/// 
document.getElementById("LogOut").addEventListener('click', ()=>{

  let fd = new FormData();
  fd.append('action', 'logOut')
  fetch('php/getDataSql.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data =>{
    console.log(data);
    if(data.status == 'success'){
      window.location.href="../auth/index.html";
      alert(data.msg);
    };
  });
});


function choosePf(){

  document.getElementById("setting").innerHTML += `
  
  <style>
    .pfCircle{
      height: 80px;
      width: 80px;
      padding: 5px;
      border-radius: 50%;
    }
    
    .pfCircle img{
      height: 100%;
      width: 100%;
    }
    .pfrows{
      display: flex;
      flex-direction: row;
      flex-wrap:wrap;
      gap: 10px;
      justify-content:center;
    }
  </style>

  <div id="pf" style="width:400px;background-color:rgb(164, 164, 164);position: absolute; top:50%;left:50%;
    transform:translate(-50%,-50%);padding: 20px">
    <h1 style="text-align:center;margin-bottom:30px;">Choose Profile Pic</h1>
    <div class="pfrows">
      <div class="pfCircle" id="pfCircle0" onclick="pfP(0)">
        <img src="assets/pf0.png">
      </div>
      <div class="pfCircle" id="pfCircle1" onclick="pfP(1)">
        <img src="assets/pf1.png">
      </div>
      <div class="pfCircle" id="pfCircle2" onclick="pfP(2)">
        <img src="assets/pf2.png">
      </div>
      <div class="pfCircle" id="pfCircle3" onclick="pfP(3)">
        <img src="assets/pf3.png">
      </div>
      <div class="pfCircle" id="pfCircle4" onclick="pfP(4)">
        <img src="assets/pf4.png">
      </div>
      <div class="pfCircle" id="pfCircle5" onclick="pfP(5)">
        <img src="assets/pf5.png">
      </div>
      <div class="pfCircle" id="pfCircle6" onclick="pfP(6)">
        <img src="assets/pf6.png">
      </div>
      <div class="pfCircle" id="pfCircle7" onclick="pfP(7)">
        <img src="assets/pf7.png">
      </div>
    </div>
    <div style="display:flex; gap: 20px;font-weight: bold;margin-top:15px">
      <div onclick="document.getElementById('pf').remove();">Cancel</div>
      <div onclick="conpf()" style="color:rgb(16, 163, 0)">Save</di>
    </div>
  </div>
  `;
  loadpfp();
}
let npf;

function pfP(i){
  let id = "pfCircle"+i;

  document.querySelectorAll(".pfCircle").forEach(pf =>{
    pf.style.backgroundColor="";
  });

  let element = document.getElementById(id);
  element.style.backgroundColor="red";

  npf = i;
}

if(document.getElementById("upfP").getAttribute('src') === "" && document.getElementById("spfp").getAttribute('src')===""){
  document.getElementById("upfP").src='assets/user.png';
  document.getElementById("spfp").src='assets/user.png';
}

function conpf(){

  let fd = new FormData();
  fd.append('action', 'pfp');
  fd.append('i', npf);

  fetch('php/getDataSql.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == 'success'){
      npf = data.msg;
      // alert(data.msg);
      let me = `assets/pf${npf}.png`;
      document.getElementById("upfP").src=me;
      document.getElementById("spfp").src=me;
      loadpfp();
    };
    document.getElementById("pf").remove();
  });
};

loadpfp();
function loadpfp(){

  let fd=new FormData();
  fd.append('action', 'getpfp');
  fetch('php/getDataSql.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    npf = data.msg[0].pfp;
    let sii = data.msg[0].pfp;
    let ipfp = "pfCircle"+sii;
    // alert("this me kkk rahhh "+data.msg[0].pfp);
    let me = `assets/pf${npf}.png`;
      document.getElementById("upfP").src=me;
      document.getElementById("spfp").src=me;
      document.getElementById(ipfp).style.backgroundColor="green";

  });

};

function changeU(){
  let me = document.getElementById("setUsername").value;
  document.getElementById("setting").innerHTML += `
  <div id="cup" style="width: 300px; position: absolute; top:50%;left:50%;transform:translate(-50%,-50%); 
    display:block; background-color:rgba(219, 219, 219, 0.92);padding: 10px">
    <h2 style="text-align: center; margin: 10px 0">Change Username</h2>
    <h3 style="margin: 5px 0;">Username</h3>
    <p style="font-weight:bolder;font-size: 24px;color:rgb(74, 74, 74);background-color:rgba(198, 198, 198, 0.9);padding:0 10px">
      ${me}</p>
    <h3 style="margin: 5px 0;">New Username</h3>
    <input id="ccUsername" type="text" style="outline:none;padding: 0 10px">
    <p id="uexist" style="color:rgb(159, 0, 0)"></p>
    <div style="display:flex; gap: 20px;font-weight: bold;margin-top:15px">
      <div onclick="document.getElementById('cup').remove();">Cancel</div>
      <div onclick="conu()" style="color:rgb(16, 163, 0)">Save</di>
    </div>
  </div>
  `;
}
function changeP(){
  let me = document.getElementById("setPass").value;
  document.getElementById("setting").innerHTML += `
  <div id="cpd" style="width: 300px; position: absolute; top:50%;left:50%;transform:translate(-50%,-50%); 
    display:block; background-color:rgba(219, 219, 219, 0.92);padding: 10px">
    <h2 style="text-align: center; margin: 10px 0">Change Password</h2>
    <h3 style="margin: 5px 0;">Password</h3>
    <p style="font-weight:bolder;font-size: 24px;color:rgb(74, 74, 74);background-color:rgba(198, 198, 198, 0.9);padding:0 10px">
      ${me}</p>
    <h3 style="margin: 5px 0;">New Password</h3>
    <input id="ccPass" type="text" style="outline:none;padding: 0 10px">
    <div style="display:flex; gap: 20px;font-weight: bold;margin-top:15px">
      <div onclick="document.getElementById('cpd').remove();">Cancel</div>
      <div onclick="conp()" style="color:rgb(16, 163, 0)">Save</di>
    </div>
  </div>
  `;
}
//password change
function conp(){
  let me = document.getElementById("ccPass").value.trim();

  if(me == ""){
    return alert("enter new password");
  }

  let fd = new FormData();
  fd.append('action', 'changePass');
  fd.append('password', me);
  fetch('php/getDataSql.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    alert(data.msg)
    if(data.status == 'success'){
      window.location.href="../dash/index.php";
    };
  });
};

//username change
function conu(){
  let me = document.getElementById("setUsername").value;
  let username = document.getElementById("ccUsername").value.trim();
  if(username == ""){
    return alert("Enter new username");
  }
  if(username == me){
    return alert("already been!!");
  }

  let fd = new FormData();
  fd.append('action', 'changeUsername');
  fd.append('username', username);
  fetch('php/getDataSql.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == 'success'){
      alert(data.msg);
      window.location.href="../dash/index.php";
    }else if(data.status == 'exist'){
      document.getElementById("uexist").innerHTML = `${data.msg}`;
      // alert(data.msg);
    };
    
  });
};

function DeleteAcc(){
  document.getElementById("setting").innerHTML += `
  <div id="dellAcc" style="width: 300px; position: absolute; top:50%;left:50%;transform:translate(-50%,-50%); 
    display:block; background-color:rgba(219, 219, 219, 0.92);padding: 10px">

    <h2 style="text-align: center; margin: 10px 0">Delete Account!!</h2>
    <h3 style="margin: 5px 0;">Enter Password </h3>
    <input id="conDel" type="text" style="outline:none;padding: 0 10px">
    <p id="delwrong" style="color:rgb(196, 0, 0)"></p>
    <div style="display:flex; gap: 20px;font-weight: bold;margin-top:15px">
      <div onclick="document.getElementById('dellAcc').remove();">Cancel</div>
      <div onclick="conDel()" style="color:red">Confirm</di>
    </div>
  </div>
  `;
}

function conDel(){
  let a = document.getElementById("conDel").value.trim();
  if(a == ""){
    return alert("Enter !!!");
  }
  let fd = new FormData();
  fd.append('action', 'deleteAccount');
  fd.append('pass', a);
  fetch('php/getDataSql.php',{
    method: 'POST',
    body: fd
  })
  .then(response => response.json())
  .then(data => {
    if(data.status == 'deleted'){
      alert(data.status);
      window.location.href='../auth/index.html';
    }else{
      document.getElementById("delwrong").innerHTML = "*incorrect password*";
    }
  });
}





///  -- - -- - - - -MAIN -- - - - -- - - -  -- -//
function Quotes(){
  handleShow("Quotes", quotes, links, tasks);
  loadQuotes();
}
function Links(){
  handleShow("Links",links,quotes,tasks);
  loadLinks();
}
function Todo(){
  handleShow("To-do",tasks,quotes,links)
  loadTodo();
}
function Setting(){
  document.getElementById("setting").style.display="block";
}

function handleShow(setLabel,show,hide,hide1){
  document.getElementById("labelC").innerHTML = setLabel;

  show.style.display="block";
  hide.style.display="none";
  hide1.style.display="none";
}
///  == - - - = -= - = -= -= - =- =- = -= -= - =- =- = -=//

