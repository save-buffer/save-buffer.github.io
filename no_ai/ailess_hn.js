fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then(response => response.json())
    .then(ids =>
        {
            return Promise.all(ids.slice(0, 50).map(
                id =>
                fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                    .then(response => response.json())))
        })
    .then(posts =>
        {
            return posts.filter(post => !(/.*(LLM|GPT|AI|LLaMA).*/.test(post.title))).slice(0, 30);
        }
    )
    .then(posts =>
        {
            const table = document.createElement('table');
            table.classList.add('table');
            const thead = document.createElement('thead');
            thead.innerHTML = `
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Author</th>
        <th scope="col">Score</th>
        <th scope="col">Comments</th>
        <th scope="col">Time</th>
      </tr>
    `;
            const tbody = document.createElement('tbody');
            posts.forEach((post, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td><a href="${post.url}" target="_blank">${post.title}</a></td>
        <td>${post.by}</td>
        <td>${post.score}</td>
        <td><a href="https://news.ycombinator.com/item?id=${post.id}">${post.descendants ?? 0}</td>
        <td>${new Date(post.time * 1000).toLocaleString()}</td>
      `;
                tbody.appendChild(tr);
            });
            table.appendChild(thead);
            table.appendChild(tbody);
            document.getElementById('posts').appendChild(table);
        })
    .catch(error =>
        {
            console.error(error);
        });
