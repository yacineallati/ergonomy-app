const createURL = (path: string) => window.location.origin + path;


export const NewTodo = async () => {
    const res = await fetch(
        new Request(createURL('/api/todos'), {
        method: 'POST',
        body: JSON.stringify({ title: 'New Todo', completed: false, startAt: new Date(), endAt: new Date(), type: 1, muscle: 1}),
    })
    )
    if (res.ok){
        return res.json()
    } else {
        console.error(`Error: ${res.status} ${res.statusText}`)
        throw new Error(`something went wrong on  ${res.status} ${res.statusText}`)
    }
    
}

export const addTodo = async (id: string, updates: any) => {
  const res = await fetch(
    new Request(`/api/todos/${id}`), {
    method: 'PATCH',
    body: JSON.stringify({ updates }),
  });

  let data;
  if (res.status !== 204) {
    data = await res.json();
    console.log(data);
  }

  if (res.ok) {
    return data;
  } else {
    throw new Error(`Something went wrong on API server! Status: ${res.status} ${res.statusText}`);
  }
};

export const updatescore = async (id: string, updates: any) => {
  const request = new Request(createURL(`/api/Rula/${id}`), {
    method: 'PATCH',
    body: JSON.stringify({ updates }),
  });

  const res = await fetch(request);


  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Something went wrong on API server! Status: ${res.status} ${res.statusText}`);
  }
};