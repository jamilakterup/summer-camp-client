import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions} from '@mui/material';

const PopularClassCard = ({item}) => {
    const available = parseInt(item.totalSeat) - parseInt(item.students);
    const disabled = available === 0;

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
                        <Button style={{backgroundColor: '#f0f0f0', color: '#000', marginBottom: '10px'}} variant="contained">Contained</Button>
                    </CardActions>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default PopularClassCard;