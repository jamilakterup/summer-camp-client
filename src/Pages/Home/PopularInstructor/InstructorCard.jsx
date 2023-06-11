import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions} from '@mui/material';

const InstructorCard = ({item}) => {
    return (
        <div className="">
            <Card >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        style={{height: '300px'}}
                        image={item.instructorImg}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <h3>Name: {item.instructor}</h3>
                            <h4 className='text-xl'>{item.class}</h4>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item.description.slice(0, 150)}...
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button style={{backgroundColor: '#f0f0f0', color: '#000', marginBottom: '10px'}} variant="contained">Contained</Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default InstructorCard;