import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions} from '@mui/material';
import {useContext} from 'react';
import {AuthContext} from '../../../components/Providers/AuthProviders';
import {useLocation, useNavigate} from 'react-router-dom';
import {toast} from 'react-hot-toast';
import {useState} from 'react';
import Swal from 'sweetalert2';
import {useEffect} from 'react';
import useCart from '../../../Hooks/useCart';

const PopularClassCard = ({item}) => {
    const {classImg, className, instructor, totalSeat, instructorEmail, students, price, _id} = item;

    const [isClicked, setIsClicked] = useState(false);
    const {user} = useContext(AuthContext);
    const [cart, refetch] = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const available = parseInt(item.totalSeat) - parseInt(item.students);
    const disabled = available === 0;

    const handleAddToFavorite = (item) => {
        console.log(item);
        if (user && user.email) {
            const cartItem = {itemId: _id, classImg, className, totalSeat, students, price, instructor, email: user.email, instructorEmail}
            console.log(cartItem);
            fetch('https://summer-camp-school-server-coral-one.vercel.app/carts', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch();
                        toast.success('Successfully added to the favorite!');
                        setIsClicked(true);
                    }
                })
        } else {
            Swal.fire({
                title: 'Please Login First',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {state: {from: location}});
                }
            })
        }
    }


    useEffect(() => {
        cart.find(e => {
            if (e.email === user?.email) {
                if (e.itemId === _id) {
                    setIsClicked(true);
                }
            }
        })
    }, [_id, cart, user?.email])

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
                        image={classImg}
                        alt="green iguana"
                    />
                    <CardContent disabled>
                        <Typography gutterBottom variant="h5" component="div">
                            {className}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <h4 className='text-xl'>Instructor: {instructor}</h4>
                            <div className="flex justify-between mt-2 me-3">
                                <div>
                                    <p>Total seat: {totalSeat}</p>
                                    <p>Students: {students}</p>
                                </div>
                                <div>
                                    <p>Available seats: {available}</p>
                                    <p>Price: ${price}</p>
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