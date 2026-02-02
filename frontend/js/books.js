requireAuth();

const list=document.getElementById("list");
const msg=document.getElementById("msg");
const q=document.getElementById("q");

async function load(){
  msg.textContent="";
  list.innerHTML="Loading...";
  try{
    const query=q.value.trim();
    const data=await api("/api/books"+(query?("?q="+encodeURIComponent(query)):""),"GET",null,false);
    render(data);
  }catch(err){
    list.innerHTML="";
    msg.textContent=err.message;
  }
}

function render(items){
  list.innerHTML="";
  if(!items||items.length===0){list.innerHTML="<p>No books</p>";return;}
  items.forEach(b=>{
    const div=document.createElement("div");
    div.className="book";
   div.innerHTML=`<h3>${b.Name||""}</h3><div class="meta"><span class="pill">Genres: ${(b.genres||[]).join(", ")}</span><span class="pill">Available: ${b.copiesAvailable}/${b.copiesTotal}</span></div>`;
    const btn=document.createElement("button");
    btn.className="btn";
    btn.textContent="Borrow";
    btn.onclick=()=>borrow(b._id);
    div.appendChild(btn);
    list.appendChild(div);
  });
}

async function borrow(bookId){
  msg.textContent="";
  try{
    await api("/api/borrowings/borrow","POST",{bookId},true);
    msg.textContent="Borrowed!";
    await load();
  }catch(err){
    msg.textContent=err.message;
  }
}

document.getElementById("searchBtn").addEventListener("click",load);
load();
