document.getElementById("loginForm")?.addEventListener("submit",async(e)=>{
  e.preventDefault();
  const email=document.getElementById("email").value.trim();
  const password=document.getElementById("password").value.trim();
  const msg=document.getElementById("msg");
  msg.textContent="";
  try{
    const data=await api("/api/auth/login","POST",{email,password},false);
    localStorage.setItem("token",data.token);
    localStorage.setItem("role",data.role);
    window.location.href="books.html";
  }catch(err){
    msg.textContent=err.message;
  }
});

document.getElementById("registerForm")?.addEventListener("submit",async(e)=>{
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  const email=document.getElementById("regEmail").value.trim();
  const password=document.getElementById("regPassword").value.trim();
  const role=document.getElementById("role").value;
  const msg=document.getElementById("msg");
  msg.textContent="";
  try{
    await api("/api/auth/register","POST",{name,email,password,role},false);
    window.location.href="login.html";
  }catch(err){
    msg.textContent=err.message;
  }
});
