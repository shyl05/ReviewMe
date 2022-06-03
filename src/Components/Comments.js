import { forwardRef, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Card,CardBody,CardSubtitle,CardTitle,Button, ListGroup, ListGroupItem, Input} from 'reactstrap';
import '../Styles/Comments.css';
import axios from 'axios';
import {AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai';

function Comments(){
    let userid = useParams();
    let [user,setUser] = useState([]);
    let [comments,setComments] = useState([]);
    let commentRef = useRef(null);
    let [commentInput,setCommentInput] = useState({
        comment : ''
    });

    const getUserComments = async()=>{
        let user_id = userid.userid
        await axios.get(`/users/user/${user_id}`)
        .then((res)=>{
            let result = res.data;
            setUser(user = result.data);
            setComments(comments = user.comments);
        }).catch((err)=>{console.log(err)});
    }

    useEffect(()=>{
        getUserComments();
        // eslint-disable-next-line
    },[])

    const cardStyle={
        backgroundColor : '#f0ffff'
    }

    const inputHandler = (e)=>{
        setCommentInput((commentInput)=>({
            ...commentInput,
            [e.target.name]:e.target.value
        }));
    }

    const addComment = async(e)=>{
        let user_id = userid.userid;
        const data = {
            comment : commentInput.comment
        }
        await axios.post(`/comments/${user_id}`,data)
        .then((res)=>{
            const result = res.data;
            let commentData = result.data;
            setComments(comments=>[...comments,commentData])
        })

    }

    const ListComments = forwardRef(function ListComments(props,ref){

        const deleteUser = async() =>{
            let comment_id = props.value._id
            await axios.delete(`/comments/${comment_id}`)
            .then((res)=>{
                const result = res.data;
                let commentData = result.data;
                setComments(comments=>comments.filter((comment)=>comment._id !== commentData._id))
            })
        }
    
        return <ListGroupItem {...props} className='commentItem'>
            <p className='commenttext'>{props.value.comment}</p>
            <div className='commentBtnGroup'>
                <Button ><AiOutlineEdit/></Button>
                <Button onClick={deleteUser} color='danger' className='commentDelBtn'><AiOutlineDelete/></Button>
            </div>
        </ListGroupItem>
    })

    return(    
        <div className='userCardContainer'>
            <Card className='userCard' style={cardStyle}>
                <CardBody className='userCardBody'>
                    <CardTitle tag="h2">
                        USER : {user.userName}
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h4"
                    >
                        Comments on {user.userName}
                    </CardSubtitle>
                </CardBody>
            </Card>
            <div>
                <ListGroup>
                    {comments.map((object,index)=>{
                        return <ListComments value={object} ref={commentRef} key={index}/>
                    })
                    }
                </ListGroup>
            </div>
            <div className='addCommentGroup'>
                <Input value={commentInput.comment} name="comment" onChange={inputHandler} placeholder="Write your comment here" />
                <Button className='addCommentBtn' onClick={addComment}>Add Comment</Button> 
            </div>
            
        </div>
    )

}



export default Comments;