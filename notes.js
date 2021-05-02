const fs=require('fs')
const chalk=require('chalk')
const getNotes=function(){
    return 'Your notes...'
}

const addNote=function(title,body){
    const notes=loadNotes()
    // const duplicateNotes=notes.filter(function(note){
    //     return note.title===title
    // })

    const duplicateNote=notes.find((note)=> note.title===title)

    if(!duplicateNote){
        notes.push({
            title:title,
            body:body
        })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added'))
    } else{
        console.log(chalk.red.inverse('Note title taken!'))
    }
}


//remove notes
const removeNote=function(title){
    const notes=loadNotes()
    const notesToKeep=notes.filter(function(note){
        return note.title!==title
    })

    if(notes.length>notesToKeep.length){
        console.log(chalk.green.inverse('Note removed'))
    }else{
        console.log(chalk.red.inverse('No notes found'))
    }

    saveNotes(notesToKeep)
}

//list notes
const listNotes=()=>{
    console.log(chalk.inverse('Your Notes'))
    const notes=loadNotes()
    notes.forEach((note)=>{
        console.log(note.title)
    })
}

//read note
const readNote=(title)=>{
    const notes=loadNotes()
    const noteToRead=notes.find((note)=>note.title===title)
    if(noteToRead){
        console.log(chalk.inverse(noteToRead.title))
        console.log(noteToRead.body)
    }else{
        console.log(chalk.red.inverse('No note found!'))
    }
}


const saveNotes=function(notes){
    const dataJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes=function(){
    try{
        const dataBuffer=fs.readFileSync('notes.json')
        const dataJSON=dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

module.exports={
    getNotes:getNotes,
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}