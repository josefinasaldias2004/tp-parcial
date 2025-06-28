const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key":
    "live_kmaYZ4omx2lC2LkvDJbAOqdd6oKR8gDXVHJVv4RUKkGnme3Yo7xEirHYEae140C5",
});

var requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};

fetch(
  "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => {
    const url = result[0]?.url;
    console.log(url);
  })
  .catch((error) => console.log("error", error));
