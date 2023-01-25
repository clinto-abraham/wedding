import clientPromise from '@/lib/mongodb';
import { ImageList, ImageListItem, Typography, Container } from '@mui/material'
import { useSelector } from 'react-redux';


export default function Engagement({ engage }) {
    const { pics } = useSelector(state => state.uploads)
    console.log(pics)
    return (
        <Container>
            <Container sx={{ width: 1200, height: 1450, overflowY: 'scroll', padding: '100px', margin: '20px' }}>
                <Typography variant="h3">{`Engagement Day`}</Typography>

                <ImageList variant="masonry" cols={3} gap={8}>
                    {/* {engage.map((pic) => (
                        <ImageListItem key={pic._id} onClick={() => console.log("clicked image list")}>
                            <img
                                src={`${pic.base64}?w=248&fit=crop&auto=format`}
                                srcSet={`${pic.base64}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={pic?.title}
                                loading="lazy"
                                key={pic._id}
                            />
                        </ImageListItem>
                    ))} */}
                    {pics.map((pic, index) => (
                        <ImageListItem key={index} onClick={() => console.log("clicked image list")}>
                            <img
                                src={`${pic}?w=248&fit=crop&auto=format`}
                                srcSet={`${pic}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={pic ? pic.slice(3) : 'some-pic'}
                                loading="lazy"
                                key={index}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Container>

            {/* <ScrollTop {...props}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop> */}
        </Container>
    );
}


export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db('photo');

        const pics = await db
            .collection('engage')
            .find({})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();

        return {
            props: { engage: JSON.parse(JSON.stringify(pics)) },
        };
    } catch (e) {
        console.error(e);
    }
};

// import Fab from '@mui/material/Fab';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import Fade from '@mui/material/Fade';
// import useScrollTrigger from '@mui/material/useScrollTrigger';
// import PropTypes from 'prop-types';

// function ScrollTop(props) {
//     const { children, window } = props || { children: '', window: 0 };
//     // Note that you normally won't need to set the window ref as useScrollTrigger
//     // will default to window.
//     // This is only being set here because the demo is in an iframe.
//     const trigger = useScrollTrigger({
//         target: window ? window() : undefined,
//         disableHysteresis: true,
//         threshold: 100,
//     });

//     const handleClick = (event) => {
//         const anchor = (event.target.ownerDocument || document).querySelector(
//             '#back-to-top-anchor',
//         );

//         if (anchor) {
//             anchor.scrollIntoView({
//                 block: 'center',
//             });
//         }
//     };

//     return (
//         <Fade in={trigger}>
//             <Box
//                 onClick={handleClick}
//                 role="presentation"
//                 sx={{ position: 'fixed', bottom: 16, right: 16 }}
//             >
//                 {children}
//             </Box>
//         </Fade>
//     );
// }

// ScrollTop.propTypes = {
//     children: PropTypes.element.isRequired,
//     /**
//      * Injected by the documentation to work in an iframe.
//      * You won't need it on your project.
//      */
//     window: PropTypes.func,
// };