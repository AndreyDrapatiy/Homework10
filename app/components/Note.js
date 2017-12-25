

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';




export default class App extends Component<{}> {



    render() {



        return (
            <View key={this.props.keyval} style={styles.note}>
                <Text style={styles.dateText}>{this.props.val.date}</Text>
                <Text style={styles.noteText}>{this.props.val.note}</Text>


                <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
                    <Text style={styles.noteDeleteText}>X</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    note: {
        position:'relative',
        padding:20,
        paddingRight:100,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    noteText:{
        padding:5,
        color:'#000000',
        fontSize:18
    },
    dateText:{
        color:'#757575',
        fontSize:12,
        paddingLeft:5
    },
    noteDelete:{
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        top:10,
        bottom:10,
        right:10

    },
    noteDeleteText:{
        fontSize:20
    }

});
