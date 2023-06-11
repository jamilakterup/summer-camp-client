import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions} from '@mui/material';
import {useContext} from 'react';
import {AuthContext} from '../../../components/Providers/AuthProviders';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-hot-toast';
import {useState} from 'react';

const PopularClassCard = ({item}) => {
    const [isClicked, setIsClicked] = useState(false);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const available = parseInt(item.totalSeat) - parseInt(item.students);
    const disabled = available === 0;

    const handleAddToFavorite = (item) => {
        if (user) {
            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(item)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.insertedId) {
                        toast.success('Successfully toasted!')
                        setIsClicked(true);
                    }
                })
        } else {
            navigate('/login')
        }
    }

    return (
        <div>
            <Card>
                <CardActionArea disabled={disabled}>
                    <div className={`${available === 0 ? 'bg-red-600 opacity-80 absolute z-10 h-full w-full' : ''}`}>
                    </div>
                    <CardMedia
                        component="img"
                        height="140"
                        style={{height: '300px'}}
                        image={item.classImg}
                        alt="green iguana"
                    />
                    <CardContent disabled>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.class}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <h4 className='text-xl'>Instructor: {item.instructor}</h4>
                            <div className="flex justify-between mt-2 me-3">
                                <div>
                                    <p>Total seat: {item.totalSeat}</p>
                                    <p>Students: {item.students}</p>
                                </div>
                                <div>
                                    <p>Available seats: {available}</p>
                                    <p>Price: ${item.price}</p>
                                </div>
                            </div>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => handleAddToFavorite(item)} disabled={isClicked} style={{backgroundColor: '#f0f0f0', color: '#000', marginBottom: '10px'}} variant="contained">add to favorite</Button>
                    </CardActions>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default PopularClassCard;