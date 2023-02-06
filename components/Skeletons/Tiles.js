import { Grid, Skeleton } from "@mui/material"

const arrayRange = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );

const Tiles = () => (
    <Grid item sx={{ backgroundColor: 'transparent', width: '33%', }} >
        <Skeleton
            variant='rounded'
            sx={{ backgroundColor: 'grey', width: '100%', height: '20rem', margin: '0.5rem 0rem' }}
        />
        <Skeleton
            variant='rounded'
            sx={{ backgroundColor: 'grey', width: '90%', }}
        />
        <Skeleton
            variant='rounded'
            sx={{ backgroundColor: 'grey', width: '38%', margin: '0.5rem 0rem' }}
        />
    </Grid>
)
const TilesSkeleton = () => {
    let rows = 3
    const column = arrayRange(1, rows, 1)
    return (
        <Grid container justifyContent='center' spacing={1} sx={{ height: '90rem', backgroundColor: 'transparent' }}>
            {column.map(row => <Tiles key={row} />)}
            {column.map(row => <Tiles key={row} />)}
            {column.map(row => <Tiles key={row} />)}
        </Grid>
    )
}

export default TilesSkeleton