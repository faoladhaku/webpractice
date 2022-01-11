const d = document,
  $fragment = d.createDocumentFragment(),
  $form = d.querySelector(".crud-form"),
  $table = d.querySelector(".crud-table"),
  $title = d.querySelector(".crud-title"),
  $template = d.getElementById("crudTemplate").content;
const getData = async () => {
  try {
    let $res = await fetch("http://localhost:3000/servants"),
      $json = await $res.json();
    if (!$res.ok) throw { status: $res.status, statusText: $res.statusText };
    $json.forEach((el) => {
      $template.querySelector(".nombre").textContent = el.nombre;
      $template.querySelector(".clase").textContent = el.clase;
      $template.querySelector(".editar").dataset.id = el.id;
      $template.querySelector(".editar").dataset.nombre = el.nombre;
      $template.querySelector(".editar").dataset.clase = el.clase;
      $template.querySelector(".eliminar").dataset.id = el.id;
      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
    });
    $table.querySelector("tbody").appendChild($fragment);
  } catch (err) {
    let message = err.statusText | "ocurrio un error";
    $table.insertAdjacentHTML(
      "afterend",
      `<p><b> Error ${err.status}: ${message} </p></b>`
    );
  }
};

d.addEventListener("DOMContentLoaded", getData);
d.addEventListener("submit", async (e) => {
  if (e.target === $form) {
    e.preventDefault();
  }
  if (e.target.id.value == "") {
    try {
      const data = {
        nombre: e.target.nombre.value,
        clase: e.target.clase.value,
      };
      const request = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
      };
      const res = await fetch("http://localhost:3000/servants", request);
      const json = await res.json();
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      //location.reload();
    } catch (err) {
      let message = err.status | "hubo un error";
      $form.insertAdjacentHTML(
        "afterend",
        `<p><b> Error ${err.status}:${message}</b></p>`
      );
    }
  } else {
    try {
      const data = {
        nombre: e.target.nombre.value,
        clase: e.target.clase.value,
      };
      const request = {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
      };
      const res = await fetch(
        `http://localhost:3000/servants/${e.target.id.value}`,
        request
      );
      const json = await res.json();
      if (!res.ok) throw { status: res.status, statusText: res.statusText };

      //location.reload();
    } catch (error) {
      let message = err.status | "hubo un error";
      $form.insertAdjacentHTML(
        "afterend",
        `<p><b> Error ${err.status}:${message}</b></p>`
      );
    }
  }
});
d.addEventListener("click", async (e) => {
  if (e.target.matches(".editar")) {
    $title.textContent = "Editar Servant";
    $form.nombre.value = e.target.dataset.nombre;
    $form.clase.value = e.target.dataset.clase;
    $form.id.value = e.target.dataset.id;
  }
  if (e.target.matches(".eliminar")) {
    let isDelete = confirm(
      `Estas seguro que deseas eliminar este elemento? ${e.target.dataset.id}`
    );
    if (isDelete) {
      try {
        const request = {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
        const res = await fetch(
          `http://localhost:3000/servants/${e.target.dataset.id}`,
          request
        );
        const json = await res.json();
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        //location.reload();
      } catch (err) {
        let message = err.statusText | "hubo un error";
        //alert(`Error ${err.status}:${message}`);
        console.log(err);
      }
    }
  }
});
