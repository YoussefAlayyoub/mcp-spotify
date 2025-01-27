import { SpotifyApi } from '../utils/api.js';
import { PlaylistArgs, PlaylistTracksArgs, PlaylistItemsArgs, ModifyPlaylistArgs, AddTracksToPlaylistArgs, RemoveTracksFromPlaylistArgs } from '../types/playlists.js';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';

export class PlaylistsHandler {
  constructor(private api: SpotifyApi) {}

  private extractPlaylistId(id: string): string {
    return id.startsWith('spotify:playlist:') ? id.split(':')[2] : id;
  }

  async getPlaylist(args: PlaylistArgs) {
    const playlistId = this.extractPlaylistId(args.id);
    const { market } = args;

    const params = { market };
    return this.api.makeRequest(
      `/playlists/${playlistId}${this.api.buildQueryString(params)}`
    );
  }

  async getPlaylistTracks(args: PlaylistTracksArgs) {
    const playlistId = this.extractPlaylistId(args.id);
    const { market, limit, offset, fields } = args;

    const params = {
      market,
      ...(limit !== undefined && { limit }),
      ...(offset !== undefined && { offset }),
      ...(fields !== undefined && { fields })
    };

    return this.api.makeRequest(
      `/playlists/${playlistId}/tracks${this.api.buildQueryString(params)}`
    );
  }

  async getPlaylistItems(args: PlaylistItemsArgs) {
    const playlistId = this.extractPlaylistId(args.id);
    const { market, limit, offset, fields } = args;

    const params = {
      market,
      ...(limit !== undefined && { limit }),
      ...(offset !== undefined && { offset }),
      ...(fields !== undefined && { fields })
    };

    return this.api.makeRequest(
      `/playlists/${playlistId}/items${this.api.buildQueryString(params)}`
    );
  }

  async modifyPlaylist(args: ModifyPlaylistArgs) {
    const playlistId = this.extractPlaylistId(args.id);
    const { name, public: isPublic, collaborative, description } = args;

    const data = {
      ...(name !== undefined && { name }),
      ...(isPublic !== undefined && { public: isPublic }),
      ...(collaborative !== undefined && { collaborative }),
      ...(description !== undefined && { description })
    };

    return this.api.makeRequest(
      `/playlists/${playlistId}`,
      'PUT',
      data
    );
  }

  async addTracksToPlaylist(args: AddTracksToPlaylistArgs) {
    const playlistId = this.extractPlaylistId(args.id);
    const { uris, position } = args;

    const data = {
      uris,
      ...(position !== undefined && { position })
    };

    return this.api.makeRequest(
      `/playlists/${playlistId}/tracks`,
      'POST',
      data
    );
  }

  async removeTracksFromPlaylist(args: RemoveTracksFromPlaylistArgs) {
    const playlistId = this.extractPlaylistId(args.id);
    const { tracks, snapshot_id } = args;

    const data = {
      tracks,
      ...(snapshot_id !== undefined && { snapshot_id })
    };

    return this.api.makeRequest(
      `/playlists/${playlistId}/tracks`,
      'DELETE',
      data
    );
  }
}
