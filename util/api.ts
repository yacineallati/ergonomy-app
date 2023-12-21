const createURL = (path : String) => window.location.origin + path

export const NewTodo = async () => {
    const res = await fetch(
        new Request(createURL('/api/todo'), {
        method: 'POST',
    })
    )
    return res.json()
}
    
    