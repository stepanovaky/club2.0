import { getOverlappingDaysInIntervals } from "date-fns";
import storageRef from "../firebase/firebase";
import FindDog from "../Hidden/FindDog";
import UnsanctionedRegistration from "../Pages/event page/parts/UnsanctionedRegistration";

// const apiUrl = "http://localhost:8000";  
const apiUrl = "https://club20.herokuapp.com"; 
window.localStorage.setItem("throttle", "true");
const APIService = {
  async getPdfUrl(file) {
    const uploadTask = await storageRef.child(file[0].name).put(file[0]);
    const akcPapersUrl = await uploadTask.ref.getDownloadURL();
    return akcPapersUrl;
  },
  async registerDogAndOwner(data) {
    

    if (window.localStorage.getItem("throttle") === "true") {
      window.localStorage.setItem("throttle", "false");
      await fetch(apiUrl + "/api/first/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: data.data,
        }),
      });
    }

    
    

    setTimeout(function () {
      window.localStorage.setItem("throttle", "true");
    }, 60000);


  },
  findDog(data) {
    return fetch(`${apiUrl}/api/find/dog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        data: JSON.stringify(data),
      },
    });
    // return getRequest;
  },
  async updateDog(data) {
    fetch(`${apiUrl}/api/update/dog`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
  },
  async deleteDog(data) {
    fetch(`${apiUrl}/api/delete/dog`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
  },
  async findOwner(data) {
    const getRequest = await fetch(`${apiUrl}/api/find/owner`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        data: JSON.stringify(data),
      },
    });
    return getRequest;
  },

  async updateOwner(data) {
    await fetch(`${apiUrl}/api/update/owner`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },

  async deleteOwner(data) {
    await fetch(`${apiUrl}/api/delete/owner`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },

  async addEvent(data) {
    await fetch(`${apiUrl}/api/add/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },

  async getEvents() {
    const getRequest = await fetch(`${apiUrl}/api/get/events`);
    const response = await getRequest.json();
    return response.events;
  },
  async updateEvents(data) {
    const updateRequest = await fetch(`${apiUrl}/api/update/events`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  async sanctionedRegistration(object) {
    
    if (window.localStorage.getItem("throttle") === "true") {
      window.localStorage.setItem("throttle", "false");
      await fetch(`${apiUrl}/api/sanctioned/event/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });
    }

    setTimeout(function () {
      window.localStorage.setItem("throttle", "true");
    }, 60000);
  },
  async unsanctionedRegistration(object) {
    if (window.localStorage.getItem("throttle") === "true") {
      window.localStorage.setItem("throttle", "false");
      await fetch(`${apiUrl}/api/unsanctioned/event/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });
    }
    

    setTimeout(function () {
      window.localStorage.setItem("throttle", "true");
    }, 60000);
  },
  async getLogs() {
    const getLogs = await fetch(`${apiUrl}/api/get/all/logs`);
    return getLogs;
  },
};

export default APIService;
