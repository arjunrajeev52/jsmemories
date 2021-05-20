import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64';
import {useDispatch} from 'react-redux'
import {createPosts,updatePosts} from '../../actions/posts';

import useStyle from './style';

const Form = ({currentId,setCurrentId}) => {
    const [postData, setPostdata] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })
    const post = useSelector((state) => currentId?state.posts.find((p)=>p._id === currentId):null);

    useEffect(()=>{
        if(post){
            setPostdata(post);
        }
    },[post]);

    const classes = useStyle();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault()
        if(currentId){
        dispatch(updatePosts(currentId,postData));
        clear();
        }
        else{
        dispatch(createPosts(postData));
        clear();
        }
    }
    
    const clear = ()=>{
        setCurrentId(null);
        setPostdata({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant="h6">
                    {currentId?'Editing':'Creating'} a memory
                </Typography>
                <TextField name="creator" variant="outlined" label="creator" fullWidth value={postData.creator} onChange={ (e)=>setPostdata({...postData,creator:e.target.value})} />
                <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={ (e)=>setPostdata({...postData,title:e.target.value})} />
                <TextField name="message" variant="outlined" label="message" fullWidth value={postData.message} onChange={ (e)=>setPostdata({...postData,message:e.target.value})} />
                <TextField name="tags" variant="outlined" label="tags" fullWidth value={postData.tags} onChange={ (e)=>setPostdata({...postData,tags:e.target.value})} />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({base64})=>setPostdata({...postData,selectedFile:base64})}/>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
                    Submit
                </Button>
                <Button variant="contained" color="secondary" onClick={clear} fullWidth>
                    Cancel
                </Button>
            </form>
        </Paper>
    );
}

export default Form;