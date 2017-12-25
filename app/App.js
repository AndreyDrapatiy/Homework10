

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    ScrollView,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';

import Note from './components/Note';




export default class App extends Component<{}> {

    state={
        noteArray:[{'date':'testDate', 'note': 'NoteText'}],
        noteText:'',

    };
    render() {

        let notes = this.state.noteArray.map((val, key) => {
            return <Note key={key} keyval={key} val={val} deleteMethod={()=>this.deleteNote(key)}/>
        });

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        TO DO LIST
                    </Text>
                </View>
                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                    <TextInput onChangeText={(noteText) => this.setState({noteText})} value={this.state.noteText} style={styles.textInput} placeholder='Tap Here' placeholderTextColor = '#bdbdbd' underlineColorAndroid = '#bdbdbd'>

                    </TextInput>
                </View>
            </View>
        );


    }
    addNote(){
       if(this.state.noteText){
            var d = new Date();
            this.state.noteArray.push({'date': d.getFullYear()+'/'+ (d.getMonth() + 1) + '/' + d.getDate(), 'note': this.state.noteText})
            this.setState({noteArray: this.state.noteArray});
            this.setState({noteText: ''});
       }
    }
    deleteNote(key){
        this.state.noteArray.splice(key, 1);
        this.setState({noteArray: this.state.noteArray});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1

    },
    header: {
        backgroundColor: '#3F51B5',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        color: '#ffffff',
        fontSize:18,
        padding:20
    },
    scrollContainer:{
        flex:1,
        marginBottom:30
    },
    footer:{
        alignItems: 'flex-end',
        justifyContent: 'center',

    },
    addButton:{
        backgroundColor: '#e91e63',
        width:70,
        height:70,
        borderRadius:45,
        alignItems:'center',
        justifyContent:'center',
        elevation:8,
        marginBottom:-32.5,
        marginRight:10,
        zIndex:999
    },
    addButtonText:{
        color:"#ffffff",
        fontSize:24
    },
    textInput:{
        alignSelf:'stretch',
        padding: 10,
        paddingBottom:20,
        paddingTop: 25,
        backgroundColor:'#252525',
        color:'#ffffff',
        fontSize:18,
        borderBottomColor:'#ffffff'
    }
});
AppRegistry.registerComponent('AwesomeProject', () => Note);