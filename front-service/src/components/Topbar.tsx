import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider, Appbar} from 'react-native-paper';

const Topbar = ({title}: any) => {
    const topbarStyle = StyleSheet.create({
        topbar: {
            alignItems: "center",
            textAlign: 'center',
        },
        title: {
            flex: 1,
            alignItems: "center",
            textAlign: 'center',
        },
    });

    return (
        <>
            <Appbar.Header style={topbarStyle.topbar}>
                <Appbar.Content title={title} style={topbarStyle.title}/>
            </Appbar.Header>
            <Divider />
        </>
    );
};

export default Topbar;