(() => {
  const $fetch = document.getElementById("fetch"),
    $fragment = document.createDocumentFragment();

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });
      $fetch.appendChild($fragment);
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      $fetch.innerHTML = `Error ${err.status}:${message}`;
    });
})();

(() => {
  const $fetchAsync = document.getElementById("fetch_async"),
    $fragment = document.createDocumentFragment();
  async function getData() {
    try {
      let res = await fetch("https://jsonplaceholder.typicode.com/users");
      let json = await res.json();
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });
      $fetchAsync.appendChild($fragment);
    } catch (err) {
      let message = err.statusText || "ocurrio un error";
      $fetchAsync.innerHTML = `Error ${err.status}:${message}`;
    }
  }
  getData();
})();

(() => {
  const $axios = document.getElementById("axios"),
    $fragment = document.createDocumentFragment();
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      let json = res.data;
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });
      $axios.appendChild($fragment);
    })
    .catch((err) => {
      let message = err.response.statusText || "ocurrio un error";
      $axios.innerHTML = `Error ${err.response.status}:${message}`;
    });
})();

(() => {
  const $axios_async = document.getElementById("axios_async"),
    $fragment = document.createDocumentFragment();
  async function getData() {
    try {
      let res = await axios.get("https://jsonplaceholder.typicode.com/users");
      let json = await res.data;
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });
      $axios_async.appendChild($fragment);
    } catch (err) {
      let message = err.response.statusText || "ocurrio un error";
      $axios_async.innerHTML = `Error ${err.response.status}:${message}`;
    }
  }
  getData();
})();
