import { getUserPlaylists } from '../../../../../lib/spotify';

export async function GET() {
  try {
    const response = await getUserPlaylists();
    const data = await response.json();

    if (response.status > 400) {
      return Response.json({ error: 'Failed to fetch playlists' }, { status: response.status });
    }

    // Filter for monthly playlists (you can customize this filter)
    const monthlyPlaylists = data.items.filter(playlist => 
      playlist.name.toLowerCase().includes('monthly') || 
      playlist.name.toLowerCase().includes('2024') ||
      playlist.name.toLowerCase().includes('2023') ||
      playlist.name.toLowerCase().includes('2022') ||
      playlist.name.toLowerCase().includes('2021') ||
      playlist.name.toLowerCase().includes('2020') ||
      playlist.name.toLowerCase().includes('2019') ||
      playlist.name.toLowerCase().includes('2018') ||
      playlist.name.toLowerCase().includes('2017') ||
      playlist.name.toLowerCase().includes('2016') ||
      playlist.name.toLowerCase().includes('2015') ||
      playlist.name.toLowerCase().includes('2014')
    );

    const playlists = monthlyPlaylists.map((playlist) => ({
      name: playlist.name,
      image: playlist.images[0]?.url || null,
      external_urls: playlist.external_urls,
      tracks: playlist.tracks?.total || 0,
      description: playlist.description,
      id: playlist.id,
    }));

    return Response.json({ playlists });
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return Response.json({ error: 'Failed to fetch playlists' }, { status: 500 });
  }
} 