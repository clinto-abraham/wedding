import {
    Link,
    useState,
    useSelector,
    styled, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography, Grid,
    FavoriteIcon, ShareIcon, ExpandMoreIcon, MoreVertIcon,
} from '@/Utils/export'

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const PhotoTilesNavbar = props => {
    const uploads = useSelector(state => state.uploads)
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const { type } = props;

    const refactoredType = type.slice(0, -7).replace('-', '')
    const refactoredTitle = type.slice(0, -7)
    const refactoredProps = type.replace('-', '')
    const srcURL = uploads[refactoredProps]

    return (<Grid item xs={12} sm={12} xl={6} md={6} lg={6}>
        <Card sx={{ color: 'white', background: 'transparent', margin: '0.1rem' }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings" sx={{ color: 'white' }}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={refactoredTitle.toUpperCase()}
            />
            <Link
                href={`/${refactoredTitle.toLowerCase()}`}
            >
                <CardMedia
                    component="img"
                    height='304px'
                    // width='700px'
                    image={srcURL}
                    alt={`Display pic of ${refactoredType}`}
                />

            </Link>
            <CardContent>
                <Typography variant="body2">
                    See highlights of {refactoredTitle} and&nbsp; its photos here.
                </Typography>
                <Typography variant='caption'>September 14, 2016</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" sx={{ color: 'white' }}>
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share" sx={{ color: 'white' }}>
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{ color: 'white' }}
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo in the pan. Add
                        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                        stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and
                        peppers, and cook without stirring, until most of the liquid is absorbed,
                        15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                        mussels, tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don&apos;t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    </Grid>
    )
}

export default PhotoTilesNavbar;



// import Link from 'next/link';
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { styled, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography, Grid, } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';