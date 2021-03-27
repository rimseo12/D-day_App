let timer = null

function debounce(callback, time) {
 if(timer){
     clearTimeout(timer)
 }

 timer = setTimeout(() => {
     callback()
 },time)
}

export default debounce
