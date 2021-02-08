import APIService from "./apiCalls";

const DataService = {
  registerForClubSanction(info) {
    const owner = info.data.owner;
    const dogs = info.data.dogs;
    const secondaryOwner = info.data.dogOwner;
    dogs.map((dog, index) => {
      if (dog.file === undefined || dog.file.length === 0) {
      } else {
        APIService.getPdfUrl(dog.file).then((res) => {
          dogs[index].pdfUrl = res;
        });
      }
    });
    APIService.registerDogAndOwner({ data: { owner, dogs, secondaryOwner } });
  },
};

export default DataService;
