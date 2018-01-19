

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    ScrollView,
    View,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-picker'
import Note from './components/Note';






export default class App extends Component<{}> {
    constructor (props) {
        super(props);
        this.state = {
            noteArray: [],
            noteText: '',
            imageSource:{},
            date: null
        };
        this.saveChangedItem = this.saveChangedItem.bind(this);
        this.selectImage = this.selectImage.bind(this);
    }

    componentWillMount () {
        const jsonPath = RNFS.DocumentDirectoryPath + '/list.json';
        if (RNFS.exists(jsonPath)) {
            RNFS.readFile(jsonPath)
                .then((data) => {
                    this.setState({
                        noteArray: data ? JSON.parse(data) : []
                    })
                })
        } else {
            this.saveFunc([]);
        }
    }

    selectImage () {
        let options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker')
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            }
            else {
                let filePath = RNFS.DocumentDirectoryPath + '/test-image.jpeg';
                console.log('response', response);
                RNFS.writeFile(filePath, response.data, 'base64')
                    .then(() => {
                        console.log('saved file', filePath)
                    })
                    .catch(err => {
                        console.log('error save file', err)
                    });
                this.setState({
                    imageSource: { uri: response.uri }

                }, () => { console.log('avatar', this.state.imageSource) })
            }
        })
    }


    saveFunc(data) {
        const jsonPath = RNFS.DocumentDirectoryPath + '/list.json';
        RNFS.writeFile(jsonPath, JSON.stringify(data));
        this.setState({
            noteArray: data
        })
    }

    saveChangedItem(key) {
        this.state.noteArray[key]['isEdit'] = false;
        this.saveFunc(this.state.noteArray);
        this.setState({
            noteArray: this.state.noteArray
        });
    }

    addNote(){
        if (this.state.noteText) {
            var d = new Date();
            this.state.noteArray.push( {
                'date': this.state.date || d.getFullYear() + '/'
                + (d.getMonth() + 1) + '/'
                + d.getDate(),
                'content': this.state.noteText,
                'url': this.state.imageSource
            });
            this.saveFunc(this.state.noteArray);
            this.setState({
                noteArray: this.state.noteArray,
                noteText: '',
                imageSource: {},
                date: null
            });
        }
    }
    deleteNote(key){
        var list = this.state.noteArray;
        list.splice(key, 1);
        this.setState({ noteArray: list});
        this.saveFunc(list);
    }

    editItem(key) {
        var list = this.state. noteArray;
        list[key].isEdit = true;
        this.setState({ noteArray: list});
        this.saveFunc(list);
    }

    render() {

        let notes = this.state.noteArray.map((val, key) => {
            return <Note key={key} keyval={key} val={val} deleteItemMethod={()=>this.deleteNote(key)} saveItemMethod={() => this.saveChangedItem(key)} editItemMethod={() => this.editItem(key)}/>
        });

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        TO DO LIST
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={this.state.imageSource} />
                </View>
                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectImage} style={styles.imgButton}>
                        <Text style={styles.addButtonText}>img</Text>
                    </TouchableOpacity>
                    <TextInput onChangeText={(noteText) => this.setState({noteText})} value={this.state.noteText} style={styles.textInput} placeholder='Tap Here' placeholderTextColor = '#bdbdbd' underlineColorAndroid = '#bdbdbd'>
                    </TextInput>

                </View>
            </View>
        );

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
        marginBottom:0,
        marginRight:10,
        zIndex:999
    },
    addButtonText:{
        color:"#ffffff",
        fontSize:24
    },
    imgButton:{
        backgroundColor: '#009688',
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
    imgButtonText:{
        color:"#ffffff",
        fontSize:20
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
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
});
AppRegistry.registerComponent('AwesomeProject', () => Note);