import { getTopArtists } from '../../../../../lib/spotify';

export async function GET() {
  try {
    const response = await getTopArtists();
    const data = await response.json();

    if (response.status > 400) {
      return Response.json({ error: 'Failed to fetch top artists' }, { status: response.status });
    }

    const artists = data.items.map((artist) => ({
      name: artist.name,
      image: artist.images[0]?.url || null,
      external_urls: artist.external_urls,
      popularity: artist.popularity,
      genres: artist.genres,
    }));

    return Response.json({ artists });
  } catch (error) {
    console.error('Error fetching top artists:', error);
    return Response.json({ error: 'Failed to fetch top artists' }, { status: 500 });
  }
} 