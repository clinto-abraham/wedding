import {
    Card, CardContent, CardMedia, Grid, Typography, Button, CardActionArea, CardActions,
} from '@/Utils/export'

export default function MultiActionCard({ position, name}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {position}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Relate
        </Button>
      </CardActions>
    </Card>
  );
}
