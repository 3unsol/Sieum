import React, {useEffect, useState} from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, } from "react-native";
import { Card, Text } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import { getPlaylistDetail } from "~apis/spotifyApi";
import BackTopbar from "~components/BackTopBar";

const PlaylistDetail = () => {
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

    const route = useRoute();
    const { playlistId, playlistTitle }  = route.params;
    const [playlist, setPlaylist] = useState<SpotifyShowsResponse | null>(null);

    useEffect(() => {
        async function getData() {
                const newPlaylist = await getPlaylistDetail(playlistId);
                setPlaylist(newPlaylist);
            }
        getData();
    },[]);

    const styles = StyleSheet.create({
        mainBg: {
            flex: 1,
            backgroundColor: "white",
        },
        container: {
            flex: 1,
            margin: 10,
        },
        musicContainer: {
            flex:1,
            flexDirection: "row",
            alignItems: "center",
            margin: 5,
        },
        cover: {
            width: 60,
            height: 60,
        },
        text: {
            flexDirection: "column",
            marginLeft: 10,
            alignItems: "flex-start",
        }
    });

    

    return (
        <>
            <BackTopbar title={playlistTitle}/>
            <FlatList
                style={styles.mainBg}
                data={playlist?.items || []}
                keyExtractor={(item) => item.track?.id || ''}
                renderItem={({item}) => (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.musicContainer}
                    onPress={() => {
                        console.log("aaaa");
                    }}>
                        <Card.Cover
                            style={styles.cover}
                            source={{ uri: item.track?.album?.images[0].url }}
                        />
                        <View style={styles.text}>
                            <Text variant="titleMedium">{item.track?.name}</Text>
                            <Text variant="titleSmall">{item.track?.artists[0].name}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}/>
        </>
    );
};

export default PlaylistDetail;
