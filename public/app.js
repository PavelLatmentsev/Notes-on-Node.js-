document.addEventListener("click",  event => {
    if(event.target.dataset.type === "remove") {
        const id = event.target.dataset.id
        remove(id).then(() => {
            event.target.closest("li").remove()
        })
    } else if(event.target.dataset.type === "edit") {
        const block = event.target.parentNode.parentNode.childNodes[0]
        const id = event.target.dataset.id
        const newNameNote = prompt();
     update(id, newNameNote).then(()=> block.textContent = newNameNote)
    }
})

async  function remove(id) {
    await  fetch(`/${id}`, {method: "DELETE"})
}

async  function update(id, data) {
 await  fetch(`/${id}`, {method: "PUT", body: JSON.stringify( {data:data}),  headers: {'Content-Type': 'application/json'}})
}