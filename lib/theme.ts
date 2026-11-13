/** Runs before paint (inlined in <head>): applies a saved theme and marks that JS is on, so nothing flashes. */
export const headScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}document.documentElement.classList.add("js")`;
