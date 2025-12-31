// Two-panel handlers: left registration, right welcome/login swap with animations
(function(){
  const el = id => document.getElementById(id);
  const container = el('container');

  // Toggle buttons inside the sliding panel (hidden buttons)
  const registerBtn = el('registerBtn');
  const loginBtn = el('loginBtn');

  if(registerBtn) registerBtn.addEventListener('click', ()=> container.classList.add('active'));
  if(loginBtn) loginBtn.addEventListener('click', ()=> container.classList.remove('active'));

  // Also allow clicking the toggle areas (useful on mobile)
  // show register view
  const showRegisterView = ()=> container.classList.add('active');
  const showLoginView = ()=> container.classList.remove('active');

  // Wire small visible links (if present later)
  const regToLogin = el('regToLogin');
  if(regToLogin) regToLogin.addEventListener('click', showLoginView);

  const loginToReg = el('loginToReg');
  if(loginToReg) loginToReg.addEventListener('click', showRegisterView);

  // Registration handling (client-side validation only)
  const regForm = el('regForm');
  if(regForm) regForm.addEventListener('submit', e=>{
	e.preventDefault();
	const first = el('firstName') && el('firstName').value.trim();
	const last = el('lastName') && el('lastName').value.trim();
	const user = el('regUser') && el('regUser').value.trim();
	const pass = el('regPass') && el('regPass').value || '';
	const conf = el('regPassConfirm') && el('regPassConfirm').value || '';
	const err = el('regError');
	err.textContent = '';
	if(!first || !last || !user){ err.textContent = 'Please fill name and user id.'; return; }
	if(pass.length < 6){ err.textContent = 'Password must be at least 6 characters.'; return; }
	if(pass !== conf){ err.textContent = 'Passwords do not match.'; return; }
	// simulated success: switch to sign-in panel and prefill user
	err.style.color = 'green'; err.textContent = 'Registered (simulation). Redirecting to sign in...';
	setTimeout(()=>{
	  showLoginView();
	  const loginUser = el('loginUser'); if(loginUser) loginUser.value = user;
	  if(el('loginError')) el('loginError').textContent = 'Account created — please sign in.';
	}, 700);
  });

  // Login handling (basic)
  const loginForm = el('loginForm');
  if(loginForm) loginForm.addEventListener('submit', e=>{
	e.preventDefault();
	const user = el('loginUser') && el('loginUser').value.trim();
	const pass = el('loginPass') && el('loginPass').value || '';
	const err = el('loginError');
	err.textContent = '';
	if(!user || !pass){ err.textContent = 'Please enter both user id and password.'; return; }
	err.style.color = 'green'; err.textContent = 'Signed in (simulation).';
	setTimeout(()=> err.textContent = '', 1200);
  });

  // If URL hash asks for register, open that side
  if(location.hash === '#register') showRegisterView();

})();

