import { forwardRef, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {Card,CardBody,CardSubtitle,CardText,CardTitle,Button} from 'reactstrap';
import '../Styles/Home.css';


const UserCard = forwardRef(function UserCard(props,ref){
    // Array containing colors
    var colors = [
        '#ba55d3', '#9370db', '#98fb98',
        '#eee8aa', '#f4a460', '	#c0c0c0'
    ];
    
    // selecting random color
    var random_color = colors[Math.floor(Math.random() * colors.length)]; 
    

    const cardStyle = {
        backgroundColor :  random_color
    }

    let navigate = useNavigate();

    function viewComments(){
        let user_id = props.value._id;
        navigate(`/comments/${user_id}`)
    }

    return <Card {...props} className="user-card"  style={cardStyle}>
        <CardBody>
            <CardTitle tag="h5">
                USER : {props.value.userName}
            </CardTitle>
            <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
            >
                NAME : {props.value.firstName} {props.value.lastName}
            </CardSubtitle>
            <CardText>
                LUCKY NUMBER : {props.value.selectNumber}
            </CardText>
            <Button onClick={viewComments} props={props.value} >
                Comments
            </Button>
        </CardBody>
    </Card>
})



function Home(){
    let [users,setUsers] = useState([]);
    const cardRef = useRef(null);

    async function getData(){
        await axios.get('/users')
        .then((res)=>{
            let result = res.data;
            setUsers(users = result.data);
        }).catch((err)=>{console.log(err)});
    }

    useEffect(()=>{
        getData();
        // eslint-disable-next-line
    },[]);


    return(
        <div>
            <>
            <div className="usersCardsContainer">
                    {users.map(function(obj, index){
                        return <UserCard value={obj} key={index} ref={cardRef} />
                    })
                    }
            </div>
            </> 
        </div>
    );
}



export default Home;