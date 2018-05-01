const btn = document.getElementById("submit")

btn.addEventListener("click", function() {
    let name =  document.getElementById("name").value
    let email =  document.getElementById("email").value

    console.log(name)
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            name: name,
            email: email,
        })
    }
    fetch("/reply", postOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        }).catch(function(error) {
            console.log(error)
        })
})