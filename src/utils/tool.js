const toast = (value) => {
    let cont = document.createElement('div')
    cont.innerHTML = value
    cont.className = 'Z-toast'
    document.body.appendChild(cont)
    setTimeout(() => {
        document.body.removeChild(cont)
    }, 2000)
}
export {
    toast
}