requireAuth();

const list=document.getElementById("list");
const msg=document.getElementById("msg");

async function load(){
  msg.textContent="";
  list.innerHTML="Loading...";
  try{
    const data=await api("/api/borrowings/me","GET",null,true);
    render(data);
  }catch(err){
    list.innerHTML="";
    msg.textContent=err.message;
  }
}

function render(items){
  list.innerHTML="";
  if(!items||items.length===0){
    list.innerHTML="<p>No borrowings</p>";
    return;
  }
  items.forEach(b=>{
    const div=document.createElement("div");
    div.className="card";
    div.innerHTML=`
      <p><b>Book:</b> ${b.bookId?.Name||""}</p>
      <p><b>Status:</b> ${b.status}</p>
    `;
    if(b.status==="active"){
      const btn=document.createElement("button");
      btn.className="btn";
      btn.textContent="Return";
      btn.onclick=()=>ret(b._id);
      div.appendChild(btn);
    }
    list.appendChild(div);
  });
}

async function ret(id){
  msg.textContent="";
  try{
    await api("/api/borrowings/return/"+id,"POST",null,true);
    msg.textContent="Returned!";
    await load();
  }catch(err){
    msg.textContent=err.message;
  }
}

load();
