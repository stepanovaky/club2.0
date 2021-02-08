import { getOverlappingDaysInIntervals } from "date-fns";
import storageRef from "../firebase/firebase";
import FindDog from "../Hidden/FindDog";
import UnsanctionedRegistration from "../Pages/event page/parts/UnsanctionedRegistration";

// const apiUrl = "http://localhost:8000";
const apiUrl = "https://club20.herokuapp.com";
window.localStorage.setItem("throttle", "true");
const APIService = {
  async getPdfUrl(file) {
    console.log(file);
    const uploadTask = await storageRef.child(file[0].name).put(file[0]);
    const akcPapersUrl = await uploadTask.ref.getDownloadURL();
    return akcPapersUrl;
  },
  async registerDogAndOwner(data) {
    console.log("here");
    console.log(window.localStorage.getItem("throttle"));
    console.log(data, "pdfURL");
    console.log(JSON.stringify(data.data));

    if (window.localStorage.getItem("throttle") === "true") {
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

    window.localStorage.setItem("throttle", "false");
    console.log(window.localStorage.getItem("throttle"));

    setTimeout(function () {
      window.localStorage.setItem("throttle", "true");
    }, 60000);

    // const response = await APICall;
    // console.log(response.body);
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
  async getEvents() {
    const getRequest = await fetch(`${apiUrl}/api/get/events`);
    const response = await getRequest.json();
    console.log(response);
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
    console.log(window.localStorage.getItem("throttle"));

    console.log(object);
    if (window.localStorage.getItem("throttle") === "true") {
      await fetch(`${apiUrl}/api/sanctioned/event/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });
    }
    window.localStorage.setItem("throttle", "false");
    console.log(window.localStorage.getItem("throttle"));

    setTimeout(function () {
      window.localStorage.setItem("throttle", "true");
    }, 60000);
  },
  async unsanctionedRegistration(object) {
    console.log(object);
    if (window.localStorage.getItem("throttle") === "true") {
      await fetch(`${apiUrl}/api/unsanctioned/event/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });
    }
    window.localStorage.setItem("throttle", "false");
    console.log(window.localStorage.getItem("throttle"));

    setTimeout(function () {
      window.localStorage.setItem("throttle", "true");
    }, 60000);
  },
  async getLogs() {
    const getLogs = await fetch(`${apiUrl}/api/get/all/logs`);
    return getLogs;
  },
};
//sanctioned event registration
//   console.log("almost");
//   const sendData = async () => {
//     console.log("this far");
//     const postDog = await fetch(`${apiUrl}/api/event/add/sanctioned`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ addedDogs: addedDogs, eventId: props.eventId }),
//     });
//   };
//   sendData();

//unsanctioned event registration
//   const sendInfo = async () => {
//   const postDog = await fetch(`${apiUrl}/api/event/add/unsanctioned`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       owners: owners,
//       dogs: dogs,
//       eventId: props.eventId,
//     }),
//   });
// };
// sendInfo();

//club registration
//   console.log("success");
//   const transformedData = async () => {
//     const urlList = [];
//     for await (let dog of theData.data.dogs) {
//       console.log(dog);
//       if (dog.file === undefined || dog.file.length === 0) {
//         console.log("thing");
//         urlList.push({ ...dog, akcPapersUrl: "" });
//       } else {
//         console.log("boo");

//         //   .then((res) => {
//         //     ;
//         //   });
//         const uploadTask = await storageRef
//           .child(`dog/${dog.akcNumber}/${dog.file[0].name}`)
//           .put(dog.file[0]);

//         const akcPapersUrl = await uploadTask.ref.getDownloadURL();
//         urlList.push({ ...dog, akcPapersUrl });
//       }
//     }
//     console.log(urlList);
//     return urlList;
//   };

//   transformedData()
//     .then((res) => {
//       const data = { ...theData.data, transformed: res };
//       return data;
//     })
//     .then((res) => {
//       console.log(res);
//       setTimeout(function () {
//         sendRegistration(res);
//       }, 500);
//     });
//   //  };

//   const sendRegistration = async (data) => {
//     console.log("boo");
//     const postData = await fetch(`${apiUrl}/api/registration`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//   };

//get events list
//   const fetchEvents = async () => {
//     const getRequest = await fetch(`${apiUrl}/api/events`);

//     const response = await getRequest.json();
//     // console.log(response.events);
//     const responseParsed = JSON.parse(response.events);
//     // console.log(responseParsed);
//     setEvents([responseParsed]);
//   };

//get dog callname/sanctionid by callname/sanctionid
//   const findDogByCallName = () => {
//     const callName = document.getElementById("call");
//     console.log(callName.value);

//     for (const dog of addedDogs) {
//       console.log(dog);
//       if (callName.value === dog.callName) {
//         // console.log("true");
//         setRepeatMessage("Dog already added");
//         setDisableAddDog(true);
//       } else if (callName !== dog.callName) {
//         setDisableAddDog(false);
//         // console.log("false");
//         setRepeatMessage("");
//       }
//     }
//     fetchDogByCallName(callName.value.toLowerCase());
//   };

//   const findDogBySanctionId = () => {
//     const sanctionId = document.getElementById("sanction");
//     console.log(sanctionId.value);

//     for (const dog of addedDogs) {
//       console.log(dog);
//       if (sanctionId.value === dog.sanctionId) {
//         // console.log("true");
//         setRepeatMessage("Dog already added");
//         setDisableAddDog(true);
//       } else if (sanctionId.value !== dog.sanctionId) {
//         setDisableAddDog(false);
//         // console.log("false");
//         setRepeatMessage("");
//       }
//     }
//     fetchDogBySanctionId(sanctionId.value.toLowerCase());
//   };

//   const addSanctionedDog = (data) => {
//     console.log(data);
//     // setCallName("");
//     // setSanction("");
//     setSanction("");

//     document.getElementById("form").reset();

//     setAddedDogs((addedDogs) => [...addedDogs, data]);
//     console.log(addedDogs);
//   };

//   const resetAddedDogs = () => {
//     setAddedDogs([]);
//   };

//   const fetchDogByCallName = async (name) => {
//     const fetchDogByCallName = await fetch(
//       `${apiUrl}/api/register/event/sanctioned/callname`,
//       {
//         method: "GET",
//         headers: {
//           dog: JSON.stringify(name),
//         },
//       }
//     );
//     const response = await fetchDogByCallName.json();
//     console.log(response.message);
//     if (response.message === "No such dog") {
//       setSanction("");
//       setMessage(response.message);
//     } else {
//       setMessage();
//       setSanction(response.message);
//     }
//   };

//   const fetchDogBySanctionId = async (id) => {
//     const fetchDogBySanctionId = await fetch(
//       `${apiUrl}/api/register/event/sanctioned/sanctionid`,
//       {
//         method: "GET",
//         headers: {
//           dog: JSON.stringify(id),
//         },
//       }
//     );
//     const response = await fetchDogBySanctionId.json();
//     console.log(response.message);
//     if (response.message === "No such dog") {
//       setCallName("");
//       setMessage(response.message);
//     } else {
//       setMessage();
//       setCallName(response.message);
//     }
//   };

export default APIService;
