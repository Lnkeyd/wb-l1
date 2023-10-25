localStorage.setItem('vk-app-access', window.location.hash?.split('=')[1]?.replace('&expires_in', ''))
window.location.replace('http://127.0.0.1:5500/19/index.html')