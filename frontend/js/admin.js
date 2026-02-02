requireAuth();

const msg=document.getElementById("msg");
const list=document.getElementById("list");

if(getRole()!=="librarian"){
  document.body.innerHTML="<h2>Access denied</h2>";
  throw new Error("Forbidden");
}

document.getElementById("bookForm").addEventListener("submit",async(e)=>{
  e.preventDefault();
  msg.textContent="";
  try{
    const body={
      Name:document.getElementById("name").value,
      authors:document.getElementById("authors").value.split(",").map(s=>s.trim()),
      genres:document.getElementById("genres").value.split(",").map(s=>s.trim()),
      copiesTotal:+document.getElementById("total").value,
      copiesAvailable:+document.getElementById("available").value,
      metadata:{
        pages:+document.getElementById("pages").value||0,
        language:document.getElementById("language").value||""
      }
    };
    await api("/api/books","POST",body,true);
    msg.textContent="Book created";
    e.target.reset();
    await load();
  }catch(err){
    msg.textContent=err.message;
  }
});

async function load(){
  list.innerHTML="Loading...";
  try{
    const data=await api("/api/books","GET",null,false);
    list.innerHTML="";
    data.forEach(b=>{
      const div=document.createElement("div");
      div.className="card";
      div.innerHTML=`<p>${b.Name}</p><p>${b.copiesAvailable}/${b.copiesTotal}</p>`;
      list.appendChild(div);
    });
  }catch(err){
    list.innerHTML=err.message;
  }
}

load();
