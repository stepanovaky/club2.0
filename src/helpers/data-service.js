import APIService from "./apiCalls";

const DataService = {
  async registerForClubSanction(info) {
    console.log(info);
    const owner = info.data.owner;
    const dogs = info.data.dogs;
    const secondaryOwner = info.data.dogOwner;
    dogs.map((dog, index) => {
      if (dog.file === undefined || dog.file.length === 0) {
        console.log("thing");
      } else {
        APIService.getPdfUrl(dog.file).then((res) => {
          dogs[index].pdfUrl = res;
        });
      }
    });
    console.log(dogs);
    APIService.registerDogAndOwner({ data: { owner, dogs, secondaryOwner } });
  },
};

export default DataService;
