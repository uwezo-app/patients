import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        width:"98%",
        justifyContent:"space-between",
        padding:15,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 0.3,
        borderRadius:30,
        backgroundColor:'white',
        marginLeft:2,
        marginBottom:7,
        marginTop:10,
        
    },
    leftContainer:{
        flexDirection:'row'
    },

    midContainer:{
      justifyContent:'space-around'  
    },
    
    avatar:{
        width:60,
        height:60,
        marginRight:20,
        borderRadius:51,
    },
    username:{
        fontSize:16,
        fontWeight:'bold',
    },
    
});
export default styles;