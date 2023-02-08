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
    const { type, intro, family, edu } = props;
    const refactoredType = type.slice(0, -7).replace('-', '')
    const refactoredTitle = type.slice(0, -7)
    const refactoredProps = type.replace('-', '')
    const srcURL = uploads[refactoredProps]
    return (
        <Grid item xs={12} sm={12} xl={6} md={6} lg={6}>
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
                        image={srcURL[0]}
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
                        <Typography paragraph>Introduction</Typography>
                        <Typography paragraph>
                            {intro}
                        </Typography>
                        <Typography paragraph>
                            {family}
                        </Typography>
                        <Typography paragraph>
                            {edu}
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