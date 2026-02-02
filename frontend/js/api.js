async function api(path,method="GET",body=null,auth=true){
  const headers={"Content-Type":"application/json"};
  if(auth){
    const token=localStorage.getItem("token");
    if(token)headers.Authorization="Bearer "+token;
  }
  const res=await fetch(API_BASE+path,{method,headers,body:body?JSON.stringify(body):null});
  const text=await res.text();
  let data=null;
  try{data=text?JSON.parse(text):null;}catch{data=text;}
  if(!res.ok){
    const msg=(data&&data.msg)?data.msg:("HTTP "+res.status);
    throw new Error(msg);
  }
  return data;
}

function requireAuth(){
  const token=localStorage.getItem("token");
  if(!token)window.location.href="login.html";
}

function getRole(){return localStorage.getItem("role")||"";}
function logout(){localStorage.removeItem("token");localStorage.removeItem("role");window.location.href="login.html";}
