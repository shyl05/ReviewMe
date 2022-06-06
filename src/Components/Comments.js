import { forwardRef, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Card,CardBody,CardSubtitle,CardTitle,Button, ListGroup, ListGroupItem, Input, Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';
import '../Styles/Comments.css';
import axios from 'axios';
import {AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai';

function Comments(){
    let userid = useParams();
    let [user,setUser] = useState([]);
    var [comments,setComments] = useState([]);
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

    // Input handler - onChange add Comment

    const inputHandler = (e)=>{
        setCommentInput(()=>({
            ...commentInput,
            [e.target.name]:e.target.value
        }));
    }

    // Add Comment

    const addComment = async()=>{
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

    // ListComments Component

    const ListComments = forwardRef(function ListComments(props,ref){

        const [modal, setModal] = useState(false);
        // Toggle for Modal
        const toggle = () => setModal(!modal);

        let [updateCommentInput,setUpdateCommentInput] = useState({
            comment : ''
        });

        // Delete Comment

        const deleteComment = async() =>{
            let comment_id = props.value._id
            await axios.delete(`/comments/${comment_id}`)
            .then((res)=>{
                const result = res.data;
                let commentData = result.data;
                setComments(comments=>comments.filter((comment)=>comment._id !== commentData._id))
            })
        }

         // Input handler - onChange update Comment

        const inputCommentHandler = (e)=>{
            setUpdateCommentInput(()=>({
                ...updateCommentInput,
                [e.target.name]:e.target.value
            }));
        }
        // Update Comment

        const updateComment = async() =>{
            let comment_id = props.value._id;
            const data = {
                comment : updateCommentInput.comment
            }
            await axios.put(`/comments/${comment_id}`,data)
            .then((res)=>{
                const result = res.data;
                let commentData = result.data;
                setComments(comments.map(comment => (comment._id === commentData._id ? { ...comment, ...commentData } : comment)));
                
            })
        }

        
        // ListComment Component Return Block

        return <div> <ListGroupItem {...props} className='commentItem'>
            <p className='commenttext'>{props.value.comment}</p>
            <div className='commentBtnGroup'>
                <Button onClick={toggle} ><AiOutlineEdit/></Button>
                <Button onClick={deleteComment} color='danger' className='commentDelBtn'><AiOutlineDelete/></Button>
            </div>
            </ListGroupItem>
            {/* Modal for edit comment */}

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>
                    Update Comment
                </ModalHeader>
                <ModalBody>
                    <Input value={updateCommentInput.comment} name="comment" onChange={inputCommentHandler} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"onClick={updateComment}>Update</Button>
                    {' '}
                    <Button onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    })

    // Main Return Block

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