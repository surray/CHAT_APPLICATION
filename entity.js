let users=[];

const addUsers =({id, name, room})=>{
    console.log(users);
    if(!name||!room){
        return{error:"Name and room is required"}
    }
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();

    if(users.length){

        const existingUser=users.find(each=>each.name===name  && each.room===room);
        if (existingUser){
            return{error:"User Already exists"}
        }
    }
    
    const user={id,name,room}
    users.push(user)
    return{user}

}

const removeUsers =(id) =>{
   const findIdx =users.findIndex(each=>each.id==id);

   if(findIdx>0){
       return users.splice(findIdx,1)[0]
   }
}

const getUsers =(id) =>{

    return users.find(each => each.id==id);
}

const getUsersInRoom =(room) =>{ 

    return users.filter(each => each.room==room);
}





module.exports ={ 
    addUsers,
    removeUsers,
    getUsers,
    getUsersInRoom};