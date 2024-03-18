import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('channels')
export class Channel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { name: 'title' })
  title: string;

  @Column('text', { name: 'profile_picture_url' })
  profilePictureUrl: string;

  @Column('smallint', { name: 'subscription_count' })
  subscriptionCount: number;

  @Column('smallint', { name: 'video_count' })
  videoCount: number;

  @Column('smallint', { name: 'video_playlist_id' })
  videoPlaylistId: string;

  constructor(channel: Partial<Channel> = {}) {
    Object.assign(this, channel);
  }
}
