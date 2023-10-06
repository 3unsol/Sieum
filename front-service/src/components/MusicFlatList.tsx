import React, { useEffect, useState } from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import { getPlaylistDetail } from '~apis/spotifyApi';

const MusicFlatList: React.FC = ({props}) => {

    interface SpotifyShowsResponse {
        href?: string;
        limit?: number;
        next?: string | null;
        offset?: number;
        previous?: string | null;
        total?: number;
        items?: {
            added_at?: string;
            added_by?: {
                external_urls?: {
                spotify?: string;
                };
                followers?: {
                href?: string;
                total?: number;
                };
                href?: string;
                id?: string;
                type?: string;
                uri?: string;
            };
            is_local?: boolean;
            track?: {
                album?: {
                album_type?: string;
                total_tracks?: number;
                available_markets?: string[];
                external_urls?: {
                    spotify?: string;
                };
                href?: string;
                id?: string;
                images?: {
                    url?: string;
                    height?: number;
                    width?: number;
                }[];
                name?: string;
                release_date?: string;
                release_date_precision?: string;
                restrictions?: {
                    reason?: string;
                };
                type?: string;
                uri?: string;
                artists?: {
                    external_urls?: {
                    spotify?: string;
                    };
                    href?: string;
                    id?: string;
                    name?: string;
                    type?: string;
                    uri?: string;
                }[];
                };
                artists?: {
                external_urls?: {
                    spotify?: string;
                };
                followers?: {
                    href?: string;
                    total?: number;
                };
                genres?: string[];
                href?: string;
                id?: string;
                images?: {
                    url?: string;
                    height?: number;
                    width?: number;
                }[];
                name?: string;
                popularity?: number;
                type?: string;
                uri?: string;
                }[];
                available_markets?: string[];
                disc_number?: number;
                duration_ms?: number;
                explicit?: boolean;
                external_ids?: {
                isrc?: string;
                ean?: string;
                upc?: string;
                };
                external_urls?: {
                spotify?: string;
                };
                href?: string;
                id?: string;
                is_playable?: boolean;
                linked_from?: Record<string, any>;
                restrictions?: {
                reason?: string;
                };
                name?: string;
                popularity?: number;
                preview_url?: string;
                track_number?: number;
                type?: string;
                uri?: string;
                is_local?: boolean;
            };
        }[];
    }

    // const [latestMusics, setLatestMusics] = useState<any | null>(null);

    useEffect(() => {
    //     async function getData() {
    //     const newLatestMusics = await getPlaylistDetail("37i9dQZF1DXe5W6diBL5N4"); // 최신은 고정
    //     setLatestMusics(newLatestMusics);
    // }

    // getData();
    console.log("props:", props);
    },[]);

    // eslint-disable-next-line react/no-unstable-nested-components
    function TruncateText({ text, maxLength, variant, style }) {
        if (text.length <= maxLength) {
        return <Text style={style} variant={variant}>{text}</Text>;
        }

        const truncatedText = text.slice(0, maxLength) + '...';

        return <Text style={style} variant={variant}>{truncatedText}</Text>;
    }

return (

    <FlatList
    horizontal
    data={props?.tracks || []}
    keyExtractor={(item) => item.tracks?.id || ''}
    showsHorizontalScrollIndicator={false}
    renderItem={({item}) => (
        <View style={styles.vertical}>
            <View>
                <Card style={styles.card}>
                    <Card.Cover
                    source={{uri: item.album?.images[0].url}}
                    style={styles.musicCard}
                    />
                </Card>
                <TruncateText text={item.name} maxLength={10} variant={"bodyMedium"} style={[styles.musicTitle, styles.textShadow]} />
                <TruncateText text={item.artists[0].name} maxLength={10} variant={"bodyMedium"} style={[styles.artist, styles.textShadow]} />
            </View>
        </View>
    )}
    />
);
};

const styles = StyleSheet.create({
    vertical: {
        flexDirection: "row",
    },
    cover: {
        width: 35,
        height: 35,
        borderRadius: 20,
    },
    // 음악 관련 스타일
    mainBg: {
        backgroundColor: 'white',
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 10,
    },
    card: {
        width: 100,
        margin: 10,
    },
    musicCard: {
        height: 100,
        width: 100,
    },
    musicTitle: {
        marginLeft: 15,
        fontWeight: 'bold',
    },
    artist: {
        marginLeft: 15,
    },
});

export default MusicFlatList;
