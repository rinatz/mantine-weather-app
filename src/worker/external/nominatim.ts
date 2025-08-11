export type NominatimSearchResponse = {
  place_id: number;
  licence: string; // スペルミスだけどフィールド名はこれで合ってる cSpell:ignore licence
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: [string, string, string, string]; // cSpell:enableCompoundWords
};

export async function fetchLocation(
  location: string
): Promise<NominatimSearchResponse[]> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2"); // cSpell:ignore jsonv2
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
