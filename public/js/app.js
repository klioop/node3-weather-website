fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})
// calling fetch in the client side javascript is goint to kick off an asynchronous I/O operation
// much like calling a request in node js did

const weatherForm = document.querySelector('form')
const search      = document.querySelector('input')
const messageOne  = document.querySelector('#message-1')
const messageTwo  = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`).then((response) => {
    response.json().then((data) => {
        
        if (data.error) return messageOne.textContent = data.error

        messageOne.textContent = data.forecast
        messageTwo.textContent = data.location
    })
})
})