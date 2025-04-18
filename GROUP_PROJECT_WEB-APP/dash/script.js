


let quotes = document.getElementById("forQuotes");
let links = document.getElementById("forLinks");
let tasks = document.getElementById("forTodo");


document.addEventListener('click', function(event){

  if(event.target === document.getElementById("addBtn")){
    document.getElementById("addList").style.display="block";

  }else{
    document.getElementById("addList").style.display="none";
  }

  if(event.target.matches("#popQuote,#popLink,#popTodo") || event.target.matches("#cancel,#cancelLink")){
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
  }

  if(event.target === document.getElementById("qbg")){
    document.getElementById("qbg").style.display="none";
  }
});

let statusQuote = "";
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
  document.getElementById("popTodo").style.display="block";
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

    console.log(tId+" "+quoteTitle+" "+quoteInp);

    let fd = new FormData();
    fd.append('action', 'editQuote');
    fd.append('id', tId);
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
  fd.append("action", "addQuote");
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

function delQuote(event,id){
  event.stopPropagation();
  document.getElementById("dellot").play();
  document.getElementById("dellot").addEventListener('complete', ()=>{
    document.getElementById("qbg").style.display="none";
  },{once:true});

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
let tId;
function editQuote(id,title,cc){
  tId = id;
  document.getElementById("qbg").style.display="none";
  addQuotes();
  statusQuote = "editQuote";
  console.log(statusQuote+" "+tId);


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
  fd.append("action", "addLink");
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
      alert(data.msg);
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
      alert(data.msg);
      loadLinks();
    }
  });
  window.open(i,'_blank');
}

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
      alert(data.msg);
      window.location.href="../auth/index.php";
    };
  });
});


// =-=--==00==--==-=-=--  popLink -=-=-=-=-=-=-=-=-=


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
}

function handleShow(setLabel,show,hide,hide1){
  document.getElementById("labelC").innerHTML = setLabel;

  show.style.display="block";
  hide.style.display="none";
  hide1.style.display="none";
}
///  == - - - = -= - = -= -= - =- =- = -= -= - =- =- = -=//

