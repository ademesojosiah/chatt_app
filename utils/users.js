const users = []


exports.joinUser= (id,username,room)=>{
    const user = {id,username,room}

    users.push(user)
    return user
}

exports.findUser = (id)=>{
    const user = users.find(user=>user.id === id)

    return user
}

exports.leaveUser = (id)=>{
    const index = users.findIndex(user => user.id === id)

    if(index  !== -1){
        return users.splice(index,1)[0]
    }
}

exports.getRoomUsers = (room)=>{
    return users.filter(user => user.room === room)
}