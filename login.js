const USERS = [
    { username: "Mohammed", password: "male123", role: "male" },
    { username: "Farida", password: "female123", role: "female" }
  ];
  
  const form = document.getElementById("loginForm");
  const userInput = document.getElementById("username");
  const passInput = document.getElementById("password");
  const userErr = document.getElementById("userErr");
  const passErr = document.getElementById("passErr");
  const msg = document.getElementById("loginMsg");
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearMsgs();
  
    const username = userInput.value.trim();
    const password = passInput.value.trim();
  
    let ok = true;
  
    if (username.length < 2) {
      userErr.textContent = "Please enter your username.";
      ok = false;
    }
  
    if (password.length < 3) {
      passErr.textContent = "Please enter your password.";
      ok = false;
    }
  
    if (!ok) return;
  
    const found = USERS.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );
  
    if (!found) {
      msg.style.color = "#dc2626";
      msg.textContent = "Wrong username or password.";
      return;
    }
  

    localStorage.setItem("ascc_user", JSON.stringify({
      username: found.username,
      role: found.role,
      loginAt: new Date().toISOString()
    }));
  
    msg.style.color = "#16a34a";
    msg.textContent = `Welcome ${found.username}, login success.`;
  

    setTimeout(() => {
      window.location.href = "index.html";
    }, 800);
  });
  
  function clearMsgs(){
    userErr.textContent = "";
    passErr.textContent = "";
    msg.textContent = "";
    msg.style.color = "#16a34a";
  }
  