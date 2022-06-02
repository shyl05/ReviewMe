import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Card,CardBody,CardSubtitle,CardTitle,Button} from 'reactstrap';
import '../Styles/Comments.css';
import axios from 'axios';

function Comments(){
    let userid = useParams();
    let [user,setUser] = useState([]);
    let [comments,setComments] = useState([]);

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
                    <div>
                        <ul>
                            {comments.map((obj,index)=>{
                                return <li key={index}>{obj.comment}</li>
                            })
                            }
                        </ul>
                    </div>
                    <Button>
                        Add Comment
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default Comments;