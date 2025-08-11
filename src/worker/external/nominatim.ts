import type { NominatimSearchResponse } from "../types/nominatim";

export async function fetchLocation(
  location: string
): Promise<NominatimSearchResponse[]> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("q", location);

  console.log("Fetching location:", url.toString());

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "User-Agent": "Mantine Weather App",
    },
  });

  console.log("Location response:", response);

  return response.json();
}
