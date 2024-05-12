import React, { useContext } from "react";
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import UsersContext from "../context/UsersContext";

export default function UserList(props) {
    
    const { state, dispatch } = useContext(UsersContext);

    function confirmUserDeletion(user) {
        Alert.alert(
            'Excluir Usuário',
            `Deseja excluir o usuário ${user.name} ?`,
            [
                {
                    text: 'Sim',
                    onPress: () => {
                        dispatch({

                            type: 'deleteUser', 
                            payload: user,
                        })
                        // Coloque aqui sua lógica para excluir o usuário
                    }
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        )
    }

    function getActions(user) {
        return (
            <View style={[styles.actionContainer, {alignSelf: 'flex-end'}]}>
                <TouchableOpacity onPress={() => props.navigation.navigate('UserForm', user)}>
                    <Icon name="edit" size={25} color="orange" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmUserDeletion(user)}>
                    <Icon name="trash" size={25} color="red" style={styles.icon} />
                </TouchableOpacity>
            </View>
        )
    }
    

   function UserItem({item}) {
        return (
            <View style={styles.userContainer}>
                <TouchableOpacity 
                    key={item.id} 
                    style={styles.userContent} 
                    onPress={() => props.navigation.navigate('UserForm', item)}
                >
                    <Image source={{uri: item.avatarUrl}} style={styles.avatar}/>
                    <View style={styles.userInfo}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.email}>{item.email}</Text>
                    </View>
                </TouchableOpacity>
                {getActions(item)}
            </View>
        );
   }

    return (
        <ScrollView>
            {state.users.map(user => ( // Aqui estamos usando state.users do contexto
                <UserItem key={user.id} item={user} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    userContainer: {
        padding: 10,
    },
    userContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userInfo: {
        flexDirection: 'column',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 16,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginRight: 10,
    },
    icon: {
        marginRight: 22, // Ajuste o espaçamento entre os ícones conforme necessário
    }, 
});
