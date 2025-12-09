// login-init.js — module loader to initialize the login module without inline scripts
import { initLogin } from './login.js'; 

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLogin);
} else {
  initLogin();
}
 
 