import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {IoIosArrowDropdownCircle} from 'react-icons/io'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const ExtraSection = () => {
    return (
        <>
            <SectionTitle heading='Popular Questions' />
            <div className='mb-20'>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<IoIosArrowDropdownCircle />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography><span className='text-2xl uppercase'>Why SM Academy?</span></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <span>Welcome to SM Academy, the ultimate destination for a musical summer experience! At SM Academy, we believe in the transformative power of music, and our goal is to provide a nurturing and inspiring environment for aspiring musicians to explore their passion and enhance their skills.</span>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<IoIosArrowDropdownCircle />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography><span className='text-2xl uppercase'>Why Music On Summer Camp</span></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <span>Summer camps provide a unique opportunity for children to explore various musical instruments and genres in a concentrated and focused environment. They can try out different instruments, experiment with different styles, and discover what resonates with them the most. This exploration allows them to broaden their musical knowledge and find their true passion.</span>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    );
};

export default ExtraSection;