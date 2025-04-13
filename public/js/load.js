const theme = localStorage.getItem('theme');
if (theme === 'dark') {
    document.documentElement.dataset.theme='coffee';
} else {
    document.documentElement.dataset.theme='';
}
