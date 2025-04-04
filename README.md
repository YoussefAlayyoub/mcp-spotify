# MCP Spotify Server

A Model Context Protocol (MCP) server that provides access to the Spotify Web API. This server enables interaction with Spotify's music catalog, including searching for tracks, albums, and artists, as well as accessing artist-specific information like top tracks and related artists.

## Prerequisites

1. Node.js (version 16 or higher)
2. Spotify API Credentials:
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new application
   - Get your Client ID and Client Secret

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/pashpashpash/mcp-spotify.git
   cd mcp-spotify
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build the Project**:
   ```bash
   npm run build
   ```

## Configuration

Add to your Claude Desktop configuration file:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "spotify": {
      "command": "node",
      "args": ["path/to/mcp-spotify/dist/index.js"],
      "env": {
        "SPOTIFY_CLIENT_ID": "your_client_id",
        "SPOTIFY_CLIENT_SECRET": "your_client_secret"
      }
    }
  }
}
```
Note: Replace "path/to/mcp-spotify" with the actual path to your cloned repository.

## Features

### Music Search and Discovery
- Search for tracks, albums, artists, and playlists
- Get artist information including top tracks and related artists
- Get album information and tracks
- Access new releases and recommendations

### Audiobooks
- Get audiobook information with market-specific content and chapters
- Note: Audiobook endpoints may require additional authentication or market-specific access

### Playlist Management
- Get and modify playlist information (name, description, public/private status)
- Access playlist tracks and items with pagination support
- Add and remove tracks from playlists

### Additional Features
- Support for both Spotify IDs and URIs
- Automatic token management with client credentials flow

## Available Tools

### Authentication
- `get_access_token`: Get a valid Spotify access token

### Search and Discovery
- `search`: Search for tracks, albums, artists, or playlists
- `get_new_releases`: Get new album releases
- `get_recommendations`: Get track recommendations

### Artist Information
- `get_artist`: Get artist information
- `get_artist_top_tracks`: Get an artist's top tracks
- `get_artist_related_artists`: Get artists similar to a given artist
- `get_artist_albums`: Get an artist's albums

### Album and Track Information
- `get_album`: Get album information
- `get_album_tracks`: Get an album's tracks
- `get_track`: Get track information

### Audiobook Access
- `get_audiobook`: Get audiobook information with optional market parameter
- `get_multiple_audiobooks`: Get information for multiple audiobooks (max 50)
- `get_audiobook_chapters`: Get chapters of an audiobook with pagination support (1-50 chapters per request)

### Playlist Management
- `get_playlist`: Get a playlist owned by a Spotify user
- `get_playlist_tracks`: Get full details of the tracks of a playlist (1-100 tracks per request)
- `get_playlist_items`: Get full details of the items of a playlist (1-100 items per request)
- `modify_playlist`: Change playlist details (name, description, public/private state, collaborative status)
- `add_tracks_to_playlist`: Add one or more tracks to a playlist with optional position
- `remove_tracks_from_playlist`: Remove one or more tracks from a playlist with optional positions and snapshot ID
- `get_current_user_playlists`: Get a list of the playlists owned or followed by the current Spotify user (1-50 playlists per request)

## Debugging

If you run into issues, check Claude Desktop's MCP logs:
```bash
tail -n 20 -f ~/Library/Logs/Claude/mcp*.log
```

Common issues:
1. **Authentication Errors**:
   - Verify your Spotify Client ID and Secret are correct
   - Check that your application is properly registered in the Spotify Developer Dashboard

2. **Rate Limiting**:
   - The server includes automatic token management
   - Be aware of Spotify API rate limits for different endpoints

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Development with auto-rebuild
npm run watch
```

## License

MIT License

---
Note: This is a fork of the [original mcp-spotify repository](https://github.com/superseoworld/mcp-spotify)
