

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native';




export default class App extends Component<{}> {

    constructor (props) {
        super(props);
        this.state = {
            test: ''
        };
    }

    render() {



        return (
            <View key={this.props.keyval} style={styles.note}>
                <View key={this.props.keyval} style={styles.noteContent}>
                    {this.props.val.url ?
                        <Image
                            style={styles.image}
                            source={this.props.val.url}
                        /> : null
                    }
                    {this.props.val.isEdit ?
                        <TextInput
                            style={styles.input}
                            defaultValue={this.props.val.content}
                            onChangeText={(desc) => this.props.val.content = desc}
                        /> : <Text style={styles.noteText}>{this.props.val.content}</Text>}

                </View>
                <View key={this.props.keyval} style={styles.secureInfo}>
                    <Text style={styles.secureText}>{this.props.val.date}</Text>
                    {this.props.val.isEdit ?
                        <TouchableOpacity onPress={this.props.saveItemMethod}>
                            <Text style={styles.secureText}>Save</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={this.props.editItemMethod}>
                            <Text style={styles.secureText}>Edit</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={this.props.deleteItemMethod}>
                        <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    note: {
        flexDirection: 'column',
        padding:20,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    noteContent: {

        flexDirection: 'row',
        alignItems:'flex-start',



    },
    secureInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginTop:20

    },
    secureText:{
        fontSize:18,
        color:'#757575',
    },
    removeText:{
        fontSize:18,
        color:'#ff80ab',
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
    image: {
        width: 50,
        height:50
    },
    noteDeleteText:{
        fontSize:20
    }

});
