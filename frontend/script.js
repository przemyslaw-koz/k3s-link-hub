const API = `${window.location.protocol}//${window.location.hostname}:8082`;

async function loadLinks() {
  const res = await fetch(`${API}/links`);
  const links = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  links.forEach(l => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${l.url}" target="_blank">${l.url}</a> - ${l.description}`;
    list.appendChild(li);
  });
}

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = document.getElementById("url").value;
  const desc = document.getElementById("desc").value;

  await fetch(`${API}/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, description: desc })
  });

  document.getElementById("url").value = "";
  document.getElementById("desc").value = "";

  loadLinks();
});

loadLinks();
