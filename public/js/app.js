console.log("APP")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener("submit", (e) =>{
    e.preventDefault()
    const address = search.value

    messageOne.textContent = "Loading.."
    messageTwo.textContent = ""
    messageThree.textContent = ""

    fetch("/weather?address=" + address).then((response) => {
            console.log("response", response)
            response.json().then((data) => {
                if (data.error){
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.address
                    messageTwo.textContent = data.forecast
                    messageThree.textContent = data.humidity
                }
            })
        })
})
