import {
    Grid, Box,
} from '@/Utils/export'
import { ReactHiererchyChart } from 'react-hierarchy-chart'
import MultiActionCard from '@/components/Card';
import { Branches } from '@/Utils/familyTree';
import ZoomControl from '@/components/Zoom';

const FamilyTree = () => {
  return (
    <Grid container sx={{ display: 'flex', padding: '1rem 0rem', margin: '0.5rem' }} spacing={1}>
      
            <ZoomControl
            handleDecrease={() => console.log('Decrease')} 
            handleIncrease={() => console.log('Increase')}
        />

         <Box sx={{ margin: '1rem 0rem' }}>
        <ReactHiererchyChart 
            nodes={Branches} 
            direction='vertical'
            randerNode={(tree) => (
                <MultiActionCard 
                    key={tree.name}
                    position={tree.position}
                    name={tree.name} 
                />
            )} 
        />

        <ReactHiererchyChart 
            nodes={Branches} 
            direction='horizontal'
            randerNode={(tree) => (
                <MultiActionCard 
                    position={tree.position}
                    name={tree.name} 
                    key={tree.name}
                />
            )} 
        />
</Box>
    </Grid>
  )
}

export default FamilyTree




