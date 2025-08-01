import { getNowPlaying } from '../../../../../lib/spotify';

export async function GET() {
  try {
    const response = await getNowPlaying();
    const data = await response.json();

    if (response.status === 204 || response.status > 400) {
      return Response.json({ isPlaying: false });
    }

    const song = data.item;
    const isPlaying = data.is_playing;
    const title = song.name;
    const artist = song.artists.map((_artist) => _artist.name).join(', ');
    const album = song.album.name;
    const albumImageUrl = song.album.images[0].url;
    const songUrl = song.external_urls.spotify;

    return Response.json({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    });
  } catch (error) {
    console.error('Error fetching now playing:', error);
    return Response.json({ isPlaying: false });
  }
} 