export class myFetch {
  constructor(url) {
    this.url = url + "";
  }

  async get() {
    try {
      let response = await fetch(this.url);
      return await response.json();
    } catch {
      alert("Try Again !!");
    }
  }

  async post(newdata) {
    try {
      let response = await fetch(this.url, {
        method: "POST",
        body: JSON.stringify(newdata),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return await response.json();
    } catch (err) {
      alert("Try Again !!");
    }
  }

  async put(newdata) {
    try {
      let response = await fetch(this.url, {
        method: "PUT",
        body: JSON.stringify(newdata),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return await response.json();
    } catch (err) {
      alert("Try Again !!");
      console.log(err);
    }
  }

  async patch(newdata) {
    try {
      let response = await fetch(this.url, {
        method: "PATCH",
        body: JSON.stringify(newdata),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return await response.json();
    } catch (err) {
      alert("Try Again !!");
    }
  }

  async delete() {
    try {
      let response = await fetch(this.url, {
        method: "DELETE",
      });
      return "Deleted";
    } catch {
      alert("Try Again !!");
    }
  }
}
