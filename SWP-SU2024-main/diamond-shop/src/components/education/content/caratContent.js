import React from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent } from '@mui/material';
import Sidebar from '../sidebar';
import caratChart from '../../../constant/caratChart.png'

const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
};

const CaratWeight = () => {
    return (
        <Container maxWidth={false} style={{ backgroundColor: 'white', paddingTop: '1%', paddingBottom: '2%' }}>
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '25%' }}>
                    <Sidebar />
                </div>
                <div style={{ width: '75%', paddingLeft: '5%' }}>
                    <Typography variant="h4" gutterBottom style={{ textAlign: 'left', color: '#1a237e' }}>
                        Diamond Carat Weight
                    </Typography>
                    <hr style={{ backgroundColor: 'black', height: '4px' }} />
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'left', marginBottom: '2%' }}>
                        Understanding a diamond's carat weight is an important factor in determining its size and value. Learn more about how carat weight influences the appearance and price of a diamond.
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ fontWeight: 'bold' }}>
                        Diamond Carat Weight
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Carat weight measures the size of a diamond. Larger diamonds are rarer and more valuable, but carat weight alone does not determine a diamond's beauty.
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                            <Grid item xs={12} sm={7}>
                                <CardMedia
                                    component="img"
                                    alt="Diamond Carat Scale"
                                    height="900"
                                    image={caratChart}
                                />
                                </Grid>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Diamond Carat Scale</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        The carat weight of a diamond is the standard unit of measurement for its size. One carat equals 200 milligrams.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Understanding Carat Weight</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Carat weight is an important factor in determining a diamond's size and value. However, two diamonds of the same carat weight can have different sizes based on their cut proportions.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Importance of Carat Weight</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        The carat weight of a diamond is a key factor in its value. Larger diamonds are rarer and thus more valuable, but carat weight alone does not determine a diamond's beauty.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Factors Affecting Carat Weight</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                                            <li><b>Size:</b> The larger the diamond, the higher the carat weight.</li>
                                            <li><b>Shape:</b> Different diamond shapes can affect the perceived size of the diamond.</li>
                                            <li><b>Cut:</b> A well-cut diamond can appear larger than its actual carat weight.</li>
                                            <li><b>Proportions:</b> The proportions of a diamond's cut can affect its size and appearance.</li>
                                        </ul>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Choosing the Right Carat Weight</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        When choosing a diamond, consider the carat weight in combination with the cut, color, and clarity to find the best balance of size and quality for your budget.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Container>
    );
};

export default CaratWeight;
