requireAuth();

async function load(){
  const topBooks=document.getElementById("topBooks");
  const readers=document.getElementById("readers");

  const books=await api("/api/analytics/top-books","GET",null,true);
  topBooks.innerHTML="";
  books.forEach(b=>{
    const li=document.createElement("li");
    li.textContent=`${b.Name} — ${(b.authors||[]).join(", ")} (${b.borrowCount})`;
    topBooks.appendChild(li);
  });

  const users=await api("/api/analytics/active-readers","GET",null,true);
  readers.innerHTML="";
  users.forEach(u=>{
    const li=document.createElement("li");
    li.textContent=`${(u.name||u.user?.name||"Unknown")} (${u.count||u.borrowCount||0})`;
    readers.appendChild(li);
  });
}

load();

